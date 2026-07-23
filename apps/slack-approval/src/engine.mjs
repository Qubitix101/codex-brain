import {
  DecisionCode,
  REACTION_RECEIPT,
  evaluateApproval,
  evaluateEventEnvelope,
  isDryRunReady
} from "./policy.mjs";

function requireMethod(object, path, name) {
  if (typeof object?.[name] !== "function") {
    throw new TypeError(`Missing adapter method: ${path}.${name}`);
  }
}

function validateAdapters(adapters) {
  requireMethod(adapters?.store, "store", "claimEvent");
  requireMethod(adapters?.store, "store", "claimApproval");
  requireMethod(adapters?.store, "store", "getEventOutcome");
  requireMethod(adapters?.store, "store", "getApprovalOutcome");
  requireMethod(adapters?.store, "store", "findBinding");
  requireMethod(adapters?.store, "store", "recordDecision");
  requireMethod(adapters?.store, "store", "saveMergeReceipt");
  requireMethod(adapters?.store, "store", "markReceiptReaction");
  requireMethod(adapters?.github, "github", "getPullRequest");
  requireMethod(adapters?.github, "github", "mergePullRequest");
  requireMethod(adapters?.slack, "slack", "addReaction");
}

async function recordSafely(store, eventId, record) {
  await store.recordDecision(eventId, {
    ...record,
    recordedAt: new Date().toISOString()
  });
}

/**
 * Process one normalized Slack reaction event.
 *
 * The receiver must preserve Slack's top-level event_id as `event.id`.
 * All network and persistence behavior is supplied through injected adapters.
 */
export async function processReaction({ event, config = {}, adapters }) {
  validateAdapters(adapters);
  const { store, github, slack } = adapters;

  const claimed = await store.claimEvent(event);
  if (claimed !== true) {
    const prior = await store.getEventOutcome(event?.id ?? null);
    return Object.freeze({
      status: "duplicate",
      eventId: event?.id ?? null,
      mergeAttempted: false,
      receiptReactionAdded: false,
      prior: prior ?? null
    });
  }

  const envelope = evaluateEventEnvelope({ event, config });
  if (envelope.verdict !== "allow") {
    await recordSafely(store, event.id, {
      status: envelope.verdict === "ignore" ? "ignored" : "denied",
      decision: envelope
    });
    return Object.freeze({
      status: envelope.verdict === "ignore" ? "ignored" : "denied",
      eventId: event.id,
      decision: envelope,
      mergeAttempted: false,
      receiptReactionAdded: false
    });
  }

  const binding = await store.findBinding({
    workspaceId: event.workspaceId,
    channelId: event.channelId,
    messageTs: event.messageTs
  });

  const pullRequest = binding
    ? await github.getPullRequest({
        repoOwner: binding.repoOwner,
        repoName: binding.repoName,
        pullNumber: binding.pullNumber
      })
    : null;

  const context = { event, config, binding, pullRequest };
  const approval = evaluateApproval(context);

  if (approval.verdict !== "allow") {
    const dryRunReady = isDryRunReady(approval, context);
    const status = dryRunReady ? "dry_run_ready" : "denied";
    await recordSafely(store, event.id, {
      status,
      decision: approval
    });
    return Object.freeze({
      status,
      eventId: event.id,
      decision: approval,
      mergeAttempted: false,
      receiptReactionAdded: false
    });
  }

  const approvalClaimed = await store.claimApproval({
    workspaceId: event.workspaceId,
    channelId: event.channelId,
    messageTs: event.messageTs,
    reviewedSha: binding.reviewedSha,
    eventId: event.id,
    authorizedByUserId: event.userId
  });
  if (approvalClaimed !== true) {
    const prior = await store.getApprovalOutcome({
      workspaceId: event.workspaceId,
      channelId: event.channelId,
      messageTs: event.messageTs,
      reviewedSha: binding.reviewedSha
    });
    await recordSafely(store, event.id, {
      status: "approval_already_claimed",
      decision: approval
    });
    return Object.freeze({
      status: "approval_already_claimed",
      eventId: event.id,
      decision: approval,
      mergeAttempted: false,
      receiptReactionAdded: false,
      prior: prior ?? null
    });
  }

  await recordSafely(store, event.id, {
    status: "authorized",
    decision: approval
  });

  let mergeResult;
  try {
    mergeResult = await github.mergePullRequest({
      repoOwner: binding.repoOwner,
      repoName: binding.repoName,
      pullNumber: binding.pullNumber,
      sha: binding.reviewedSha,
      method: config.mergeMethod ?? "squash"
    });
  } catch (error) {
    await recordSafely(store, event.id, {
      status: "merge_failed",
      decision: approval,
      failure: {
        code: "GITHUB_MERGE_ERROR",
        message: error instanceof Error ? error.message : String(error)
      }
    });
    return Object.freeze({
      status: "merge_failed",
      eventId: event.id,
      decision: approval,
      mergeAttempted: true,
      receiptReactionAdded: false
    });
  }

  if (mergeResult?.merged !== true) {
    await recordSafely(store, event.id, {
      status: "merge_rejected",
      decision: approval,
      failure: {
        code: "GITHUB_DID_NOT_REPORT_MERGED",
        message: mergeResult?.message ?? null
      }
    });
    return Object.freeze({
      status: "merge_rejected",
      eventId: event.id,
      decision: approval,
      mergeAttempted: true,
      receiptReactionAdded: false
    });
  }

  const receipt = {
    eventId: event.id,
    workspaceId: event.workspaceId,
    channelId: event.channelId,
    messageTs: event.messageTs,
    authorizedByUserId: event.userId,
    repoOwner: binding.repoOwner,
    repoName: binding.repoName,
    pullNumber: binding.pullNumber,
    reviewedSha: binding.reviewedSha,
    mergeCommitSha: mergeResult.sha ?? null,
    mergeMethod: config.mergeMethod ?? "squash",
    githubResponse: mergeResult,
    mergedAt: new Date().toISOString()
  };

  let durable;
  try {
    durable = await store.saveMergeReceipt(receipt);
  } catch (error) {
    await recordSafely(store, event.id, {
      status: "merged_receipt_failed",
      decision: approval,
      failure: {
        code: "DURABLE_RECEIPT_ERROR",
        message: error instanceof Error ? error.message : String(error)
      }
    });
    return Object.freeze({
      status: "merged_receipt_failed",
      eventId: event.id,
      decision: approval,
      mergeAttempted: true,
      receiptReactionAdded: false
    });
  }

  if (durable?.durable !== true) {
    await recordSafely(store, event.id, {
      status: "merged_receipt_failed",
      decision: approval,
      failure: {
        code: "DURABLE_RECEIPT_NOT_CONFIRMED",
        message: null
      }
    });
    return Object.freeze({
      status: "merged_receipt_failed",
      eventId: event.id,
      decision: approval,
      mergeAttempted: true,
      receiptReactionAdded: false
    });
  }

  try {
    await slack.addReaction({
      workspaceId: event.workspaceId,
      channelId: event.channelId,
      timestamp: event.messageTs,
      name: REACTION_RECEIPT
    });
    await store.markReceiptReaction(event.id, {
      reaction: REACTION_RECEIPT,
      recordedAt: new Date().toISOString()
    });
  } catch (error) {
    await recordSafely(store, event.id, {
      status: "merged_receipted_reaction_failed",
      decision: approval,
      failure: {
        code: "SLACK_RECEIPT_REACTION_ERROR",
        message: error instanceof Error ? error.message : String(error)
      }
    });
    return Object.freeze({
      status: "merged_receipted_reaction_failed",
      eventId: event.id,
      decision: approval,
      mergeAttempted: true,
      receiptReactionAdded: false
    });
  }

  await recordSafely(store, event.id, {
    status: "completed",
    decision: approval
  });

  return Object.freeze({
    status: "completed",
    eventId: event.id,
    decision: approval,
    mergeAttempted: true,
    receiptReactionAdded: true,
    receipt
  });
}

export { DecisionCode };

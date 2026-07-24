import {
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
  requireMethod(adapters?.store, "store", "getEventOutcome");
  requireMethod(adapters?.store, "store", "findBinding");
  requireMethod(adapters?.store, "store", "recordDecision");
  requireMethod(adapters?.store, "store", "finalizeDryRunApproval");
  requireMethod(adapters?.github, "github", "getPullRequest");
}

async function record(store, eventId, status, decision) {
  const durable = await store.recordDecision(eventId, {
    status,
    decision,
    recordedAt: new Date().toISOString()
  });
  if (durable !== true) {
    throw new Error("Durable decision write was not confirmed");
  }
}

/**
 * Phase 2 processor. This module has no approval-claim, merge, merge-receipt,
 * or completion-reaction method and never asks an adapter for one.
 */
export async function processDryRunReaction({ event, config, adapters }) {
  validateAdapters(adapters);
  const { store, github } = adapters;

  const envelope = evaluateEventEnvelope({ event, config });
  if (envelope.verdict !== "allow") {
    return Object.freeze({
      status: envelope.verdict === "ignore" ? "ignored" : "denied",
      eventId: event?.id ?? null,
      decision: envelope,
      mergeAttempted: false
    });
  }

  const claimed = await store.claimEvent(event);
  if (claimed !== true) {
    return Object.freeze({
      status: "duplicate",
      eventId: event?.id ?? null,
      prior: await store.getEventOutcome(event?.id ?? null),
      mergeAttempted: false
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
  const decision = evaluateApproval(context);
  const dryRunReady = isDryRunReady(decision, context);
  if (dryRunReady) {
    const durable = await store.finalizeDryRunApproval({
      eventId: event.id,
      workspaceId: event.workspaceId,
      channelId: event.channelId,
      messageTs: event.messageTs,
      reviewedSha: binding.reviewedSha,
      authorizedByUserId: event.userId,
      decision
    });
    if (durable !== true) {
      await record(store, event.id, "approval_already_claimed", decision);
      return Object.freeze({
        status: "approval_already_claimed",
        eventId: event.id,
        decision,
        mergeAttempted: false
      });
    }
    return Object.freeze({
      status: "dry_run_ready",
      eventId: event.id,
      decision,
      mergeAttempted: false
    });
  }

  await record(store, event.id, "denied", decision);
  return Object.freeze({
    status: "denied",
    eventId: event.id,
    decision,
    mergeAttempted: false
  });
}

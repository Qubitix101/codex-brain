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
  requireMethod(adapters?.github, "github", "getPullRequest");
}

async function record(store, eventId, status, decision) {
  await store.recordDecision(eventId, {
    status,
    decision,
    recordedAt: new Date().toISOString()
  });
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
  const status = isDryRunReady(decision, context) ? "dry_run_ready" : "denied";

  await record(store, event.id, status, decision);
  return Object.freeze({
    status,
    eventId: event.id,
    decision,
    mergeAttempted: false
  });
}

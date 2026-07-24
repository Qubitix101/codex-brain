export const REACTION_ROCKET = "rocket";
export const REACTION_RECEIPT = "white_check_mark";

export const DecisionCode = Object.freeze({
  READY: "READY",
  NOT_ROCKET: "NOT_ROCKET",
  INVALID_EVENT: "INVALID_EVENT",
  WORKSPACE_NOT_ALLOWED: "WORKSPACE_NOT_ALLOWED",
  CHANNEL_NOT_ALLOWED: "CHANNEL_NOT_ALLOWED",
  USER_NOT_ALLOWED: "USER_NOT_ALLOWED",
  BINDING_NOT_FOUND: "BINDING_NOT_FOUND",
  BINDING_SCOPE_MISMATCH: "BINDING_SCOPE_MISMATCH",
  INVALID_BINDING: "INVALID_BINDING",
  REPOSITORY_NOT_ALLOWED: "REPOSITORY_NOT_ALLOWED",
  BASE_BRANCH_NOT_ALLOWED: "BASE_BRANCH_NOT_ALLOWED",
  LOOP_APPROVAL_MISSING: "LOOP_APPROVAL_MISSING",
  LOW_RISK_LABEL_MISSING: "LOW_RISK_LABEL_MISSING",
  RISK_NOT_LOW: "RISK_NOT_LOW",
  BINDING_MERGE_DISABLED: "BINDING_MERGE_DISABLED",
  LIVE_PULL_REQUEST_MISSING: "LIVE_PULL_REQUEST_MISSING",
  PULL_REQUEST_NOT_OPEN: "PULL_REQUEST_NOT_OPEN",
  PULL_REQUEST_IS_DRAFT: "PULL_REQUEST_IS_DRAFT",
  STALE_REVIEWED_SHA: "STALE_REVIEWED_SHA",
  REQUIRED_CHECKS_MISSING: "REQUIRED_CHECKS_MISSING",
  REQUIRED_CHECKS_NOT_SUCCESSFUL: "REQUIRED_CHECKS_NOT_SUCCESSFUL",
  TRUSTED_REVIEWER_CHECK_NOT_CONFIGURED: "TRUSTED_REVIEWER_CHECK_NOT_CONFIGURED",
  TRUSTED_REVIEWER_CHECK_MISSING: "TRUSTED_REVIEWER_CHECK_MISSING",
  MERGEABLE_STATE_NOT_CLEAN: "MERGEABLE_STATE_NOT_CLEAN",
  MODE_NOT_LIVE: "MODE_NOT_LIVE",
  LIVE_MERGE_DISABLED: "LIVE_MERGE_DISABLED"
});

function decision(verdict, code, details = {}) {
  return Object.freeze({ verdict, code, ...details });
}

function includes(list, value) {
  return Array.isArray(list) && list.includes(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function labelsOf(pullRequest) {
  return Array.isArray(pullRequest?.labels)
    ? pullRequest.labels.map((label) =>
        typeof label === "string" ? label : label?.name
      )
    : [];
}

function requiredChecksAreSuccessful(requiredChecks) {
  return requiredChecks.every(
    (check) =>
      check?.status === "completed" &&
      check?.conclusion === "success"
  );
}

function hasTrustedReviewerCheck(requiredChecks, expected) {
  if (!isNonEmptyString(expected?.name) || expected?.appId === undefined) {
    return false;
  }
  return requiredChecks.some(
    (check) =>
      check?.name === expected.name &&
      String(check?.appId) === String(expected.appId) &&
      check?.status === "completed" &&
      check?.conclusion === "success"
  );
}

export function isRocketReaction(event) {
  return event?.reaction === REACTION_ROCKET || event?.reaction === "🚀";
}

/**
 * Evaluate gates that require only the Slack event and static configuration.
 * This prevents untrusted events from triggering binding or GitHub reads.
 */
export function evaluateEventEnvelope({ event, config }) {
  if (!isNonEmptyString(event?.id) || !isNonEmptyString(event?.messageTs)) {
    return decision("deny", DecisionCode.INVALID_EVENT);
  }

  if (!isRocketReaction(event)) {
    return decision("ignore", DecisionCode.NOT_ROCKET);
  }

  if (!includes(config?.allowedWorkspaceIds, event.workspaceId)) {
    return decision("deny", DecisionCode.WORKSPACE_NOT_ALLOWED);
  }

  if (!includes(config?.allowedChannelIds, event.channelId)) {
    return decision("deny", DecisionCode.CHANNEL_NOT_ALLOWED);
  }

  if (!includes(config?.allowedUserIds, event.userId)) {
    return decision("deny", DecisionCode.USER_NOT_ALLOWED);
  }

  return decision("allow", DecisionCode.READY);
}

/**
 * Evaluate the live approval snapshot. It is intentionally side-effect free.
 */
export function evaluateApproval({ event, config, binding, pullRequest }) {
  const envelope = evaluateEventEnvelope({ event, config });
  if (envelope.verdict !== "allow") {
    return envelope;
  }

  if (!binding) {
    return decision("deny", DecisionCode.BINDING_NOT_FOUND);
  }

  const bindingMatchesEvent =
    binding.workspaceId === event.workspaceId &&
    binding.channelId === event.channelId &&
    binding.messageTs === event.messageTs;

  if (!bindingMatchesEvent) {
    return decision("deny", DecisionCode.BINDING_SCOPE_MISMATCH);
  }

  const bindingIsComplete =
    isNonEmptyString(binding.repoOwner) &&
    isNonEmptyString(binding.repoName) &&
    isPositiveInteger(binding.pullNumber) &&
    isNonEmptyString(binding.reviewedSha);

  if (!bindingIsComplete) {
    return decision("deny", DecisionCode.INVALID_BINDING);
  }

  if (binding.riskLevel !== "low") {
    return decision("deny", DecisionCode.RISK_NOT_LOW);
  }

  if (binding.mergeEnabled !== true) {
    return decision("deny", DecisionCode.BINDING_MERGE_DISABLED);
  }

  if (!pullRequest) {
    return decision("deny", DecisionCode.LIVE_PULL_REQUEST_MISSING);
  }

  const repository = `${binding.repoOwner}/${binding.repoName}`;
  if (!includes(config?.allowedRepositories, repository)) {
    return decision("deny", DecisionCode.REPOSITORY_NOT_ALLOWED);
  }

  if (!includes(config?.allowedBaseBranches, pullRequest.baseBranch)) {
    return decision("deny", DecisionCode.BASE_BRANCH_NOT_ALLOWED);
  }

  if (pullRequest.state !== "open") {
    return decision("deny", DecisionCode.PULL_REQUEST_NOT_OPEN);
  }

  if (pullRequest.isDraft === true) {
    return decision("deny", DecisionCode.PULL_REQUEST_IS_DRAFT);
  }

  if (pullRequest.headSha !== binding.reviewedSha) {
    return decision("deny", DecisionCode.STALE_REVIEWED_SHA, {
      reviewedSha: binding.reviewedSha,
      liveHeadSha: pullRequest.headSha ?? null
    });
  }

  const labels = labelsOf(pullRequest);
  if (!labels.includes("loop-approved")) {
    return decision("deny", DecisionCode.LOOP_APPROVAL_MISSING);
  }

  if (!labels.includes("risk:low")) {
    return decision("deny", DecisionCode.LOW_RISK_LABEL_MISSING);
  }

  if (!Array.isArray(pullRequest.requiredChecks) || pullRequest.requiredChecks.length === 0) {
    return decision("deny", DecisionCode.REQUIRED_CHECKS_MISSING);
  }

  if (!requiredChecksAreSuccessful(pullRequest.requiredChecks)) {
    return decision("deny", DecisionCode.REQUIRED_CHECKS_NOT_SUCCESSFUL);
  }

  if (
    !isNonEmptyString(config?.trustedReviewerCheck?.name) ||
    config?.trustedReviewerCheck?.appId === undefined
  ) {
    return decision("deny", DecisionCode.TRUSTED_REVIEWER_CHECK_NOT_CONFIGURED);
  }

  if (!hasTrustedReviewerCheck(pullRequest.requiredChecks, config.trustedReviewerCheck)) {
    return decision("deny", DecisionCode.TRUSTED_REVIEWER_CHECK_MISSING);
  }

  if (String(pullRequest.mergeableState).toLowerCase() !== "clean") {
    return decision("deny", DecisionCode.MERGEABLE_STATE_NOT_CLEAN);
  }

  if (config?.mode !== "live") {
    return decision("deny", DecisionCode.MODE_NOT_LIVE);
  }

  if (config?.liveMergeEnabled !== true) {
    return decision("deny", DecisionCode.LIVE_MERGE_DISABLED);
  }

  return decision("allow", DecisionCode.READY, {
    target: Object.freeze({
      repoOwner: binding.repoOwner,
      repoName: binding.repoName,
      pullNumber: binding.pullNumber,
      reviewedSha: binding.reviewedSha
    })
  });
}

export function isDryRunReady(decisionResult, context) {
  if (
    decisionResult.code !== DecisionCode.MODE_NOT_LIVE &&
    decisionResult.code !== DecisionCode.LIVE_MERGE_DISABLED
  ) {
    return false;
  }

  const hypothetical = evaluateApproval({
    ...context,
    config: {
      ...context.config,
      mode: "live",
      liveMergeEnabled: true
    }
  });

  return hypothetical.verdict === "allow";
}

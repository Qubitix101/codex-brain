function csv(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function required(env, name) {
  const value = env[name];
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function loadSlackVerificationConfig(env = process.env) {
  return Object.freeze({
    signingSecret: required(env, "SLACK_SIGNING_SECRET")
  });
}

export function loadRuntimeConfig(env = process.env) {
  const enabled = env.JASS_LOOP_ENABLED === "true";
  const mode = env.JASS_LOOP_MODE ?? "dry-run";
  const liveMergeEnabled = env.JASS_LOOP_LIVE_MERGE_ENABLED === "true";

  if (mode !== "dry-run") {
    throw new Error("Phase 2 permits only JASS_LOOP_MODE=dry-run");
  }
  if (liveMergeEnabled) {
    throw new Error("Phase 2 forbids JASS_LOOP_LIVE_MERGE_ENABLED=true");
  }

  return Object.freeze({
    enabled,
    mode,
    liveMergeEnabled,
    signingSecret: loadSlackVerificationConfig(env).signingSecret,
    slackBotToken: required(env, "SLACK_BOT_TOKEN"),
    supabaseUrl: required(env, "SUPABASE_URL").replace(/\/+$/, ""),
    supabaseServiceRoleKey: required(env, "SUPABASE_SERVICE_ROLE_KEY"),
    githubToken: required(env, "GITHUB_READ_TOKEN"),
    allowedWorkspaceIds: csv(required(env, "JASS_LOOP_ALLOWED_WORKSPACE_IDS")),
    allowedChannelIds: csv(required(env, "JASS_LOOP_ALLOWED_CHANNEL_IDS")),
    allowedUserIds: csv(required(env, "JASS_LOOP_ALLOWED_USER_IDS")),
    allowedRepositories: csv(required(env, "JASS_LOOP_ALLOWED_REPOSITORIES")),
    allowedBaseBranches: csv(required(env, "JASS_LOOP_ALLOWED_BASE_BRANCHES")),
    trustedReviewerCheck: Object.freeze({
      name: required(env, "JASS_LOOP_TRUSTED_CHECK_NAME"),
      appId: Number(required(env, "JASS_LOOP_TRUSTED_CHECK_APP_ID"))
    }),
    mergeMethod: "squash"
  });
}

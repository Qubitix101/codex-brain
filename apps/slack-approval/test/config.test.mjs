import test from "node:test";
import assert from "node:assert/strict";

import {
  loadRuntimeConfig,
  loadSlackVerificationConfig
} from "../src/config.mjs";

function environment(overrides = {}) {
  return {
    JASS_LOOP_ENABLED: "true",
    JASS_LOOP_MODE: "dry-run",
    JASS_LOOP_LIVE_MERGE_ENABLED: "false",
    SLACK_SIGNING_SECRET: "signing",
    SLACK_BOT_TOKEN: "bot",
    SUPABASE_URL: "https://example.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "service",
    GITHUB_READ_TOKEN: "github",
    JASS_LOOP_ALLOWED_WORKSPACE_IDS: "T1",
    JASS_LOOP_ALLOWED_CHANNEL_IDS: "C1",
    JASS_LOOP_ALLOWED_USER_IDS: "U1",
    JASS_LOOP_ALLOWED_REPOSITORIES: "Qubitix101/codex-brain",
    JASS_LOOP_ALLOWED_BASE_BRANCHES: "main",
    JASS_LOOP_TRUSTED_CHECK_NAME: "verify",
    JASS_LOOP_TRUSTED_CHECK_APP_ID: "15368",
    ...overrides
  };
}

test("loads the fixed dry-run operating contract", () => {
  const config = loadRuntimeConfig(environment());
  assert.equal(config.enabled, true);
  assert.equal(config.mode, "dry-run");
  assert.equal(config.liveMergeEnabled, false);
  assert.deepEqual(config.allowedRepositories, ["Qubitix101/codex-brain"]);
  assert.deepEqual(config.trustedReviewerCheck, {
    name: "verify",
    appId: 15368
  });
});

test("loads signing verification without requiring the runtime adapters", () => {
  assert.deepEqual(
    loadSlackVerificationConfig({
      SLACK_SIGNING_SECRET: "signing-only"
    }),
    {
      signingSecret: "signing-only"
    }
  );
});

test("refuses live mode even if an environment variable is changed", () => {
  assert.throws(
    () => loadRuntimeConfig(environment({ JASS_LOOP_MODE: "live" })),
    /Phase 2 permits only/
  );
  assert.throws(
    () => loadRuntimeConfig(environment({ JASS_LOOP_LIVE_MERGE_ENABLED: "true" })),
    /Phase 2 forbids/
  );
});

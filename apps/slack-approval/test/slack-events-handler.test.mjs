import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { Readable } from "node:stream";

import { createSlackEventsHandler } from "../api/slack-events.mjs";

const SIGNING_SECRET = "test-signing-secret";

function environment(overrides = {}) {
  return {
    JASS_LOOP_ENABLED: "true",
    JASS_LOOP_MODE: "dry-run",
    JASS_LOOP_LIVE_MERGE_ENABLED: "false",
    SLACK_SIGNING_SECRET: SIGNING_SECRET,
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

function signedRequest(payload) {
  const raw = Buffer.from(JSON.stringify(payload));
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = `v0=${createHmac("sha256", SIGNING_SECRET)
    .update(Buffer.concat([Buffer.from(`v0:${timestamp}:`), raw]))
    .digest("hex")}`;
  const request = Readable.from([raw]);
  request.method = "POST";
  request.headers = {
    "x-slack-request-timestamp": timestamp,
    "x-slack-signature": signature
  };
  return request;
}

function responseRecorder() {
  return {
    statusCode: null,
    headers: {},
    body: "",
    setHeader(name, value) {
      this.headers[name] = value;
    },
    end(value) {
      this.body = String(value ?? "");
    }
  };
}

test("answers Slack URL verification after signature validation", async () => {
  const handler = createSlackEventsHandler({ env: environment() });
  const response = responseRecorder();
  await handler(signedRequest({
    type: "url_verification",
    challenge: "challenge-value"
  }), response);
  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), {
    challenge: "challenge-value"
  });
});

test("answers Slack URL verification before full runtime provisioning", async () => {
  const handler = createSlackEventsHandler({
    env: {
      SLACK_SIGNING_SECRET: SIGNING_SECRET
    }
  });
  const response = responseRecorder();
  await handler(signedRequest({
    type: "url_verification",
    challenge: "bootstrap-challenge"
  }), response);
  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), {
    challenge: "bootstrap-challenge"
  });
});

test("acknowledges only after reading the durable decision", async () => {
  let replies = 0;
  const adapter = {
    store: {
      async claimEvent() { return false; },
      async getEventOutcome() { return { status: "dry_run_ready" }; },
      async findBinding() { throw new Error("should not run"); },
      async recordDecision() { return true; },
      async finalizeDryRunApproval() { throw new Error("should not run"); }
    },
    github: {
      async getPullRequest() { throw new Error("should not run"); }
    },
    slack: {
      async postDryRunResult() { replies += 1; },
      async postProcessingFailure() {}
    }
  };
  const handler = createSlackEventsHandler({
    env: environment(),
    createAdapters() { return adapter; }
  });
  const response = responseRecorder();
  await handler(signedRequest({
    type: "event_callback",
    event_id: "Ev1",
    team_id: "T1",
    event: {
      type: "reaction_added",
      reaction: "rocket",
      user: "U1",
      item: { type: "message", channel: "C1", ts: "1.2" }
    }
  }), response);

  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), {
    ok: true,
    code: "ACCEPTED"
  });
  assert.equal(replies, 1);
});

test("never posts into a channel outside the approved reply boundary", async () => {
  let replies = 0;
  const adapter = {
    store: {
      async claimEvent() { return true; },
      async getEventOutcome() { return null; },
      async findBinding() { throw new Error("should not run"); },
      async recordDecision() { return true; },
      async finalizeDryRunApproval() { throw new Error("should not run"); }
    },
    github: {
      async getPullRequest() { throw new Error("should not run"); }
    },
    slack: {
      async postDryRunResult() { replies += 1; },
      async postProcessingFailure() { replies += 1; }
    }
  };
  const handler = createSlackEventsHandler({
    env: environment(),
    createAdapters() { return adapter; }
  });
  const response = responseRecorder();
  await handler(signedRequest({
    type: "event_callback",
    event_id: "Ev-outside",
    team_id: "T1",
    event: {
      type: "reaction_added",
      reaction: "rocket",
      user: "U1",
      item: { type: "message", channel: "C-NOT-ALLOWED", ts: "1.3" }
    }
  }), response);
  assert.equal(response.statusCode, 200);
  assert.equal(replies, 0);
});

test("returns a retryable error and never claims recording when storage fails", async () => {
  let dryRunReplies = 0;
  let failureReplies = 0;
  const adapter = {
    store: {
      async claimEvent() { throw new Error("database unavailable"); },
      async getEventOutcome() { return null; },
      async findBinding() { throw new Error("should not run"); },
      async recordDecision() { return false; },
      async finalizeDryRunApproval() { throw new Error("should not run"); }
    },
    github: {
      async getPullRequest() { throw new Error("should not run"); }
    },
    slack: {
      async postDryRunResult() { dryRunReplies += 1; },
      async postProcessingFailure() { failureReplies += 1; }
    }
  };
  const handler = createSlackEventsHandler({
    env: environment(),
    createAdapters() { return adapter; }
  });
  const response = responseRecorder();
  await handler(signedRequest({
    type: "event_callback",
    event_id: "Ev-storage-failed",
    team_id: "T1",
    event: {
      type: "reaction_added",
      reaction: "rocket",
      user: "U1",
      item: { type: "message", channel: "C1", ts: "1.4" }
    }
  }), response);
  assert.equal(response.statusCode, 503);
  assert.equal(JSON.parse(response.body).code, "RETRYABLE_PROCESSING_FAILURE");
  assert.equal(dryRunReplies, 0);
  assert.equal(failureReplies, 1);
});

test("reconciles a committed approval when the finalization response is lost", async () => {
  const sha = "a".repeat(40);
  let failureWrites = 0;
  let readyReplies = 0;
  const adapter = {
    store: {
      async claimEvent() { return true; },
      async getEventOutcome() {
        return {
          status: "dry_run_ready",
          decision: { code: "MODE_NOT_LIVE" }
        };
      },
      async findBinding() {
        return {
          workspaceId: "T1",
          channelId: "C1",
          messageTs: "1.5",
          repoOwner: "Qubitix101",
          repoName: "codex-brain",
          pullNumber: 2,
          reviewedSha: sha,
          riskLevel: "low",
          mergeEnabled: true
        };
      },
      async recordDecision() {
        failureWrites += 1;
        return true;
      },
      async finalizeDryRunApproval() {
        throw new Error("response lost after commit");
      }
    },
    github: {
      async getPullRequest() {
        return {
          headSha: sha,
          baseBranch: "main",
          state: "open",
          isDraft: false,
          labels: ["loop-approved", "risk:low"],
          requiredChecks: [{
            name: "verify",
            appId: 15368,
            status: "completed",
            conclusion: "success"
          }],
          mergeableState: "clean"
        };
      }
    },
    slack: {
      async postDryRunResult() { readyReplies += 1; },
      async postProcessingFailure() { throw new Error("should not run"); }
    }
  };
  const handler = createSlackEventsHandler({
    env: environment(),
    createAdapters() { return adapter; }
  });
  const response = responseRecorder();
  await handler(signedRequest({
    type: "event_callback",
    event_id: "Ev-ambiguous",
    team_id: "T1",
    event: {
      type: "reaction_added",
      reaction: "rocket",
      user: "U1",
      item: { type: "message", channel: "C1", ts: "1.5" }
    }
  }), response);
  assert.equal(response.statusCode, 200);
  assert.equal(JSON.parse(response.body).code, "RECONCILED_DURABLE_OUTCOME");
  assert.equal(failureWrites, 0);
  assert.equal(readyReplies, 1);
});

test("keeps an in-flight duplicate retryable until its lease can recover", async () => {
  let replies = 0;
  const adapter = {
    store: {
      async claimEvent() { return false; },
      async getEventOutcome() { return { status: "claimed" }; },
      async findBinding() { throw new Error("should not run"); },
      async recordDecision() { throw new Error("should not run"); },
      async finalizeDryRunApproval() { throw new Error("should not run"); }
    },
    github: {
      async getPullRequest() { throw new Error("should not run"); }
    },
    slack: {
      async postDryRunResult() { replies += 1; },
      async postProcessingFailure() { replies += 1; }
    }
  };
  const handler = createSlackEventsHandler({
    env: environment(),
    createAdapters() { return adapter; }
  });
  const response = responseRecorder();
  await handler(signedRequest({
    type: "event_callback",
    event_id: "Ev-in-flight",
    team_id: "T1",
    event: {
      type: "reaction_added",
      reaction: "rocket",
      user: "U1",
      item: { type: "message", channel: "C1", ts: "1.6" }
    }
  }), response);
  assert.equal(response.statusCode, 503);
  assert.equal(JSON.parse(response.body).code, "RETRYABLE_EVENT_IN_PROGRESS");
  assert.equal(replies, 0);
});

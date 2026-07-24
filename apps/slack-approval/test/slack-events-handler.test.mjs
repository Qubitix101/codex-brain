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

test("acknowledges a reaction promptly and schedules one bounded processor", async () => {
  const scheduled = [];
  const adapter = {
    store: {
      async claimEvent() { return false; },
      async getEventOutcome() { return { status: "dry_run_ready" }; },
      async findBinding() { throw new Error("should not run"); },
      async recordDecision() {}
    },
    github: {
      async getPullRequest() { throw new Error("should not run"); }
    },
    slack: {
      async postDryRunResult() {}
    }
  };
  const handler = createSlackEventsHandler({
    env: environment(),
    schedule(promise) { scheduled.push(promise); },
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
  assert.equal(scheduled.length, 1);
  await scheduled[0];
});

test("never posts into a channel outside the approved reply boundary", async () => {
  const scheduled = [];
  let replies = 0;
  const adapter = {
    store: {
      async claimEvent() { return true; },
      async getEventOutcome() { return null; },
      async findBinding() { throw new Error("should not run"); },
      async recordDecision() {}
    },
    github: {
      async getPullRequest() { throw new Error("should not run"); }
    },
    slack: {
      async postDryRunResult() { replies += 1; }
    }
  };
  const handler = createSlackEventsHandler({
    env: environment(),
    schedule(promise) { scheduled.push(promise); },
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
  await scheduled[0];
  assert.equal(response.statusCode, 200);
  assert.equal(replies, 0);
});

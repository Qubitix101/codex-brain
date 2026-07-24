import { waitUntil } from "@vercel/functions";

import { loadRuntimeConfig } from "../src/config.mjs";
import { processDryRunReaction } from "../src/dry-run-engine.mjs";
import { createGitHubReadOnlyAdapter } from "../src/github-readonly.mjs";
import { createSlackClient } from "../src/slack-client.mjs";
import { normalizeSlackEvent } from "../src/slack-event.mjs";
import { readRawBody, verifySlackSignature } from "../src/slack-signature.mjs";
import { createSupabaseStore } from "../src/supabase-store.mjs";

export const config = {
  api: {
    bodyParser: false
  }
};

function reply(response, status, body) {
  response.statusCode = status;
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.end(JSON.stringify(body));
}

function adaptersFor(runtime) {
  return {
    store: createSupabaseStore({
      url: runtime.supabaseUrl,
      serviceRoleKey: runtime.supabaseServiceRoleKey
    }),
    github: createGitHubReadOnlyAdapter({ token: runtime.githubToken }),
    slack: createSlackClient({ token: runtime.slackBotToken })
  };
}

function mayReplyToEvent(event, runtime) {
  return (
    runtime.allowedWorkspaceIds.includes(event.workspaceId) &&
    runtime.allowedChannelIds.includes(event.channelId) &&
    runtime.allowedUserIds.includes(event.userId)
  );
}

async function processInBackground({ event, runtime, adapters }) {
  const mayReply = mayReplyToEvent(event, runtime);
  try {
    const result = await processDryRunReaction({
      event,
      config: runtime,
      adapters
    });
    if (
      mayReply &&
      result.status !== "duplicate" &&
      result.status !== "ignored"
    ) {
      await adapters.slack.postDryRunResult({
        channelId: event.channelId,
        messageTs: event.messageTs,
        result
      });
    }
  } catch (error) {
    const code = error?.code ?? "PROCESSING_ERROR";
    console.error("jass_loop_event_failed", {
      eventId: event.id,
      code
    });
    try {
      await adapters.store.recordDecision(event.id, {
        status: "processing_failed",
        failure: { code }
      });
    } catch {
      console.error("jass_loop_failure_receipt_failed", {
        eventId: event.id
      });
    }
    if (mayReply) {
      try {
        await adapters.slack.postDryRunResult({
          channelId: event.channelId,
          messageTs: event.messageTs,
          result: { status: "PROCESSING_ERROR" }
        });
      } catch {
        console.error("jass_loop_failure_notification_failed", {
          eventId: event.id
        });
      }
    }
  }
}

export function createSlackEventsHandler({
  env = process.env,
  schedule = waitUntil,
  createAdapters = adaptersFor
} = {}) {
  return async function slackEventsHandler(request, response) {
    if (request.method !== "POST") {
      return reply(response, 405, { ok: false, code: "METHOD_NOT_ALLOWED" });
    }

    let rawBody;
    try {
      rawBody = await readRawBody(request);
    } catch (error) {
      return reply(response, error?.code === "BODY_TOO_LARGE" ? 413 : 400, {
        ok: false,
        code: error?.code ?? "INVALID_BODY"
      });
    }

    let runtime;
    try {
      runtime = loadRuntimeConfig(env);
    } catch {
      return reply(response, 503, { ok: false, code: "CONFIGURATION_ERROR" });
    }

    const verification = verifySlackSignature({
      rawBody,
      timestamp: request.headers["x-slack-request-timestamp"],
      signature: request.headers["x-slack-signature"],
      signingSecret: runtime.signingSecret
    });
    if (!verification.ok) {
      return reply(response, 401, { ok: false, code: verification.code });
    }

    let payload;
    try {
      payload = JSON.parse(rawBody.toString("utf8"));
    } catch {
      return reply(response, 400, { ok: false, code: "INVALID_JSON" });
    }

    if (payload.type === "url_verification") {
      return reply(response, 200, { challenge: payload.challenge });
    }

    if (!runtime.enabled) {
      return reply(response, 200, { ok: true, code: "BRIDGE_DISABLED" });
    }

    const retryNumber = Number(request.headers["x-slack-retry-num"] ?? 0);
    if (Number.isFinite(retryNumber) && retryNumber > 2) {
      return reply(response, 200, { ok: true, code: "RETRY_LIMIT_REACHED" });
    }

    const event = normalizeSlackEvent(payload);
    if (!event) {
      return reply(response, 200, { ok: true, code: "EVENT_IGNORED" });
    }

    schedule(processInBackground({
      event,
      runtime,
      adapters: createAdapters(runtime)
    }));
    return reply(response, 200, { ok: true, code: "ACCEPTED" });
  };
}

export default createSlackEventsHandler();

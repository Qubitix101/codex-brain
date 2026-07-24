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

function adaptersFor(runtime, signal) {
  return {
    store: createSupabaseStore({
      url: runtime.supabaseUrl,
      serviceRoleKey: runtime.supabaseServiceRoleKey,
      signal
    }),
    github: createGitHubReadOnlyAdapter({ token: runtime.githubToken, signal }),
    slack: createSlackClient({ token: runtime.slackBotToken, signal })
  };
}

function mayReplyToEvent(event, runtime) {
  return (
    runtime.allowedWorkspaceIds.includes(event.workspaceId) &&
    runtime.allowedChannelIds.includes(event.channelId) &&
    runtime.allowedUserIds.includes(event.userId)
  );
}

export function createSlackEventsHandler({
  env = process.env,
  createAdapters = adaptersFor,
  processingTimeoutMs = 2400
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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), processingTimeoutMs);
    const adapters = createAdapters(runtime, controller.signal);
    let result;
    try {
      result = await processDryRunReaction({
        event,
        config: runtime,
        adapters
      });
    } catch (error) {
      clearTimeout(timeout);
      const code = error?.name === "AbortError"
        ? "PROCESSING_TIMEOUT"
        : error?.code ?? "PROCESSING_ERROR";
      console.error("jass_loop_event_failed", { eventId: event.id, code });
      try {
        const recoveryAdapters = createAdapters(
          runtime,
          AbortSignal.timeout(500)
        );
        const prior = await recoveryAdapters.store.getEventOutcome(event.id);
        if (
          prior &&
          ["dry_run_ready", "denied", "approval_already_claimed"].includes(
            prior.status
          )
        ) {
          if (mayReplyToEvent(event, runtime)) {
            try {
              await recoveryAdapters.slack.postDryRunResult({
                channelId: event.channelId,
                messageTs: event.messageTs,
                result: prior
              });
            } catch {
              return reply(response, 503, {
                ok: false,
                code: "RETRYABLE_NOTIFICATION_FAILURE"
              });
            }
          }
          return reply(response, 200, {
            ok: true,
            code: "RECONCILED_DURABLE_OUTCOME"
          });
        }
        const stored = await recoveryAdapters.store.recordDecision(event.id, {
          status: "processing_failed",
          failure: { code }
        });
        if (stored !== true) {
          console.error("jass_loop_failure_receipt_unconfirmed", {
            eventId: event.id
          });
        }
        if (mayReplyToEvent(event, runtime)) {
          await recoveryAdapters.slack.postProcessingFailure({
            channelId: event.channelId,
            messageTs: event.messageTs
          });
        }
      } catch {
        console.error("jass_loop_failure_handling_failed", {
          eventId: event.id
        });
      }
      return reply(response, 503, {
        ok: false,
        code: "RETRYABLE_PROCESSING_FAILURE"
      });
    }

    const notificationResult = result.status === "duplicate"
      ? result.prior
      : result;
    if (
      result.status === "duplicate" &&
      notificationResult?.status === "claimed"
    ) {
      clearTimeout(timeout);
      return reply(response, 503, {
        ok: false,
        code: "RETRYABLE_EVENT_IN_PROGRESS"
      });
    }
    if (
      mayReplyToEvent(event, runtime) &&
      notificationResult &&
      !["ignored", "claimed", "processing_failed"].includes(notificationResult.status)
    ) {
      try {
        await adapters.slack.postDryRunResult({
          channelId: event.channelId,
          messageTs: event.messageTs,
          result: notificationResult
        });
      } catch {
        clearTimeout(timeout);
        return reply(response, 503, {
          ok: false,
          code: "RETRYABLE_NOTIFICATION_FAILURE"
        });
      }
    }

    clearTimeout(timeout);
    return reply(response, 200, { ok: true, code: "ACCEPTED" });
  };
}

export default createSlackEventsHandler();

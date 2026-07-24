import test from "node:test";
import assert from "node:assert/strict";

import { processDryRunReaction } from "../src/dry-run-engine.mjs";

const SHA = "a".repeat(40);

function subject(overrides = {}) {
  const calls = [];
  return {
    calls,
    event: {
      id: "Ev1",
      reaction: "rocket",
      workspaceId: "T1",
      channelId: "C1",
      userId: "U1",
      messageTs: "1.2"
    },
    config: {
      mode: "dry-run",
      liveMergeEnabled: false,
      allowedWorkspaceIds: ["T1"],
      allowedChannelIds: ["C1"],
      allowedUserIds: ["U1"],
      allowedRepositories: ["Qubitix101/codex-brain"],
      allowedBaseBranches: ["main"],
      trustedReviewerCheck: { name: "verify", appId: 15368 }
    },
    adapters: {
      store: {
        async claimEvent() {
          calls.push("claimEvent");
          return overrides.claimed ?? true;
        },
        async getEventOutcome() {
          calls.push("getEventOutcome");
          return { status: "dry_run_ready" };
        },
        async findBinding() {
          calls.push("findBinding");
          return {
            workspaceId: "T1",
            channelId: "C1",
            messageTs: "1.2",
            repoOwner: "Qubitix101",
            repoName: "codex-brain",
            pullNumber: 2,
            reviewedSha: SHA,
            riskLevel: "low",
            mergeEnabled: true
          };
        },
        async recordDecision(_eventId, record) {
          calls.push(`recordDecision:${record.status}`);
          return true;
        },
        async finalizeDryRunApproval() {
          calls.push("finalizeDryRunApproval");
          return overrides.finalized ?? true;
        }
      },
      github: {
        async getPullRequest() {
          calls.push("getPullRequest");
          return {
            headSha: SHA,
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
      }
    }
  };
}

test("records dry_run_ready with no merge-capable adapter contract", async () => {
  const input = subject();
  const result = await processDryRunReaction(input);
  assert.equal(result.status, "dry_run_ready");
  assert.equal(result.mergeAttempted, false);
  assert.deepEqual(input.calls, [
    "claimEvent",
    "findBinding",
    "getPullRequest",
    "finalizeDryRunApproval"
  ]);
  assert.equal(input.adapters.github.mergePullRequest, undefined);
  assert.equal(input.adapters.store.claimApproval, undefined);
});

test("a second rocket cannot finalize the same binding", async () => {
  const input = subject({ finalized: false });
  const result = await processDryRunReaction(input);
  assert.equal(result.status, "approval_already_claimed");
  assert.deepEqual(input.calls, [
    "claimEvent",
    "findBinding",
    "getPullRequest",
    "finalizeDryRunApproval",
    "recordDecision:approval_already_claimed"
  ]);
});

test("duplicate delivery returns the durable outcome and does no live read", async () => {
  const input = subject({ claimed: false });
  const result = await processDryRunReaction(input);
  assert.equal(result.status, "duplicate");
  assert.deepEqual(input.calls, ["claimEvent", "getEventOutcome"]);
});

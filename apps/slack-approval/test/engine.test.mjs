import test from "node:test";
import assert from "node:assert/strict";

import { processReaction } from "../src/engine.mjs";

const SHA = "a".repeat(40);
const MERGE_SHA = "c".repeat(40);

function setup(overrides = {}) {
  const calls = [];
  const event = {
    id: "Ev-engine-001",
    reaction: "rocket",
    workspaceId: "T-ALLOWED",
    channelId: "C-MERGE",
    userId: "U-FOUNDER",
    messageTs: "1720000000.000100",
    ...overrides.event
  };
  const config = {
    mode: "live",
    liveMergeEnabled: true,
    allowedWorkspaceIds: ["T-ALLOWED"],
    allowedChannelIds: ["C-MERGE"],
    allowedUserIds: ["U-FOUNDER"],
    allowedRepositories: ["example/safe-repo"],
    allowedBaseBranches: ["main"],
    trustedReviewerCheck: {
      name: "loop-review",
      appId: 12345
    },
    mergeMethod: "squash",
    ...overrides.config
  };
  const binding = {
    workspaceId: "T-ALLOWED",
    channelId: "C-MERGE",
    messageTs: "1720000000.000100",
    repoOwner: "example",
    repoName: "safe-repo",
    pullNumber: 42,
    reviewedSha: SHA,
    riskLevel: "low",
    mergeEnabled: true,
    ...overrides.binding
  };
  const pullRequest = {
    headSha: SHA,
    baseBranch: "main",
    state: "open",
    isDraft: false,
    labels: ["loop-approved", "risk:low"],
    requiredChecks: [
      { name: "test", appId: 1, status: "completed", conclusion: "success" },
      {
        name: "loop-review",
        appId: 12345,
        status: "completed",
        conclusion: "success"
      }
    ],
    mergeableState: "clean",
    ...overrides.pullRequest
  };

  const adapters = {
    store: {
      async claimEvent(value) {
        calls.push(["claimEvent", value.id]);
        return overrides.claimed ?? true;
      },
      async claimApproval(value) {
        calls.push(["claimApproval", value]);
        return overrides.approvalClaimed ?? true;
      },
      async getEventOutcome(eventId) {
        calls.push(["getEventOutcome", eventId]);
        return overrides.eventOutcome ?? {
          status: "completed",
          receiptId: "receipt-existing"
        };
      },
      async getApprovalOutcome(value) {
        calls.push(["getApprovalOutcome", value]);
        return overrides.approvalOutcome ?? {
          status: "completed",
          receiptId: "receipt-existing"
        };
      },
      async findBinding(key) {
        calls.push(["findBinding", key]);
        return overrides.noBinding ? null : binding;
      },
      async recordDecision(eventId, record) {
        calls.push(["recordDecision", eventId, record.status]);
      },
      async saveMergeReceipt(receipt) {
        calls.push(["saveMergeReceipt", receipt.eventId]);
        if (overrides.receiptError) {
          throw new Error("database unavailable");
        }
        return { durable: overrides.durable ?? true };
      },
      async markReceiptReaction(eventId, value) {
        calls.push(["markReceiptReaction", eventId, value.reaction]);
      }
    },
    github: {
      async getPullRequest(target) {
        calls.push(["getPullRequest", target]);
        return pullRequest;
      },
      async mergePullRequest(target) {
        calls.push(["mergePullRequest", target]);
        if (overrides.mergeError) {
          throw new Error("head changed");
        }
        return {
          merged: overrides.merged ?? true,
          sha: MERGE_SHA,
          message: overrides.merged === false ? "not mergeable" : "merged"
        };
      }
    },
    slack: {
      async addReaction(target) {
        calls.push(["addReaction", target]);
        if (overrides.reactionError) {
          throw new Error("Slack unavailable");
        }
      }
    }
  };

  return { calls, event, config, adapters };
}

test("merges exact reviewed SHA, saves durable receipt, then adds check", async () => {
  const subject = setup();
  const result = await processReaction(subject);
  assert.equal(result.status, "completed");
  assert.equal(result.receiptReactionAdded, true);

  const mergeCall = subject.calls.find(([name]) => name === "mergePullRequest");
  assert.deepEqual(mergeCall[1], {
    repoOwner: "example",
    repoName: "safe-repo",
    pullNumber: 42,
    sha: SHA,
    method: "squash"
  });

  const receiptIndex = subject.calls.findIndex(
    ([name]) => name === "saveMergeReceipt"
  );
  const reactionIndex = subject.calls.findIndex(([name]) => name === "addReaction");
  assert.ok(receiptIndex >= 0);
  assert.ok(reactionIndex > receiptIndex);
  assert.equal(subject.calls[reactionIndex][1].name, "white_check_mark");
});

test("a duplicate event ID never reads GitHub or attempts a merge", async () => {
  const subject = setup({ claimed: false });
  const result = await processReaction(subject);
  assert.equal(result.status, "duplicate");
  assert.equal(result.mergeAttempted, false);
  assert.equal(result.prior.status, "completed");
  assert.deepEqual(subject.calls, [
    ["claimEvent", "Ev-engine-001"],
    ["getEventOutcome", "Ev-engine-001"]
  ]);
});

test("a second event cannot claim the same message-to-SHA approval", async () => {
  const subject = setup({ approvalClaimed: false });
  const result = await processReaction(subject);
  assert.equal(result.status, "approval_already_claimed");
  assert.equal(result.mergeAttempted, false);
  assert.equal(result.prior.status, "completed");
  assert.equal(
    subject.calls.some(([name]) => name === "mergePullRequest"),
    false
  );
  assert.equal(
    subject.calls.some(([name]) => name === "addReaction"),
    false
  );
});

test("distinct event IDs racing the same approval cause one merge attempt", async () => {
  const subject = setup();
  let approvalAvailable = true;
  subject.adapters.store.claimApproval = async (value) => {
    subject.calls.push(["claimApproval", value]);
    if (!approvalAvailable) return false;
    approvalAvailable = false;
    return true;
  };
  const secondEvent = { ...subject.event, id: "Ev-engine-002" };

  const results = await Promise.all([
    processReaction(subject),
    processReaction({ ...subject, event: secondEvent })
  ]);

  const statuses = results.map((result) => result.status).sort();
  assert.deepEqual(statuses, ["approval_already_claimed", "completed"]);
  assert.equal(
    subject.calls.filter(([name]) => name === "mergePullRequest").length,
    1
  );
  assert.equal(
    subject.calls.filter(([name]) => name === "addReaction").length,
    1
  );
});

test("a stale head fails closed before the merge adapter", async () => {
  const subject = setup({ pullRequest: { headSha: "b".repeat(40) } });
  const result = await processReaction(subject);
  assert.equal(result.status, "denied");
  assert.equal(result.decision.code, "STALE_REVIEWED_SHA");
  assert.equal(
    subject.calls.some(([name]) => name === "mergePullRequest"),
    false
  );
  assert.equal(
    subject.calls.some(([name]) => name === "addReaction"),
    false
  );
});

test("dry-run-ready records readiness but never calls merge", async () => {
  const subject = setup({
    config: { mode: "dry-run", liveMergeEnabled: false }
  });
  const result = await processReaction(subject);
  assert.equal(result.status, "dry_run_ready");
  assert.equal(result.mergeAttempted, false);
  assert.equal(
    subject.calls.some(([name]) => name === "mergePullRequest"),
    false
  );
});

test("GitHub reporting not merged never creates receipt or check", async () => {
  const subject = setup({ merged: false });
  const result = await processReaction(subject);
  assert.equal(result.status, "merge_rejected");
  assert.equal(
    subject.calls.some(([name]) => name === "saveMergeReceipt"),
    false
  );
  assert.equal(
    subject.calls.some(([name]) => name === "addReaction"),
    false
  );
});

test("receipt storage failure never adds the check reaction", async () => {
  const subject = setup({ receiptError: true });
  const result = await processReaction(subject);
  assert.equal(result.status, "merged_receipt_failed");
  assert.equal(result.receiptReactionAdded, false);
  assert.equal(
    subject.calls.some(([name]) => name === "addReaction"),
    false
  );
});

test("unconfirmed durable storage never adds the check reaction", async () => {
  const subject = setup({ durable: false });
  const result = await processReaction(subject);
  assert.equal(result.status, "merged_receipt_failed");
  assert.equal(
    subject.calls.some(([name]) => name === "addReaction"),
    false
  );
});

test("Slack failure occurs only after a durable receipt exists", async () => {
  const subject = setup({ reactionError: true });
  const result = await processReaction(subject);
  assert.equal(result.status, "merged_receipted_reaction_failed");
  const receiptIndex = subject.calls.findIndex(
    ([name]) => name === "saveMergeReceipt"
  );
  const reactionIndex = subject.calls.findIndex(([name]) => name === "addReaction");
  assert.ok(receiptIndex >= 0);
  assert.ok(reactionIndex > receiptIndex);
});

import test from "node:test";
import assert from "node:assert/strict";

import {
  DecisionCode,
  evaluateApproval,
  evaluateEventEnvelope,
  isDryRunReady
} from "../src/policy.mjs";

const SHA = "a".repeat(40);

function fixture(overrides = {}) {
  const base = {
    event: {
      id: "Ev-001",
      reaction: "rocket",
      workspaceId: "T-ALLOWED",
      channelId: "C-MERGE",
      userId: "U-FOUNDER",
      messageTs: "1720000000.000100"
    },
    config: {
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
      }
    },
    binding: {
      workspaceId: "T-ALLOWED",
      channelId: "C-MERGE",
      messageTs: "1720000000.000100",
      repoOwner: "example",
      repoName: "safe-repo",
      pullNumber: 42,
      reviewedSha: SHA,
      riskLevel: "low",
      mergeEnabled: true
    },
    pullRequest: {
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
      mergeableState: "clean"
    }
  };

  return {
    event: { ...base.event, ...overrides.event },
    config: { ...base.config, ...overrides.config },
    binding:
      overrides.binding === null
        ? null
        : { ...base.binding, ...overrides.binding },
    pullRequest:
      overrides.pullRequest === null
        ? null
        : { ...base.pullRequest, ...overrides.pullRequest }
  };
}

test("allows an exact, low-risk, fully green live approval", () => {
  const result = evaluateApproval(fixture());
  assert.equal(result.verdict, "allow");
  assert.equal(result.code, DecisionCode.READY);
  assert.deepEqual(result.target, {
    repoOwner: "example",
    repoName: "safe-repo",
    pullNumber: 42,
    reviewedSha: SHA
  });
});

test("ignores reactions other than rocket", () => {
  const context = fixture({ event: { reaction: "eyes" } });
  const result = evaluateEventEnvelope(context);
  assert.equal(result.verdict, "ignore");
  assert.equal(result.code, DecisionCode.NOT_ROCKET);
});

test("denies non-allowlisted workspace, channel, and user", () => {
  const cases = [
    [{ event: { workspaceId: "T-OTHER" } }, DecisionCode.WORKSPACE_NOT_ALLOWED],
    [{ event: { channelId: "C-OTHER" } }, DecisionCode.CHANNEL_NOT_ALLOWED],
    [{ event: { userId: "U-OTHER" } }, DecisionCode.USER_NOT_ALLOWED]
  ];

  for (const [overrides, expected] of cases) {
    assert.equal(evaluateApproval(fixture(overrides)).code, expected);
  }
});

test("denies an unbound or mismatched Slack message", () => {
  assert.equal(
    evaluateApproval(fixture({ binding: null })).code,
    DecisionCode.BINDING_NOT_FOUND
  );
  assert.equal(
    evaluateApproval(fixture({ binding: { messageTs: "different" } })).code,
    DecisionCode.BINDING_SCOPE_MISMATCH
  );
});

test("fails closed when the reviewed SHA is stale", () => {
  const result = evaluateApproval(
    fixture({ pullRequest: { headSha: "b".repeat(40) } })
  );
  assert.equal(result.verdict, "deny");
  assert.equal(result.code, DecisionCode.STALE_REVIEWED_SHA);
  assert.equal(result.reviewedSha, SHA);
  assert.equal(result.liveHeadSha, "b".repeat(40));
});

test("requires an allowlisted repository and base branch", () => {
  assert.equal(
    evaluateApproval(
      fixture({ config: { allowedRepositories: ["example/other"] } })
    ).code,
    DecisionCode.REPOSITORY_NOT_ALLOWED
  );
  assert.equal(
    evaluateApproval(
      fixture({ pullRequest: { baseBranch: "release" } })
    ).code,
    DecisionCode.BASE_BRANCH_NOT_ALLOWED
  );
});

test("requires an open, non-draft pull request", () => {
  assert.equal(
    evaluateApproval(fixture({ pullRequest: { state: "closed" } })).code,
    DecisionCode.PULL_REQUEST_NOT_OPEN
  );
  assert.equal(
    evaluateApproval(fixture({ pullRequest: { isDraft: true } })).code,
    DecisionCode.PULL_REQUEST_IS_DRAFT
  );
});

test("requires loop approval and low-risk labels", () => {
  assert.equal(
    evaluateApproval(
      fixture({ pullRequest: { labels: ["risk:low"] } })
    ).code,
    DecisionCode.LOOP_APPROVAL_MISSING
  );
  assert.equal(
    evaluateApproval(
      fixture({ pullRequest: { labels: ["loop-approved"] } })
    ).code,
    DecisionCode.LOW_RISK_LABEL_MISSING
  );
});

test("requires a low-risk, individually enabled binding", () => {
  assert.equal(
    evaluateApproval(fixture({ binding: { riskLevel: "high" } })).code,
    DecisionCode.RISK_NOT_LOW
  );
  assert.equal(
    evaluateApproval(fixture({ binding: { mergeEnabled: false } })).code,
    DecisionCode.BINDING_MERGE_DISABLED
  );
});

test("requires at least one successful required check", () => {
  assert.equal(
    evaluateApproval(
      fixture({ pullRequest: { requiredChecks: [] } })
    ).code,
    DecisionCode.REQUIRED_CHECKS_MISSING
  );
  assert.equal(
    evaluateApproval(
      fixture({
        pullRequest: {
          requiredChecks: [
            { name: "test", status: "completed", conclusion: "failure" }
          ]
        }
      })
    ).code,
    DecisionCode.REQUIRED_CHECKS_NOT_SUCCESSFUL
  );
  assert.equal(
    evaluateApproval(
      fixture({
        pullRequest: {
          requiredChecks: [
            { name: "test", status: "in_progress", conclusion: null }
          ]
        }
      })
    ).code,
    DecisionCode.REQUIRED_CHECKS_NOT_SUCCESSFUL
  );
});

test("requires a successful reviewer check from the configured GitHub App", () => {
  assert.equal(
    evaluateApproval(
      fixture({ config: { trustedReviewerCheck: null } })
    ).code,
    DecisionCode.TRUSTED_REVIEWER_CHECK_NOT_CONFIGURED
  );
  assert.equal(
    evaluateApproval(
      fixture({
        pullRequest: {
          requiredChecks: [
            { name: "test", appId: 1, status: "completed", conclusion: "success" },
            {
              name: "loop-review",
              appId: 99999,
              status: "completed",
              conclusion: "success"
            }
          ]
        }
      })
    ).code,
    DecisionCode.TRUSTED_REVIEWER_CHECK_MISSING
  );
});

test("requires a clean mergeable state", () => {
  assert.equal(
    evaluateApproval(
      fixture({ pullRequest: { mergeableState: "dirty" } })
    ).code,
    DecisionCode.MERGEABLE_STATE_NOT_CLEAN
  );
});

test("requires explicit live mode and the global live flag", () => {
  assert.equal(
    evaluateApproval(fixture({ config: { mode: "dry-run" } })).code,
    DecisionCode.MODE_NOT_LIVE
  );
  assert.equal(
    evaluateApproval(
      fixture({ config: { mode: "live", liveMergeEnabled: false } })
    ).code,
    DecisionCode.LIVE_MERGE_DISABLED
  );
});

test("dry-run readiness is true only when the live switches are the final gate", () => {
  const readyContext = fixture({
    config: { mode: "dry-run", liveMergeEnabled: false }
  });
  const readyDecision = evaluateApproval(readyContext);
  assert.equal(isDryRunReady(readyDecision, readyContext), true);

  const staleContext = fixture({
    config: { mode: "dry-run", liveMergeEnabled: false },
    pullRequest: { headSha: "b".repeat(40) }
  });
  const staleDecision = evaluateApproval(staleContext);
  assert.equal(isDryRunReady(staleDecision, staleContext), false);
});

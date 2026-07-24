import test from "node:test";
import assert from "node:assert/strict";

import { createGitHubReadOnlyAdapter } from "../src/github-readonly.mjs";

function json(value) {
  return { ok: true, async json() { return value; } };
}

test("maps the protected required check and its source GitHub App", async () => {
  const calls = [];
  const adapter = createGitHubReadOnlyAdapter({
    token: "secret",
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      if (url.includes("/pulls/2")) {
        return json({
          state: "open",
          draft: false,
          mergeable_state: "clean",
          head: { sha: "a".repeat(40) },
          base: { ref: "main" },
          labels: [{ name: "loop-approved" }, { name: "risk:low" }]
        });
      }
      if (url.endsWith("/branches/main/protection")) {
        return json({
          required_status_checks: {
            checks: [{ context: "verify", app_id: 15368 }]
          }
        });
      }
      return json({
        check_runs: [{
          name: "verify",
          status: "completed",
          conclusion: "success",
          completed_at: "2026-07-24T00:00:00Z",
          app: { id: 15368 }
        }]
      });
    }
  });

  const result = await adapter.getPullRequest({
    repoOwner: "Qubitix101",
    repoName: "codex-brain",
    pullNumber: 2
  });
  assert.deepEqual(result.requiredChecks, [{
    name: "verify",
    appId: 15368,
    status: "completed",
    conclusion: "success"
  }]);
  assert.equal(calls.every((call) => call.options.method === undefined), true);
  assert.equal(adapter.mergePullRequest, undefined);
});

test("retries an unknown mergeable state no more than three reads", async () => {
  let pullReads = 0;
  const adapter = createGitHubReadOnlyAdapter({
    token: "secret",
    delay: async () => {},
    fetchImpl: async (url) => {
      if (url.includes("/pulls/2")) {
        pullReads += 1;
        return json({
          state: "open",
          draft: false,
          mergeable_state: pullReads < 3 ? "unknown" : "clean",
          head: { sha: "a".repeat(40) },
          base: { ref: "main" },
          labels: []
        });
      }
      if (url.endsWith("/branches/main/protection")) {
        return json({ required_status_checks: { checks: [] } });
      }
      return json({ check_runs: [] });
    }
  });
  const result = await adapter.getPullRequest({
    repoOwner: "Qubitix101",
    repoName: "codex-brain",
    pullNumber: 2
  });
  assert.equal(result.mergeableState, "clean");
  assert.equal(pullReads, 3);
});

import test from "node:test";
import assert from "node:assert/strict";

import { createSupabaseStore } from "../src/supabase-store.mjs";

test("uses atomic RPCs and never exposes a Phase 2 merge receipt path", async () => {
  const calls = [];
  const store = createSupabaseStore({
    url: "https://project.supabase.co",
    serviceRoleKey: "service-secret",
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      return {
        ok: true,
        status: 200,
        async json() {
          if (url.endsWith("jass_loop_find_binding")) {
            return {
              workspace_id: "T1",
              channel_id: "C1",
              message_ts: "1.2",
              repo_owner: "Qubitix101",
              repo_name: "codex-brain",
              pull_number: 2,
              reviewed_sha: "a".repeat(40),
              risk_level: "low",
              merge_enabled: true
            };
          }
          return true;
        }
      };
    }
  });

  assert.equal(await store.claimEvent({
    id: "Ev1",
    workspaceId: "T1",
    channelId: "C1",
    messageTs: "1.2",
    userId: "U1",
    reaction: "rocket"
  }), true);
  const binding = await store.findBinding({
    workspaceId: "T1",
    channelId: "C1",
    messageTs: "1.2"
  });
  assert.equal(binding.pullNumber, 2);
  assert.equal(calls[0].url.endsWith("/rpc/jass_loop_claim_event"), true);
  assert.equal(calls[0].options.body.includes("service-secret"), false);
  assert.equal(store.claimApproval, undefined);
  assert.equal(store.saveMergeReceipt, undefined);
  assert.equal(typeof store.finalizeDryRunApproval, "function");
});

# Jass Loop Slack Approval Core

This package contains the policy core and the Phase 2 hosted dry-run receiver
for a custom Slack app. It is intentionally incapable of merging a pull
request: the deployed processor has no approval-claim or merge contract, the
GitHub adapter implements reads only, and runtime configuration rejects live
mode.

It is separate from the official Codex Slack app. The official app can start and
continue Codex work from Slack; this custom app owns the narrower
human-authorization protocol:

- `🚀` (`rocket` in Slack's Events API) authorizes one merge attempt for one
  pre-bound repository, pull request, and reviewed commit SHA.
- `✅` (`white_check_mark`) is an outcome receipt. It is added only after GitHub
  reports the pull request merged and the service has durably stored the merge
  receipt.

The associated merge-ready message must follow
`../../docs/MERGE_READY_MESSAGE.md`. A green check proves merge completion,
not deployment. The system may say `live` only after a separate deployment
check proves the new commit is serving successfully.

## Fail-closed contract

An actual merge is impossible unless every gate below passes:

1. The event ID is atomically claimed. A duplicate delivery cannot cause a
   second merge.
2. The reaction is `rocket`.
3. The Slack workspace, channel, and reacting user are allowlisted.
4. The reacted-to message is bound to an exact repository, PR number, and
   reviewed SHA.
5. The repository and base branch are explicitly allowlisted.
6. The live pull request is still open, is not a draft, and its head still
   equals that reviewed SHA.
7. The PR has both `loop-approved` and `risk:low` labels.
8. At least one required check exists and every required check completed with
   `success`.
9. A required reviewer check with the configured name was produced by the
   configured GitHub App ID and succeeded. A mutable label alone is not enough.
10. GitHub reports the mergeable state as `clean`.
11. The binding is classified `low` risk and is individually merge-enabled.
12. The service is in `live` mode **and** the global live-merge flag is true.
13. The message/PR/SHA approval binding is atomically claimed. A different
    Slack event cannot race a second merge attempt for the same approval.

The exact reviewed SHA is passed to GitHub's merge call. A moved head therefore
fails before the call and should also be rejected by GitHub's SHA precondition.
Schema, authentication, billing, permissions, deployment, provisioning, or any
other sensitive lane should never be classified `low`.

## Layout

- `manifest.example.yaml` is an HTTP Events API manifest; replace its request
  URL only after deploying the signed receiver.
- `api/slack-events.mjs` verifies Slack's signature over the raw body and
  completes one bounded durable decision before acknowledging.
- `src/policy.mjs` contains deterministic, side-effect-free gates.
- `src/dry-run-engine.mjs` is the only processor imported by the hosted
  receiver; it has no merge-capable adapter method.
- `src/engine.mjs` orchestrates injected storage, GitHub, and Slack adapters.
- `src/github-readonly.mjs` reads the live PR, branch protection, required
  checks, and source GitHub App IDs. It has no merge request.
- `src/supabase-store.mjs` uses the atomic RPCs defined in `sql/`.
- `sql/001_approval_receipts.sql` defines bindings, event claims, and future
  merge receipts; `sql/002_dry_run_bridge.sql` adds RLS and the narrowly
  granted Phase 2 RPC surface.
- `test/` proves the gate and ordering contracts without network access.

## Run the proof

```sh
npm test
```

No packages are installed because the project uses only Node's standard
library.

## Adapter contract

`processReaction` accepts injected adapters; it never imports a Slack, GitHub,
or database client.

```js
const result = await processReaction({
  event,
  config: {
    mode: "dry-run", // change deliberately to "live"
    liveMergeEnabled: false,
    allowedWorkspaceIds: ["T_EXAMPLE"],
    allowedChannelIds: ["C_MERGE_READY"],
    allowedUserIds: ["U_FOUNDER"],
    allowedRepositories: ["example/safe-repo"],
    allowedBaseBranches: ["main"],
    trustedReviewerCheck: {
      name: "loop-review",
      appId: 12345
    },
    mergeMethod: "squash"
  },
  adapters: {
    store: {
      claimEvent,
      claimApproval,
      getEventOutcome,
      getApprovalOutcome,
      findBinding,
      recordDecision,
      saveMergeReceipt,
      markReceiptReaction
    },
    github: {
      getPullRequest,
      mergePullRequest
    },
    slack: {
      addReaction
    }
  }
});
```

Required semantics:

- `store.claimEvent(event)` must be an atomic insert keyed by Slack `event_id`
  and return `true` only for the winner.
- `store.claimApproval(binding)` must atomically transition that exact
  message/PR/SHA binding from `awaiting_approval` to `claimed` and return
  `true` only for the first event. Event-id idempotency alone is insufficient
  because two distinct rocket events could otherwise race.
- `store.getEventOutcome(eventId)` returns the durable decision and receipt for
  a duplicate delivery.
- `store.getApprovalOutcome(binding)` returns the winning decision and receipt
  when a different event already claimed the same message/PR/SHA approval.
- `store.findBinding(key)` returns the immutable message binding or `null`.
- `github.getPullRequest(binding)` must return a fresh live snapshot, including
  state, draft status, base branch, the live head SHA, and the checks that are
  actually required by branch protection. Each check must carry its source
  GitHub App ID. Do not trust Slack message text, a cached Linear/GitHub label
  snapshot, or a lookalike check name.
- `github.mergePullRequest` must pass `sha: binding.reviewedSha`.
- `store.saveMergeReceipt(receipt)` must commit durable state and return
  `{ durable: true }`. The engine will not add `✅` otherwise.
- `slack.addReaction` must add `white_check_mark` to the original message.

The Phase 2 receiver verifies Slack's signing secret against the **raw**
request body, rejects stale timestamps, preserves Slack's top-level `event_id`,
and finishes the durable decision before returning HTTP 200. Each network call
shares a 2.4-second request deadline. A processing or notification failure
returns HTTP 503 so Slack can retry; the event and binding RPCs cap recovery at
three attempts and never reopen a completed decision.

## Phase 2 environment contract

All secrets are encrypted hosting environment variables and must never be
written to Git, Slack, logs, or receipts.

```text
JASS_LOOP_ENABLED=true
JASS_LOOP_MODE=dry-run
JASS_LOOP_LIVE_MERGE_ENABLED=false
SLACK_SIGNING_SECRET=...
SLACK_BOT_TOKEN=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
GITHUB_READ_TOKEN=...
JASS_LOOP_ALLOWED_WORKSPACE_IDS=T0BK00B99LP
JASS_LOOP_ALLOWED_CHANNEL_IDS=C0BKE20NC0N
JASS_LOOP_ALLOWED_USER_IDS=U0BKC2VG39B
JASS_LOOP_ALLOWED_REPOSITORIES=Qubitix101/codex-brain
JASS_LOOP_ALLOWED_BASE_BRANCHES=main
JASS_LOOP_TRUSTED_CHECK_NAME=verify
JASS_LOOP_TRUSTED_CHECK_APP_ID=15368
```

`verify` / App ID `15368` proves the source of the required GitHub Actions CI
check. It does **not** prove reviewer separation. An independent exact-SHA
review receipt remains a separate activation gate until a distinct protected
reviewer check is installed.

The emergency stop is `JASS_LOOP_ENABLED=false`, followed by a deployment.

## Safe activation sequence

1. Create a Slack app from `manifest.example.yaml` in a test workspace/channel.
2. Deploy the HTTP endpoint and verify the request URL in Slack.
3. Apply both SQL migrations to an isolated Supabase project.
4. Configure encrypted variables and keep both dry-run locks in place.
5. Seed one non-sensitive binding with `merge_enabled = false`; verify all
   denial receipts.
6. Enable the binding but keep the global live flag false; verify
   `dry_run_ready`.
7. Require branch protection and an independently produced approval check.
8. After one independently checked real receipt, request a new owner decision
   before designing any merge-capable adapter.

If a merge succeeds but receipt storage or the Slack reaction fails, the engine
does not fabricate `✅`. Alert an operator and reconcile GitHub against the
claimed event. The durable event claim still prevents a second merge attempt.
Duplicate and already-claimed responses return the stored prior outcome so
callers can converge without repeating the side effect.

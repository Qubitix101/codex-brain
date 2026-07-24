# Jass Loop Slack Approval Core

This is a dependency-free policy core for a custom Slack app. It does **not**
install an app, expose an HTTP endpoint, hold credentials, deploy a worker, or
merge a real pull request. It is intentionally dry-run-first.

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

- `manifest.example.yaml` is an example Slack manifest for a Socket Mode pilot.
- `src/policy.mjs` contains deterministic, side-effect-free gates.
- `src/engine.mjs` orchestrates injected storage, GitHub, and Slack adapters.
- `sql/001_approval_receipts.sql` defines bindings, event claims, and durable
  merge receipts.
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

The transport layer is deliberately absent. A production receiver must verify
Slack's signing secret against the **raw** request body, reject stale
timestamps, preserve Slack's top-level `event_id`, acknowledge promptly, and
enqueue the event for the single durable processor.

## Safe activation sequence

1. Create a Slack app from `manifest.example.yaml` in a test workspace/channel.
2. Add signature verification or use Socket Mode with an authenticated socket.
3. Implement the SQL-backed store with atomic `INSERT ... ON CONFLICT DO
   NOTHING` event claims and an atomic binding-state transition.
4. Implement a read-only GitHub adapter and run in `dry-run` mode.
5. Seed one non-sensitive binding with `merge_enabled = false`; verify all
   denial receipts.
6. Enable the binding but keep the global live flag false; verify
   `dry_run_ready`.
7. Require branch protection and an independently produced approval check.
8. Only then enable a single low-risk pilot repository with an owner, budget,
   rollback policy, expiry, and stop condition.

If a merge succeeds but receipt storage or the Slack reaction fails, the engine
does not fabricate `✅`. Alert an operator and reconcile GitHub against the
claimed event. The durable event claim still prevents a second merge attempt.
Duplicate and already-claimed responses return the stored prior outcome so
callers can converge without repeating the side effect.

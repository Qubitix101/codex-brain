# Handoff

Updated: `2026-07-24 17:08 +04`
From: `QUB-6 Slack event activation pass`
To: `Qubitix101 repository owner or next pilot agent`

## Objective

Connect and prove the signed, event-driven Slack `🚀` dry-run bridge for the
single `Qubitix101/codex-brain` pilot without creating a merge-capable path.

## Proven complete

- Private Slack channel created:
  - Evidence: `#loop-codex-brain`, channel ID `C0BKE20NC0N`.
  - Receipt: connector result in the originating Codex task.
- Linear project created:
  - Evidence:
    `https://linear.app/qubitix/project/codex-brain-loop-pilot-791f5e5fd87b`
  - Receipt: connector result in the originating Codex task.
- GitHub baseline published:
  - Evidence: draft PR
    `https://github.com/Qubitix101/codex-brain/pull/1`; implementation SHA
    `d27a52e5da7f1641cea62eecea48c77cba19b6c7`; `verify` passed.
  - Receipt:
    `receipts/2026-07-23T23-35-16Z-loop-pilot-baseline.md`
- Main branch protected:
  - Evidence: strict current `verify`, PR requirement, linear history,
    conversation resolution, admin enforcement, no force push, no deletion.
  - Receipt:
    `receipts/2026-07-23T23-35-16Z-loop-pilot-baseline.md`
- Phase 1 baseline merged:
  - Evidence: PR #1, merge commit
    `f79f62702eab2e0489c1aa8ab56b2d6eb28ea25f`.
- Phase 2 candidate published:
  - Evidence: draft PR
    `https://github.com/Qubitix101/codex-brain/pull/2`.
  - Local proof: 40 tests, `git diff --check`, zero dependency
    vulnerabilities, and a successful Vercel platform build.
  - Safety proof: hosted import graph has no merge-capable adapter; runtime
    rejects live mode.
- Phase 2 PR merged:
  - Evidence: PR #2 squash merge commit
    `b039de113139494ba442489173012659d0c0bd5e`.
  - Post-merge proof: GitHub Actions run `30073055116`, `verify` passed.
- Isolated Supabase project provisioned:
  - Evidence: project `jass-loop-pilot` / `afximcslmhbkidmtlitr`,
    `eu-central-1`, status `ACTIVE_HEALTHY`.
  - Cost: owner-confirmed `USD 10/month`.
- Custom Slack app installed:
  - Evidence: app `Jass Loop Pilot` / `A0BKG3GDW4E` in workspace
    `T0BK00B99LP`; bot added to `#loop-codex-brain`.
  - Scopes: `chat:write` and `reactions:read`; unnecessary
    `channels:history` removed.
  - Secrets: rotated signing secret and bot token stored as encrypted
    production variables in the isolated Vercel project; values never belong
    in repository receipts.
- Vercel activation boundary configured:
  - Exact workspace/channel/user/repository/base-branch/check allowlists and
    the Supabase URL are encrypted production variables.
  - Both dry-run locks remain in place and the kill switch is
    `JASS_LOOP_ENABLED=false`.
  - Missing by design: repository-scoped GitHub read token and Supabase server
    secret.
- Activation hardening implemented locally:
  - Slack URL verification requires only the signing secret.
  - Durable tables move to non-exposed `jass_loop_private`; public RPCs use
    `security invoker` and are executable only by `service_role`.
  - Proof: 46 local tests pass and `git diff --check` passes.
- Activation hardening merged:
  - Evidence: PR #3 squash merge commit
    `4c3e5f9cc35dd3b0307002d74d7dbabf8ad89a1b`.
  - Post-merge proof: GitHub Actions run `30092198339`, `verify` passed.
- Private Supabase persistence applied:
  - Migrations: `jass_loop_private_schema` and
    `jass_loop_dry_run_bridge`.
  - Proof: three private tables, zero public Slack tables, five public
    security-invoker RPCs, and zero public execute grants.
- Read-only GitHub pilot token provisioned:
  - Name: `Jass Loop Pilot Dry Run`.
  - Scope: only `Qubitix101/codex-brain`; read-only administration,
    metadata, and pull requests.
  - Expiry: `2026-08-23`.
  - Direct reads of the PR, branch protection, and check-runs endpoints
    returned `200`.
- Signed receiver deployed:
  - Stable URL:
    `https://jass-loop-pilot.vercel.app/api/slack-events`.
  - Current production deployment:
    `dpl_8hi3JywQ1GyDfnsNT9uMYdcLn8a2`, status `Ready`.
  - The latest GET boundary returns expected `405 METHOD_NOT_ALLOWED`;
    a correctly signed synthetic Slack challenge returned `200`.
- Slack Events API wired:
  - Socket Mode is off.
  - Request URL is verified.
  - Only bot event `reaction_added` is subscribed.
  - Delayed Events is off.
- Runtime settings repaired:
  - Single-line values no longer contain hidden trailing newlines.
  - Slack signing secret, Slack bot token, and Supabase server key were
    refreshed without exposing their values.
  - `JASS_LOOP_ENABLED=false` and
    `JASS_LOOP_LIVE_MERGE_ENABLED=false`.
- Harmless mobile proof PR opened:
  - PR #4:
    `https://github.com/Qubitix101/codex-brain/pull/4`
  - Exact SHA:
    `bb2a24e22d54a4e1d39911c0384b75fba3a36d51`
  - Required CI run `30095571190` passed.
  - The PR remains open and unmerged.

## Active state

- Repository and branch: `Qubitix101/codex-brain` /
  `agent/qub-6-slack-event-activation-receipt`
- Worktree: local pilot checkout
- Linear issue and state:
  `https://linear.app/qubitix/issue/QUB-6/phase-2-connect-the-event-driven-slack-rocket-dry-run-bridge`
  — In Progress
- Pull request under proof: #4
- Current PR head SHA:
  `bb2a24e22d54a4e1d39911c0384b75fba3a36d51`
- Last reviewed SHA: owner review pending
- Required checks: `Loop validation / verify`

## Blockers and decisions needed

- Independent review: `verify` / GitHub Actions App ID `15368` proves CI
  provenance only. It is not an independent reviewer check for PR #4.
- The deployed GitHub token must still be exercised through the actual
  reaction path.
- No message binding or real mobile reaction receipt exists yet.

When blocked, state one answerable question, the available options, the
recommended option, and the affected acceptance criterion.

## Next safe pass

1. Owner reviews PR #4 at its exact SHA and explicitly approves or requests
   changes.
2. On approval, add `loop-approved`, publish the plain-English merge-ready
   message, and save its exact message/PR/SHA binding.
3. Enable only `JASS_LOOP_ENABLED=true`, redeploy, and ask the owner to react
   once from Slack mobile.
4. Prove the durable `dry_run_ready` decision, Slack reply, and still-open PR,
   then return the kill switch to `false`.

## Verification commands

```bash
npm run verify:loop
git diff --check
```

Expected result: repository check and all approval-policy tests pass with a
clean whitespace check.

## Limits

- Unverified: the deployed GitHub-token read through the receiver and the
  real mobile reaction round trip.
- Deferred: live merge and any merge-capable permission or adapter.
- Activated but stopped: one hosted dry-run receiver, private store, and
  Slack event subscription; the processing kill switch is still off.
- Scheduled or continuous work: `none unless explicitly recorded`

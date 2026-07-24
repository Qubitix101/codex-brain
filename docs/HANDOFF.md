# Handoff

Updated: `2026-07-24 10:55 +04`
From: `QUB-6 resource activation and hardening pass`
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
- Activation hardening implemented locally:
  - Slack URL verification requires only the signing secret.
  - Durable tables move to non-exposed `jass_loop_private`; public RPCs use
    `security invoker` and are executable only by `service_role`.
  - Proof: 46 local tests pass and `git diff --check` passes.

## Active state

- Repository and branch: `Qubitix101/codex-brain` /
  `agent/qub-6-activation-hardening`
- Worktree: local pilot checkout
- Linear issue and state:
  `https://linear.app/qubitix/issue/QUB-6/phase-2-connect-the-event-driven-slack-rocket-dry-run-bridge`
  — In Progress
- Pull request: activation-hardening draft PR not yet opened
- Current PR head SHA: pending commit
- Last reviewed SHA: none for this follow-up
- Required checks: `Loop validation / verify`

## Blockers and decisions needed

- GitHub runtime credential: must be read-only and repository-scoped.
- Independent review: `verify` / GitHub Actions App ID `15368` proves CI
  provenance only. It is not an independent reviewer check.
- Sensitive activation-hardening paths require a human review before merge,
  migration, and deployment.

When blocked, state one answerable question, the available options, the
recommended option, and the affected acceptance criterion.

## Next safe pass

1. Publish the activation-hardening branch as a draft PR.
2. Run protected CI and review the exact final SHA.
3. Only after approval, apply the private migration, deploy the signed
   receiver, and verify Slack's event request URL.

## Verification commands

```bash
npm run verify:loop
git diff --check
```

Expected result: repository check and all approval-policy tests pass with a
clean whitespace check.

## Limits

- Unverified: live Supabase migration/permissions/concurrency, signed Slack
  request URL, repository-scoped GitHub reads, and the real mobile reaction
  round trip.
- Deferred: live merge and any merge-capable permission or adapter.
- Authorized but not yet activated: one hosted dry-run receiver and isolated
  database under the Phase 2 contract.
- Scheduled or continuous work: `none unless explicitly recorded`

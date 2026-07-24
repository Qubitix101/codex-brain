# Handoff

Updated: `2026-07-24 06:10 +04`
From: `QUB-6 Phase 2 builder`
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

## Active state

- Repository and branch: `Qubitix101/codex-brain` /
  `agent/qub-6-slack-dry-run-bridge`
- Worktree: local pilot checkout
- Linear issue and state:
  `https://linear.app/qubitix/issue/QUB-6/phase-2-connect-the-event-driven-slack-rocket-dry-run-bridge`
  — In Progress
- Pull request: `https://github.com/Qubitix101/codex-brain/pull/2` (draft)
- Current PR head SHA: re-read after the audit-hardening push
- Last reviewed SHA:
- Required checks: `Loop validation / verify`

## Blockers and decisions needed

- Supabase isolated project: current cost is `USD 10/month`; owner confirmation
  is required before creation.
- Slack developer dashboard: owner must sign in in the already-open Codex
  browser tab.
- GitHub runtime credential: must be read-only and repository-scoped.
- Independent review: `verify` / GitHub Actions App ID `15368` proves CI
  provenance only. It is not an independent reviewer check.

When blocked, state one answerable question, the available options, the
recommended option, and the affected acceptance criterion.

## Next safe pass

1. Run:

```text
npm run verify:loop
```

2. Re-run protected PR #2 CI and review its exact final head SHA.
3. Do not activate resources until the cost, Slack sign-in, scoped GitHub
   credential, and distinct review proof are resolved.

## Verification commands

```bash
npm run verify:loop
git diff --check
```

Expected result: repository check and all approval-policy tests pass with a
clean whitespace check.

## Limits

- Unverified: live Supabase permissions/concurrency, signed Slack request URL,
  repository-scoped GitHub reads, and the real mobile reaction round trip.
- Deferred: live merge and any merge-capable permission or adapter.
- Authorized but not yet activated: one hosted dry-run receiver and isolated
  database under the Phase 2 contract.
- Scheduled or continuous work: `none unless explicitly recorded`

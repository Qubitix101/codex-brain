# Handoff

Updated: `2026-07-24 03:35 +04`
From: `Codex pilot bootstrap`
To: `Qubitix101 repository owner or next pilot agent`

## Objective

Install and prove the governed loop baseline for
`Qubitix101/codex-brain`. No Linear issue exists yet because the first issue
must be created interactively after the baseline PR is reviewable.

## Proven complete

- Private Slack channel created:
  - Evidence: `#loop-codex-brain`, channel ID `C0BKE20NC0N`.
  - Receipt: connector result in the originating Codex task.
- Linear project created:
  - Evidence:
    `https://linear.app/qubitix/project/codex-brain-loop-pilot-791f5e5fd87b`
  - Receipt: connector result in the originating Codex task.

## Active state

- Repository and branch: `Qubitix101/codex-brain` /
  `agent/loop-engineering-pilot`
- Worktree: local pilot checkout
- Linear issue and state: none; project is Backlog
- Pull request: not opened yet
- Current PR head SHA:
- Last reviewed SHA:
- Required checks: intended `Loop validation / verify`; must be confirmed from
  the first GitHub Actions run before branch protection references it.

## Blockers and decisions needed

- Custom Slack merge service transport, storage, credentials, and hosting are
  deliberately absent. The checked-in core is dry-run policy only.

When blocked, state one answerable question, the available options, the
recommended option, and the affected acceptance criterion.

## Next safe pass

1. Run:

```text
npm run verify:loop
```

2. Open a draft PR and verify the real GitHub check name.
3. Do not merge or enable live merge.

## Verification commands

```bash
npm run verify:loop
git diff --check
```

Expected result: repository check and all approval-policy tests pass with a
clean whitespace check.

## Limits

- Unverified: GitHub Actions, branch protection, Slack reaction round trip.
- Deferred: hosted receiver, durable database, recurring worker, live merge.
- External actions not authorized: merge, deploy, credential provisioning,
  live merge, or scheduling.
- Scheduled or continuous work: `none unless explicitly recorded`

---
name: loop-status
description: Use when the user asks whether the agent loop is healthy, running, blocked, scheduled, continuous, merge-ready, or safe to leave unattended. Produces a read-only evidence-backed snapshot and makes no external changes.
version: 0.1.0
---

# Loop Status

Read `references/CALIBRATION.md` when deciding whether this skill should
trigger.

Return a current, read-only operating snapshot. This is a T3 controlled
external-tooling skill because it may call read-only CLIs, APIs, or MCPs. Do
not repair, relabel, message, merge, or schedule anything.

## Checks

1. Read `STATUS.md`, goal, handoff, decisions, loop runbook, and newest
   receipts.
2. Check the current repository branch, worktree cleanliness, remotes, active
   worktrees, and last local commit.
3. Read Linear team `Qubitix` for queue counts, claimed issues,
   blockers, owners, and stale work.
4. Read GitHub for open PRs, exact head SHAs, latest Finn verdict SHAs, required
   CI, mergeability, and evidence labels.
5. Inspect scheduler or automation state only through read-only surfaces. Name
   the host/app/session dependency and next run if one exists.
6. Verify connector access separately from connector configuration.
7. Compare worker claims with receipts and an independent check. Do not call a
   state green solely because a worker says it is done.

## Output

Report, in this order:

- **Overall:** healthy, degraded, blocked, idle, or unknown.
- **Proven healthy:** concrete evidence and freshness.
- **Blocked:** issue, owner, exact human decision, and since when.
- **Queue and fleet:** ready, claimed, review, blocked; actual worker shape.
- **PR gates:** PR, head SHA, reviewed SHA, CI, conflict, risk, merge authority.
- **Execution mode:** manual, scheduled, or continuous; next run and host
  dependency.
- **Connections:** GitHub, Linear, Slack, hosting; configured versus verified.
- **Cost and limits:** budget, quotas, timebox, stop condition.
- **Next safe action:** one bounded action.

## Truth rules

- Scheduled is not continuous.
- Connected is not write-authorized.
- `loop-approved` is not merge authorization.
- Merged is not deployed.
- Stale proof is not green.
- If evidence cannot be read, report `unknown`, not a guess.

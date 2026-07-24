---
name: jass-loop-build
description: Use when asked to claim and implement exactly one safe agent-ready Linear issue, or repair review feedback on one existing Jass Loop PR. Invoke as $jass-loop-build. One pass handles one unit, verifies it, opens or updates a PR, and never merges.
version: 0.2.0
---

# Jass Loop Build

Read `references/CALIBRATION.md` when deciding whether this skill should
trigger.

One `$jass-loop-build` invocation handles one unit of work and stops. This is a T3
controlled-external-tooling skill because it updates Linear, branches, and PRs.

Adapted from
[finna/Finn-loop](https://github.com/finna/Finn-loop), Copyright (c) 2026 Alex
Finn, under the MIT License. See `../../../THIRD_PARTY_NOTICES.md`.

## Preflight

Before any write:

- Read the durable project files and confirm repository, `origin`, Linear team
  `Qubitix`, permissions, and current ownership.
- Detect the default branch with
  `gh repo view --json defaultBranchRef --jq .defaultBranchRef.name`.
- Require `git status --porcelain` to be empty. Report dirty paths and stop;
  never stash, reset, overwrite, or commit unrelated work.
- Ensure only one builder is operating on `Qubitix`.

## One bounded pass

1. **Repair first.** List open PRs labeled `loop-changes-requested`; exclude
   `needs-human-review`. Pick the least recently updated one, read its linked
   issue and latest exact-SHA verdict, fix only must-fix items, verify, push,
   update labels and the receipt, then stop.
2. **Pick.** If no repair is eligible, query Linear team `Qubitix` for
   issues that are `agent-ready`, unassigned, not `blocked`, and have no
   unresolved blocker relation. Choose by priority then oldest. Empty queue
   means report and stop.
3. **Claim.** Assign yourself and move it to the started state. Immediately
   re-fetch it. If ownership, readiness, or blocker state changed, do not work
   it. The assignee is cooperative, not atomic.
4. **Read.** Fetch the complete issue, comments, and relations. Compare every
   `AC-N` with every `NG-N`. Ambiguity or a scope conflict goes to Blocked.
5. **Build.** Fetch the default branch and create or resume
   `TEAM-NNN-short-slug` using the real issue identifier. Implement only the
   acceptance criteria and add proportionate tests.
6. **Verify.** Run the relevant lint, typecheck, build, targeted tests, and
   real-interface check. Review diff and status. Record direct proof and an
   independent check where practical in a timestamped receipt.
7. **Ship.** Push and open or update one PR. Its body uses plain language and
   includes:
   - a one-paragraph “What this means for you” explanation understandable
     without technical knowledge;
   - what changed and why;
   - `Closes TEAM-NNN`;
   - one evidence line per `AC-N`;
   - one preservation line per `NG-N`;
   - `Other behavior changes: None`;
   - numbered manual steps and actual automated results;
   - the real preview URL when a deployment exists, or the exact sentence
     `No app preview for this PR` when it does not;
   - risk level: Low, Medium, or High.
8. Comment the PR URL on Linear and move the issue to review when that state
   exists. Update `STATUS.md` and `docs/HANDOFF.md`, then stop.

## Blocked

Comment one answerable question with options and the affected acceptance
criterion, apply `blocked`, unassign, preserve `agent-ready`, update the
handoff, and stop. Do not retry a human decision.

## Hard limits

- Never merge, enable auto-merge, deploy, or publish.
- Never schedule or recur this skill without an explicitly approved owner,
  scope, schedule, budget, failure policy, and stop condition.
- Never work a blocked, ambiguously scoped, or externally owned issue.

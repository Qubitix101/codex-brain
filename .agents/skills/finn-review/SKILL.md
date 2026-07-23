---
name: finn-review
description: Use when asked to independently review exactly one open Finn-loop PR against its linked Linear contract, required GitHub checks, mergeability, and exact head SHA. Invoke as $finn-review. Posts evidence labels and comments but never pushes or merges.
version: 0.1.0
---

# Finn Review for Codex

Read `references/CALIBRATION.md` when deciding whether this skill should
trigger.

One `$finn-review` invocation reviews one PR and stops. Use a separate context
from the builder when practical. This is a T3 controlled-external-tooling skill
because it may comment and change labels on GitHub.

Adapted from
[finna/Finn-loop](https://github.com/finna/Finn-loop), Copyright (c) 2026 Alex
Finn, under the MIT License. See `../../../THIRD_PARTY_NOTICES.md`.

## One bounded pass

1. List open, non-draft PRs with number, labels, current `headRefOid`, update
   time, and URL.
2. Find the latest comment whose first line is
   `Finn-loop review of COMMIT_SHA`. Skip a PR only when that SHA equals the
   current head and it already has a terminal loop label. New commits always
   require a new review.
3. Pick one eligible PR. Parse `Closes TEAM-NNN`, fetch the complete issue from
   Linear team `Qubitix`, and treat a missing valid issue as must-fix.
4. Read the full diff and changed files in context. Review against its `AC-N`
   and `NG-N` contract, defects, security, data flow, user states, scope, and
   maintainability. Prefix must-fix findings with `[AC-N]`, `[DEFECT]`,
   `[SECURITY]`, or `[CI]`. A required fix that violates `NG-N` is
   `[SCOPE-CONFLICT AC-N ↔ NG-N]`.
5. Inspect current evidence:

```bash
gh pr view NUMBER --json headRefOid,mergeable,mergeStateStatus
gh pr checks NUMBER --required --json bucket,name,state,link
```

6. Pending or unknown evidence means report waiting and stop without a verdict
   or label change. Failed required checks are `[CI]`. A merge conflict is
   `[DEFECT]`. No required CI means human escalation, never approval.
7. Re-fetch `headRefOid` immediately before posting. If it changed, discard the
   review and stop with a stale-review report.
8. Post one verdict:

```md
Finn-loop review of COMMIT_SHA

CI: required checks passed | failed | not configured
Mergeability: clean | conflicting

## Review

Summary: one or two sentences.

## 1. Must fix before merge

None.

## 2. Should fix soon

None.

## 3. Safe to merge

Yes — evidence is complete. A human still makes the merge decision.
```

9. Set exactly one evidence state:
   - clean, passing, no escalation -> `loop-approved`;
   - must-fix -> `loop-changes-requested`;
   - scope conflict, sensitive risk, or missing CI -> `needs-human-review`.
10. Record the reviewed SHA, checks, result, and links in a receipt; update
    status and handoff; stop.

## Hard limits

- Never merge, enable auto-merge, push commits, or deploy.
- `loop-approved` is evidence for a human, not merge authorization.
- Preserve an existing `needs-human-review` gate until a human resolves it.
- Never create a scheduled or recurring reviewer without explicit owner,
  scope, schedule, budget, failure policy, and stop condition.

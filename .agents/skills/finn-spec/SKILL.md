---
name: finn-spec
description: Use when the user asks to turn a raw feature idea into a build-ready Linear issue through an interactive codebase-grounded interview. Invoke as $finn-spec. Requires the user present and never runs unattended or applies agent-ready.
version: 0.1.0
---

# Finn Spec for Codex

Read `references/CALIBRATION.md` when deciding whether this skill should
trigger.

Turn one raw idea into a Linear issue complete enough that two engineers would
ship the same observable behavior. This is a T3 controlled-external-tooling
skill because filing the confirmed issue writes to Linear.

Adapted from
[finna/Finn-loop](https://github.com/finna/Finn-loop), Copyright (c) 2026 Alex
Finn, under the MIT License. See `../../../THIRD_PARTY_NOTICES.md`.

## Preconditions

- The intended repository and Linear team `Qubitix` are confirmed.
- The user is present for product decisions and final approval.
- The Linear connector is read-verified before drafting and write-verified only
  after approval.

## One bounded pass

1. Read the repository instructions, goal, intake, status, handoff, relevant
   code, and existing patterns before asking questions.
2. Ask one to four genuine product questions per round. Put concrete options
   and a recommendation first. Do not ask what the codebase can answer.
3. Continue until this test passes: two independent engineers would implement
   the same observable behavior.
4. Draft an issue of one agent-day or less:

```md
## Problem

One or two sentences.

## Acceptance Criteria

- [ ] AC-1 — Observable, testable outcome

## Non-goals

- NG-1 — Behavior that must not change

## Relevant files

- path — why it matters

## Test expectations

- Required automated and manual evidence

## How to verify

1. Exact reproducible step and expected result
```

5. Resolve every conflict between an `AC-N` and `NG-N`. Split oversized work
   into a blocker-ordered graph whose first issue is independently useful.
6. Show the complete draft and receive explicit user approval.
7. Only then create the issue on Linear team `Qubitix`. Report the
   identifier and URL returned by Linear and update the local handoff.
8. Stop. One invocation produces at most one issue or one explicitly approved
   issue graph.

## Hard limits

- Never apply `agent-ready`; the human applies it after a final Linear review.
- Never create a schedule or recurring job.
- Never guess a product decision or silently expand scope.
- If Linear write access is unavailable, return the complete draft and exact
  blocker without claiming it was filed.

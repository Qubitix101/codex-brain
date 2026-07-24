# Trigger Calibration

## Trigger examples

1. “Set up a professional agent workflow for this new repository from day
   one, including goals, loops, verification, and handoffs.”
2. “Turn this existing project into a governed Linear -> build -> review
   system.”
3. “Should this project use one goal, a repeated loop, subagents, or a
   persistent workspace? Design the operating model.”
4. “Create reusable project-start rules so future Codex sessions know how to
   plan, build, prove, and stop.”
5. “We want bounded background agents with an independent reviewer and mobile
   approvals; map the safe architecture before enabling anything.”
6. “Audit our current agent process and propose the smallest proof-first work
   graph with budgets and authority gates.”

Expected: trigger `$jass-loop-start`, perform read-only discovery,
and return a governed architecture plus first vertical slice.

## Non-trigger examples

1. “Fix the failing date-format test in this issue.”
2. “What is the current status of PR 42?”
3. “Review this single function for an off-by-one error.”
4. “Summarize this README.”
5. “Send this already approved message to Slack.”
6. “Run the existing test suite and tell me what failed.”

Expected: do not trigger. Use the direct task, `$jass-loop-status`, the project’s
review skill, or the relevant integration skill.

## Boundary cases

- “Create a skill for release notes” triggers a skill-design process, not this
  bootstrap, unless the user also wants the entire project operating model.
- “Keep working until tests pass” is a bounded verification loop inside the
  current task, not authorization for a recurring scheduler.
- “Make this run 24/7” triggers bootstrap architecture, but installation pauses
  until owner, scope, schedule, budget, failure policy, and stop condition are
  explicit.

## Quality checks

- The goal has observable exit conditions.
- Every agent role owns a distinct mutable surface or has a clear handoff.
- Each invocation can stop after one unit with a receipt.
- Green requires direct proof plus an independent check where practical.
- Scheduling and external writes remain behind explicit authority gates.

---
name: loop-engineering-bootstrap
description: Use when starting a new software project, converting an existing repository into a governed agent workflow, or deciding whether work needs a goal, bounded loop, multi-agent workflow, reusable skill, or persistent workspace. Do not use for an ordinary one-off implementation or status question.
version: 0.1.0
---

# Loop Engineering Bootstrap

Design the smallest governed operating system that can take a project from
intake to independently proven outcomes. This is a T1 instruction-only skill;
it may draft local project files under normal user authority but must not create
external queues, schedules, automations, or credentials by itself.

Read `references/CALIBRATION.md` when judging whether this skill should trigger.

## Inputs

- repository and intended product outcome;
- owner and user group;
- Linear team `Qubitix`;
- available GitHub, Linear, Slack, hosting, and test surfaces;
- risk boundaries, cost ceiling, and human authority gates.

If the outcome, repository, or owner is unknown, stop after a read-only
reconnaissance and request that missing decision.

## Workflow

1. Read `AGENTS.md`, status, goal, intake, handoff, decisions, runbooks, and
   existing verification instructions.
2. Inspect the repository, current branch, worktree state, test commands,
   deploy boundary, integrations, and any existing scheduler. Do not mutate
   external state during discovery.
3. Choose the control primitive:
   - measurable end condition -> goal;
   - one improvable feedback cycle -> bounded loop;
   - independent dependent units -> workflow or work graph;
   - proven repeated procedure -> skill;
   - persistent scripts, fixtures, outputs, and history -> workspace/harness.
4. Define the operating contract:
   - outcome and exit tests;
   - work-source and state machine;
   - one-pass boundary and concurrency limit;
   - builder/reviewer separation;
   - verification and receipt format;
   - memory and handoff files;
   - permissions, human gates, cost ceiling, failure policy, and stop rules.
5. Decompose only the first useful vertical slice. Prefer the cheapest real
   proof that removes the most uncertainty.
6. Draft updates to `docs/INTAKE.md`, `docs/GOAL.md`, `STATUS.md`,
   `runbooks/LOOPS.md`, and `docs/HANDOFF.md`. Preserve existing project rules.
7. Validate that a future agent can identify inputs, one unit of work, exact
   proof, stop conditions, and authority limits without chat history.
8. Present the proposed work graph and obtain user approval before creating
   Linear issues, scheduled tasks, recurring jobs, or other external state.

## Required output

- operating thesis and measurable goal;
- chosen loop, goal, workflow, skill, and workspace roles;
- agent roster with one writer per mutable surface;
- first vertical slice and independent verification plan;
- permission and human-approval matrix;
- scheduler proposal, if requested, with owner, scope, schedule, budget,
  failure policy, and stop condition;
- P0 blockers, deferred ideas, and the next bounded pass.

## Hard stops

- Do not label work `agent-ready`.
- Do not install a recurring or unattended job without explicit approval of all
  six scheduling fields.
- Do not claim 24/7 operation from a local session or an unverified connector.
- Do not weaken existing security, branch, review, or deployment policies.

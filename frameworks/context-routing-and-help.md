# Context Routing and Help Framework

Codex Brain must be able to answer one question at any point:

What is the next allowed action?

The answer must come from state, gates, artifacts, and mode. It must not come from vague memory.

## Purpose

This framework brings BMAD-style help routing into Codex Brain.

It exists because users should not need to remember:

- which phase is active
- which artifact is missing
- whether Design DNA blocks frontend work
- whether Full mode requires a deeper research category
- whether the next action is validation, research, planning, decomposition, execution, review, ship, or learning

## Routing Inputs

Codex should inspect:

- `.codex-brain/state.json`
- `.codex-brain/classification.json`
- `.codex-brain/memory/active-context.md`
- `.codex-brain/memory/progress.md`
- `catalogs/workflow-manifest.json`
- `catalogs/full-mode-coverage-catalog.json` for Full mode
- required artifacts listed in the current gate
- project `CODEX.md`, `CLAUDE.md`, or equivalent implementation instructions

## Routing Output

Every help response should include:

- current mode
- current phase
- current gate status
- missing required artifacts
- next recommended workflow
- allowed actions
- blocked actions
- reason for the recommendation
- whether user approval is needed

## Next Action Algorithm

1. Load project state.
2. If state is missing, recommend bootstrap.
3. If classification is pending, recommend classification.
4. If Standard or Full mode is recommended but not approved, ask for approval.
5. Find the active phase.
6. Find the matching gate.
7. Check required artifacts against the file system.
8. If artifacts are missing, recommend the workflow that creates the first missing artifact.
9. If artifacts exist but gate is not approved, recommend review/approval.
10. If gate is complete, recommend the next phase.
11. If Design DNA is required and frontend is blocked, refuse frontend implementation.
12. If Full mode is active, verify the Full-mode coverage catalog before execution and review.

## Allowed and Blocked Actions

Codex should state blocked actions clearly.

Examples:

- Frontend implementation is blocked until Design DNA is approved.
- Database migrations are blocked until data model and database ADR exist.
- AI-core implementation is blocked until eval and fallback plans exist.
- Multi-tenant implementation is blocked until tenant isolation and authorization model exist.
- Shipping is blocked until monitoring, smoke tests, rollback, and launch approval exist.

## Help Router Behaviors

### User asks "what next?"

Run the next-action protocol and return one recommended next step.

### User asks to build before gates are done

State the blocking gate and produce the missing artifact instead.

### User asks for maximum quality

Escalate to Full unless already Full.

### User asks for speed

Prefer Light or Quick Flow only when risk permits. Do not downgrade regulated, multi-tenant, paid, AI-core, or enterprise work silently.

### User asks for frontend work

Check Design DNA first.

### User asks for an existing project

Create project context before planning changes.

## Workflow Manifest

`catalogs/workflow-manifest.json` is the machine-readable routing map.

It defines:

- workflow id
- mode applicability
- phase
- purpose
- required inputs
- produced artifacts
- blocking conditions
- next workflows

Future Codex sessions should prefer the manifest for routing and the framework files for reasoning.

## Session Brief

At the start of a meaningful session, Codex should summarize:

- active project
- mode and phase
- gate status
- current task
- incomplete PRDs or plans
- recent lessons
- next allowed action

Use `scripts/session-brief.mjs` when available.

## Anti-Patterns

- Giving the user a menu of every possible workflow.
- Proceeding with code because the user sounds confident while gates are incomplete.
- Treating memory files as authoritative when JSON state disagrees.
- Treating Full-mode gates as optional after the user asked for top-tier quality.
- Asking the user to choose a workflow when the state makes the next step obvious.


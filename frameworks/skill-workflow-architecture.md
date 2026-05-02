# Skill Workflow Architecture Framework

Codex Brain should be usable as a methodology repo and as an executable workflow system.

This framework defines how future Codex-native skills or workflow steps should be structured.

## Purpose

Large methodology files are useful for depth. They are not always the best execution surface.

Executable workflow steps should be:

- small
- ordered
- state-aware
- artifact-producing
- gate-aware
- easy for future Codex sessions to follow

## Workflow Unit

Each workflow should define:

- id
- purpose
- applicable modes
- phase
- inputs
- outputs
- blockers
- steps
- state updates
- next workflows

This is recorded in `catalogs/workflow-manifest.json`.

## Step File Pattern

Each step should answer:

- what to read
- what to decide
- what to write
- when to stop for user approval
- what gate/state fields to update

Step files should avoid loading future steps until needed.

## State Discipline

Every workflow should update at least one of:

- `.codex-brain/state.json`
- `.codex-brain/project-context.md`
- `.codex-brain/memory/active-context.md`
- `.codex-brain/memory/progress.md`
- relevant artifact status

## Human Approval Points

Require user approval for:

- mode selection for Standard or Full
- validation go/no-go
- Design DNA
- major architecture/database choices
- mode downgrade
- launch

## Workflow Health

A workflow is healthy when:

- it has a manifest entry
- it produces named artifacts
- it has blocked actions
- it can be routed by `scripts/next-action.mjs`
- it does not require reading the entire repo to start

## Anti-Patterns

- A workflow that only says "think deeply."
- A workflow that has no output artifact.
- A workflow that cannot be resumed.
- A workflow that bypasses state.
- A workflow that makes Full-mode requirements invisible.


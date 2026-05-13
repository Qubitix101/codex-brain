# Lifecycle Framework

Codex Brain uses an adaptive product lifecycle. The point is not bureaucracy. The point is to prevent predictable failure.

## The Lifecycle

```text
Classify -> Validate -> Research -> Capability and Access -> Plan -> Design DNA -> Decompose -> Execute -> Review -> Ship -> Learn
```

Each phase has:

- requires
- produces
- validation
- forbidden actions
- escalation conditions

## Phase 0 - Classify

Determine the project rigor mode: Light, Standard, or Full.

The classification decides the minimum artifacts required before execution.

### Produces

- `.codex-brain/classification.json`
- approved mode
- reason list

### Exit Gate

- mode is approved by the user for Standard or Full
- Light may be auto-selected only for clearly low-risk work

## Phase 1 - Validate

Answer: should this be built?

### Light

- problem statement
- target user
- expected outcome
- success criteria

### Standard

- problem statement
- target users
- alternatives
- value proposition
- risk scan
- commercial or operational rationale

### Full

- all Standard requirements
- market sizing hypothesis
- moat hypothesis
- pre-mortem
- willingness-to-pay or economic justification
- competitive wedge

## Phase 2 - Research

Answer: what must be true for this to work?

Research should not become an endless archive. It should produce decisions, risks, and requirements.

See `frameworks/research.md`.

## Phase 2.5 - Capability and Access

Answer: what external powers, access paths, credentials, and tool surfaces are required before planning and execution?

Codex should map the difference between:

- product runtime integrations
- Codex/agent implementation tools
- setup/testing tools
- mocks and live verification

See `frameworks/capability-access-readiness.md` and `frameworks/tool-surface-routing.md`.

## Phase 3 - Plan

Create the Build Plan: the source of truth for product, architecture, data, security, privacy, integrations, design constraints, delivery, and verification.

See `frameworks/build-plan.md`.

## Phase 3.5 - Design DNA

For user-facing UI, capture aesthetic direction before frontend implementation.

See `frameworks/design-dna.md`.

## Phase 4 - Decompose

Break the Build Plan into PRDs and atomic tasks.

See `frameworks/decomposition.md`.

## Phase 5 - Execute

Implement one task at a time.

See `frameworks/execution-loop.md`.

## Phase 6 - Review

Review product correctness, implementation quality, security, privacy, accessibility, performance, and architecture.

See `frameworks/review-and-ship.md`.

## Phase 7 - Ship

Deploy with monitoring, rollback, smoke tests, and launch approval.

## Phase 8 - Learn

Capture structured lessons and decide which should be promoted back into Codex Brain.

See `frameworks/learning-loop.md`.

## The Critical Rule

If the current phase gate is not satisfied, Codex must not skip ahead. It should produce the missing artifact.

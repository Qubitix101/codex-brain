---
name: vertical-slice-prd-decomposer
description: Use when converting a build plan into executable PRDs, demoable vertical slices, acceptance criteria, verification commands, risks, and traceable implementation tasks.
version: 0.1.0
---

# Vertical Slice PRD Decomposer

Turn strategy and Build Plans into executable vertical slices. Prefer user-visible, operator-visible, or test-visible outcomes over layer-by-layer task piles.

## When to Use

- A Build Plan needs PRDs, implementation slices, acceptance criteria, and verification.
- A feature spans data, backend, API, UI, integrations, tests, or agent loops.
- The user asks for executable planning, PRDs, tasks, or a delivery sequence.
- An AI-core feature must include input, retrieval or memory, tool route, output, eval, trace, and approval boundary.

## Do Not Use

- The task is a single file edit or small fix.
- The project has no meaningful implementation plan yet.
- The user asks only for brainstorming, not execution planning.

## Slice Definition

A vertical slice is a thin path through every needed layer:

```text
data/schema -> service/domain logic -> API/command -> UI or integration -> tests -> verification
```

For agentic products:

```text
input/context -> skill/tool/model route -> output/proposal -> eval/trace -> approval or learning update
```

## Core Workflow

1. **Identify outcomes.** Name what a user, operator, or test can observe at the end of each slice.
2. **Split by behavior, not layer.** Avoid separate "database work", "backend work", and "frontend work" slices unless infrastructure setup is itself the slice.
3. **Define layers touched.** Include data, domain, API, UI, integration, tests, observability, documentation, and migration impacts.
4. **Add acceptance criteria.** Each criterion must be objectively verifiable.
5. **Add verification commands.** Every checkbox should name a test, command, UI state, API response, file, log, or documented artifact.
6. **Attach risks.** Include security, privacy, data, performance, accessibility, reliability, vendor, and agentic risks.
7. **Map traceability.** Link slice to Build Plan section, PRD requirement, test strategy, and any intelligence architecture decision.

## Slice Size Rules

- Prefer 2 to 5 slices per PRD.
- Prefer 3 to 8 tasks per slice.
- Split when more than 10 files are likely to change.
- Split when acceptance criteria cannot be verified in one pass.
- Split when multiple agents or teams would touch overlapping files.

## Output Contract

Return:

- PRD title
- scope and non-scope
- assumptions
- slices
- tasks per slice
- acceptance criteria
- verification commands
- data/API/UI/contracts
- agentic architecture notes, if relevant
- risk register
- rollout notes
- open questions

## Done-When Rules

Bad:

```markdown
- [ ] Improve security
```

Good:

```markdown
- [ ] Add tenant isolation test for project reads. Verify: `npm test -- tenant-isolation`
```

Do not mark a slice complete because code exists. Mark it complete when behavior is verified.

## Examples

### Example: Workspace Creation

```text
Slice: User can create a workspace and see it listed.
Layers: schema, server action, page state, tests, UI verification.
Verify: migration applied, unit test passes, browser shows created workspace.
```

### Example: Memory-Backed Content Draft

```text
Slice: User can generate one LinkedIn draft from approved voice memory.
Agentic path: memory read -> prompt route -> draft -> voice-match eval -> approval queue.
Verify: trace shows memory source, draft appears, publish remains blocked.
```

## Trust Level

T1 - Instructions only. This skill creates plans and does not modify project files by itself.

# Context Distillation Framework

Codex Brain can contain deep methodology, but future sessions need a compact way to load the right context.

Context distillation converts large artifacts into dense, low-loss context packs for downstream Codex work.

## Purpose

Large research files, Build Plans, PRDs, Design DNA, ADRs, and postmortems can exceed useful session context.

Distillation prevents:

- losing key decisions
- re-reading huge files every session
- forgetting constraints during execution
- mixing outdated assumptions with current decisions

## Distillation Is Not Summarization

Summaries are allowed to be lossy.

Distillates should preserve:

- decisions
- constraints
- rejected alternatives
- risks
- open questions
- owner/date when available
- traceability links
- exact terms that matter for implementation

## When To Distill

Distill when:

- a source document is longer than about 500 lines
- Full-mode research spans many categories
- a Build Plan becomes the source of truth
- multiple PRDs are being implemented over several sessions
- a future agent needs context without loading the whole repo
- a project reaches review or ship phase

## Distillate Types

### Project Distillate

Location: `.codex-brain/distillates/project-distillate.md`

Contains:

- product promise
- user and buyer
- mode and reason
- architecture decisions
- data model decisions
- security/privacy constraints
- Design DNA summary
- current phase and blockers

### Research Distillate

Location: `.codex-brain/distillates/research-distillate.md`

Contains:

- evidence by category
- key decisions
- assumptions
- not-applicable justifications
- P0/P1 risks
- sources

### Build Plan Distillate

Location: `.codex-brain/distillates/build-plan-distillate.md`

Contains:

- system boundaries
- major ADRs
- implementation sequence
- database scale model
- security/GDPR model
- test strategy
- observability/ship model

### Execution Distillate

Location: `.codex-brain/distillates/execution-distillate.md`

Contains:

- active PRD
- current vertical slice
- completed slices
- failed checks
- known traps
- next allowed task

## Distillation Format

Use:

- terse bullets
- stable headings
- source links
- no decorative prose
- no unsupported inference
- explicit uncertainty markers

Every bullet should be self-contained enough for a future Codex session.

## Validation

For high-stakes Full-mode work, perform a reverse check:

1. Read the distillate only.
2. Ask whether a future Codex session could reconstruct the important decisions.
3. Compare against source artifacts.
4. Add missing decisions, risks, constraints, or rejected alternatives.

## Anti-Patterns

- Creating a motivational summary.
- Dropping rejected alternatives.
- Dropping GDPR/security/database assumptions because they feel boring.
- Mixing old and new decisions without dates.
- Using a distillate as the source of truth when the underlying artifact changed.


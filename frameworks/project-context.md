# Project Context Framework

Project context is the implementation constitution for a specific product.

It captures the rules future Codex sessions must follow so every task uses the same product, architecture, design, testing, security, and deployment assumptions.

## Purpose

Without project context, AI sessions drift.

They may:

- use generic patterns instead of project conventions
- choose a different architecture from the Build Plan
- ignore Design DNA
- repeat solved research questions
- miss security or GDPR constraints
- implement tests in the wrong style

Project context prevents this.

## Location

Primary:

- `.codex-brain/project-context.md`

Supporting memory:

- `.codex-brain/memory/project-brief.md`
- `.codex-brain/memory/product-context.md`
- `.codex-brain/memory/system-patterns.md`
- `.codex-brain/memory/tech-context.md`
- `.codex-brain/memory/active-context.md`
- `.codex-brain/memory/progress.md`

## Required Sections

Project context should include:

- project identity
- product promise
- target users and buyers
- current rigor mode and reason
- stack and versions
- architecture rules
- database and data ownership rules
- auth and authorization rules
- security/privacy/GDPR rules
- Design DNA constraints
- testing rules
- deployment and observability rules
- forbidden patterns
- current phase and next allowed action

## Update Triggers

Update project context when:

- mode changes
- architecture decisions change
- database or auth model changes
- Design DNA is approved
- a major PRD is completed
- a new convention is established
- a recurring mistake becomes a rule
- the project moves to review or ship

## Authority

If project context conflicts with:

- current code: inspect and reconcile
- Build Plan: Build Plan wins until updated
- Design DNA: Design DNA wins for UI
- JSON state: JSON state wins for phase/gate status
- user instruction: user instruction can override, but risks must be stated

## Anti-Patterns

- Writing generic best practices.
- Duplicating the entire Build Plan.
- Leaving old decisions unmarked after they change.
- Hiding important security/privacy rules only in memory.
- Letting project context drift away from state and current code.


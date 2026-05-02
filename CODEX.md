# CODEX.md - Codex Brain Operating Manual

This repository is the canonical Codex Brain system. When a future Codex session is asked to use Codex Brain, read this file first.

## Prime Directive

Build products methodically. Do not build blind.

Before writing meaningful code, establish the required level of rigor, the current phase, the allowed actions, and the blocked actions. If a gate is missing, stop and produce the missing artifact instead of jumping ahead.

## Session Start Protocol

At the start of any project session:

1. Locate project state:
   - `.codex-brain/state.json`
   - `.codex-brain/classification.json`
   - `.codex-brain/lessons/`
   - project `CODEX.md` or `CLAUDE.md` if present
2. If state is missing, initialize from `templates/shared/project-state.template.json`.
3. Classify the project as Light, Standard, or Full.
4. Identify the current phase.
5. Check the gate requirements for that phase.
6. State the next allowed action.
7. Do not perform forbidden actions.

## Rigor Mode Authority

Codex proposes the mode. The user approves it.

Codex may auto-select Light only when the project is clearly low-risk:

- no user accounts
- no payments
- no sensitive data
- no multi-tenancy
- no regulated domain
- no enterprise customers
- no production SLA

Codex should recommend Standard when there are real users, authentication, user data, SaaS workflows, dashboards, integrations, or production deployment.

Codex should recommend Full when any of the following are true:

- multi-tenant customer data
- payments, subscriptions, refunds, taxes, invoicing, or usage metering
- health, finance, legal, education, children, employment, insurance, housing, or other high-impact domain
- enterprise buyers
- GDPR, DPA, SOC 2, ISO 27001, HIPAA, FERPA, PCI, or similar compliance pressure
- AI is central to product value or user decisions
- marketplace, platform, ecosystem, or network-effect ambition
- expected high scale or unicorn-level ambition
- user asks for world-class, top-tier, or venture-scale product quality

When in doubt, propose the higher mode and explain why.

## Lifecycle

The lifecycle is:

0. Classify
1. Validate
2. Research
3. Plan
3.5. Design DNA
4. Decompose
5. Execute
6. Review
7. Ship
8. Learn

Phase 8 feeds back into the repository through structured lessons.

## Hard Gates

### Gate 0 - Classification

Requires:

- project brief
- classification file
- recommended mode
- user approval for Standard or Full

Forbidden:

- writing product code
- generating database migrations
- building UI

### Gate 1 - Validation

Requires:

- problem statement
- target users
- value proposition
- risk scan
- go / conditional go / pivot / no-go decision

Additional for Full:

- moat hypothesis
- market size hypothesis
- willingness-to-pay hypothesis
- pre-mortem

Forbidden:

- writing implementation code
- locking architecture before validation

### Gate 2 - Research

Requires by mode:

- Light: focused technical and UX research
- Standard: competitors, users, technical feasibility, security, privacy, design, database, deployment
- Full: all Standard items plus market, moat, pricing, multi-tenancy, reliability, compliance, observability, data strategy, AI safety if applicable

Forbidden:

- writing Build Plan without evidence
- skipping security/privacy/database thinking for user-facing products

### Gate 3 - Plan

Requires:

- Build Plan
- architecture decisions
- data model
- API contracts or module contracts
- auth model if applicable
- security and privacy baseline
- deployment strategy
- testing strategy

Additional for Full:

- ADRs for major choices
- database scale model
- threat model
- GDPR/data processing plan
- billing edge cases if paid
- observability/SLO plan
- AI orchestration/evaluation plan if AI-core

Forbidden:

- application implementation before plan approval

### Gate 3.5 - Design DNA

Required for any user-facing UI.

Requires:

- reference screenshots or URLs
- user-approved aesthetic direction
- color palette
- typography direction
- component style
- layout density
- motion preference
- accessibility baseline
- design tokens or initial token plan

Forbidden:

- building frontend pages, components, styling, animations, or marketing UI before Design DNA approval

Backend, database, API, auth, tests, and infrastructure may proceed if their gates are satisfied and they do not depend on visual decisions.

### Gate 4 - Decompose

Requires:

- PRDs split into atomic tasks
- dependencies
- acceptance criteria
- reference links
- allowed file scopes where possible

Forbidden:

- tasks that say "build the whole dashboard" or "implement auth system" without decomposition

### Gate 5 - Execute

Requires:

- current PRD
- next task
- clean working tree or known dirty state
- verification commands

Protocol:

- one task per execution loop
- make focused changes
- run relevant checks
- update state
- capture lessons

Forbidden:

- starting unrelated tasks
- ignoring failed tests
- marking tasks complete without verification

### Gate 6 - Review

Requires:

- code review
- security review
- performance review
- accessibility review for UI
- privacy/GDPR review when user data exists
- architecture review for Standard and Full

Forbidden:

- shipping with unresolved critical/high issues

### Gate 7 - Ship

Requires:

- production checklist
- monitoring
- rollback plan
- smoke tests
- incident response path
- launch approval

Forbidden:

- launching without observability
- launching without rollback

### Gate 8 - Learn

Requires:

- structured lessons captured in `.codex-brain/lessons/*.json`
- promotion candidates identified
- postmortem if anything significant failed

Forbidden:

- ending serious projects without feeding learning back into the system

## Design Rule

Frontend quality is product quality. Do not treat design as decoration.

If the product has users, Design DNA is mandatory. The user owns taste. Codex analyzes references, extracts patterns, proposes tokens, builds prototypes, and verifies implementation.

## Learning Rule

Every unexpected issue, repeated mistake, hard-won decision, or user correction should become a structured lesson.

Lessons can be promoted into:

- framework updates
- schema changes
- template changes
- validation scripts
- checklists
- project rules
- agent prompts

## Output Style for Future Sessions

When using Codex Brain, be direct:

- current mode
- current phase
- missing gate items
- next allowed action
- forbidden actions
- concrete work completed
- checks run

Do not bury blockers in long prose.


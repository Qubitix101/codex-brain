# CODEX.md - Codex Brain Operating Manual

This repository is the canonical Codex Brain system. When a future Codex session is asked to use Codex Brain, read this file first.

## User Trigger Protocol

When the user says "Use Codex Brain", "Follow Codex Brain", "Start with Codex Brain", "Use the brain system", or similar:

1. Treat this repository as the canonical methodology.
2. If the current project is not bootstrapped, bootstrap it with `scripts/bootstrap-project.mjs`.
3. Ensure the target project has a local `CODEX.md` generated from `templates/shared/project-codex.template.md`.
4. Read the local `.codex-brain/` state and project context.
5. Determine and state the next allowed action before building.
6. For AI-core or automation-heavy projects, audit the agentic opportunity and intelligence-system shape before intelligence architecture, agent-engineering, and capability/access planning.
7. For AI-core, retrieval-heavy, extraction-heavy, memory-backed, workflow-heavy, or automation-heavy projects, select the intelligence architecture before Agent Engineering.
8. For agentic, skill-driven, retrieval-heavy, or multi-model projects, audit production-agent readiness and procedural skills before capability/access planning.
9. For integration-heavy projects, map capability and access needs before Build Plan approval.

For the exact reusable new-project instruction, read `START-NEW-PROJECT.md`.

## Prime Directive

Build products methodically. Do not build blind.

Before writing meaningful code, establish the required level of rigor, the current phase, the allowed actions, and the blocked actions. If a gate is missing, stop and produce the missing artifact instead of jumping ahead.

## Session Start Protocol

At the start of any project session:

1. Locate project state:
   - `.codex-brain/state.json`
   - `.codex-brain/classification.json`
   - `.codex-brain/project-context.md`
   - `.codex-brain/memory/`
   - `.codex-brain/sessions/`
   - `.codex-brain/distillates/`
   - `.codex-brain/lessons/`
   - project `CODEX.md` or `CLAUDE.md` if present
2. If state is missing, initialize from `templates/shared/project-state.template.json`.
3. Run or mentally apply `scripts/next-action.mjs`.
4. Classify the project as Light, Standard, or Full if classification is pending.
5. Identify the current phase.
6. Check the gate requirements for that phase.
7. State the next allowed action.
8. Do not perform forbidden actions.

If the user asks how to operate the system end to end, read `USAGE-GUIDE.md`.
If the user asks whether the brain itself should evolve, read `frameworks/governance-and-evolution.md`.
If the user asks what to do next, read `frameworks/context-routing-and-help.md`.
If the user asks whether an idea should become agentic, an operating system, or a high-level intelligence system, read `frameworks/agentic-opportunity-audit.md` and `frameworks/intelligence-system-plan.md`.
If the user asks whether to use ADK, RAG, structured retrieval, extraction, durable memory, workflow agents, or hybrid AI architecture, read `frameworks/intelligence-architecture-selection.md`.
If the user asks how to build production agents, multi-brain orchestration, or reusable agent skills, read `frameworks/agent-engineering-skill-stack.md` and `frameworks/skill-factory.md`.
If the user asks what APIs, CLIs, MCPs, credentials, or app access are needed, read `frameworks/capability-access-readiness.md` and `frameworks/tool-surface-routing.md`.
If the session has large artifacts, read `frameworks/context-distillation.md`.
If the session has changed project state, read `frameworks/session-close-and-context-save.md` before ending.

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
2.25. Agentic Opportunity
2.3. Intelligence Architecture Selection
2.35. Agent Engineering and Skill Factory
2.5. Capability and Access
3. Plan
3.5. Design DNA
4. Decompose
5. Execute
6. Review
7. Ship
8. Learn

Phase 8 feeds back into the repository through structured lessons.

For gate decisions, use `frameworks/quality-gate-matrix.md`. P0 findings block progress.

For workflow routing, use `catalogs/workflow-manifest.json`.

## Git and PR Review Policy

Protect `main` by default.

For any meaningful feature, fix, redesign, refactor, dependency change, database change, infrastructure change, or experiment:

1. Check the current Git branch and working tree before editing.
2. Do not work directly on `main` unless the user explicitly asks for it.
3. Create or recommend a `codex/...` branch for normal feature work.
4. Create or recommend a separate worktree when the change is risky, experimental, long-running, or when the current working tree has unrelated user changes.
5. Keep changes focused and review the diff before completion.
6. Run relevant tests/checks, or document why they could not run.
7. Prefer opening a pull request instead of pushing directly to `main`.
8. Run local Codex review with `/review` before opening or updating a PR when available.
9. Require GitHub Codex Code Review on every PR before merge when the repository integration is available.
10. Treat P0 and P1 review findings as merge blockers. Resolve or explicitly escalate them to the user before merge.
11. Never merge into `main` or push directly to `main` without explicit user approval.

Small documentation, copy, or configuration-only changes may stay on the current branch only when the risk is low and the working tree is clean.

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

For Full mode, use `frameworks/research-deep-methodology.md` and `catalogs/full-mode-coverage-catalog.json`. They define the Full-mode research coverage and are mandatory unless the user explicitly downgrades the project mode.

Forbidden:

- writing Build Plan without evidence
- skipping security/privacy/database thinking for user-facing products

### Gate 2.25 - Agentic Opportunity

Required when the product is AI-core, automation-heavy, workflow-heavy, content-heavy, memory-backed, multi-tool, recurring, monitoring-based, or framed as an operating system.

Requires:

- `docs/agentic-opportunity-audit.md`
- `docs/intelligence-system-plan.md`
- agentic maturity level now
- highest plausible maturity level later
- first closed intelligence loop
- sensing, memory, reasoning, creation, action, routine, approval, eval, and learning analysis
- overbuild and underbuild risks
- deferred agentic layers with revisit triggers

Forbidden:

- mapping tool access before the maturity level and first intelligence loop are known
- promising automation without approval, rollback, and eval boundaries
- building an AI-core product as a prompt box without documenting the tradeoff

### Gate 2.3 - Intelligence Architecture Selection

Required when the product involves AI answers, retrieval, structured records, LLM extraction, durable memory, multi-step workflows, external actions, or routines.

Requires:

- `docs/intelligence-architecture-decision.md`
- source-of-truth policy per core loop
- model-only reasoning vs ADK/workflow decision
- semantic RAG vs deterministic structured retrieval decision
- LLM extraction into structured fields decision
- memory or knowledge graph decision
- external action and routine automation boundaries
- rejected architecture alternatives
- eval and trace requirements
- first vertical slice architecture

Forbidden:

- defaulting to RAG, ADK, or a prompt wrapper without documenting alternatives
- using semantic RAG for exact record state without justification
- storing extracted fields without schema, provenance, confidence, and correction flow
- running Agent Engineering or Capability Access before the intelligence substrate is selected

### Gate 2.35 - Agent Engineering and Skill Factory

Required when the product is L3 or higher, multi-model, retrieval-heavy, skill-driven, tool-using, automation-heavy, externally acting, or intended to behave like a niche expert agent.

Requires:

- `docs/intelligence-architecture-decision.md` when AI architecture matters
- `docs/agent-engineering-audit.md`
- `docs/skill-inventory.md`
- seven-discipline readiness audit: system design, tool contracts, retrieval, reliability, security/safety, evals/observability, and product trust UX
- model/provider routing policy for research, coding, reasoning, domain retrieval, database/API reads, external actions, visual verification, and desktop workflows
- procedural skill inventory with reuse/generate/defer/reject decisions
- skill trust levels T0-T4
- T2-T4 review requirements for scripts, external tools, secrets, writes, public actions, paid actions, destructive actions, and autonomous routines
- eval and trace requirements for core skills

Forbidden:

- choosing capability/access surfaces before skill and tool-contract requirements are understood
- generating or installing executable skills before trust review
- approving Build Plan with missing agent reliability, security, observability, or product trust boundaries
- installing unreviewed public skills because they are popular

### Gate 2.5 - Capability and Access

Required when the product depends on external systems, APIs, SDKs, CLIs, MCP servers, browser automation, desktop apps, paid vendors, media generation, AI tools, authenticated SaaS, deployment platforms, or user-provided credentials.

Requires:

- `docs/capability-access-map.md`
- `docs/agentic-opportunity-audit.md` and `docs/intelligence-system-plan.md` when AI/automation is relevant
- `docs/intelligence-architecture-decision.md` when AI architecture matters
- `docs/agent-engineering-audit.md` and `docs/skill-inventory.md` when agent engineering or procedural skills are relevant
- required capability inventory
- production runtime surface decisions
- Codex/agent implementation surface decisions
- credential, OAuth, webhook, scope, billing, and sandbox requirements
- mock strategy and first live verification path
- destructive, externally visible, paid, or permission-sensitive action boundaries
- user action checklist for required-now access

Forbidden:

- approving Build Plan with an unknown critical access path
- decomposing PRDs that assume missing API keys, OAuth apps, webhooks, accounts, or billing setup
- treating Browser or Computer Use as a production integration without accepted risk

### Gate 3 - Plan

Requires:

- Build Plan
- architecture decisions
- capability and access map
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
- test strategy and traceability matrix
- observability/SLO plan
- AI orchestration/evaluation plan if AI-core

For Full mode, use `frameworks/build-plan-deep-methodology.md`. It defines the exhaustive Build Plan section list and completion gate.

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

After frontend implementation, use `frameworks/frontend-visual-qa.md` to verify the built UI against the approved Design DNA.

### Gate 4 - Decompose

Requires:

- PRDs split into atomic tasks
- vertical slices where possible
- dependencies
- acceptance criteria
- reference links
- allowed file scopes where possible
- verification hints for every task checkbox

For Full mode, also run `frameworks/narrative-validation.md` before execution. User-facing promises must map to specifications.
Use `frameworks/vertical-slice-planning.md` and `scripts/verify-plan.mjs`.

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
- local Codex review with `/review` when available
- GitHub Codex Code Review on the pull request when the repo integration is available
- security review
- performance review
- accessibility review for UI
- privacy/GDPR review when user data exists
- architecture review for Standard and Full

Forbidden:

- shipping with unresolved critical/high issues
- merging unresolved P0 or P1 Codex Code Review findings
- merging into `main` without explicit user approval

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
- structured session record captured in `.codex-brain/sessions/*.json`
- memory updated in `.codex-brain/memory/`
- project context updated if decisions changed
- distillates updated for large research, Build Plan, or execution context
- promotion candidates identified
- postmortem if anything significant failed

Forbidden:

- ending serious projects without feeding learning back into the system
- ending meaningful sessions without context save

## Session Close Protocol

At the end of meaningful work, Codex must save context.

Meaningful work includes:

- code or artifact changes
- product, design, architecture, database, security, privacy, or testing decisions
- failed or passing checks
- blockers or risks discovered
- phase/gate changes
- user corrections that should affect future work

Use:

```bash
npm run save-context -- --dir . --summary "[what happened]" --next "[next allowed action]"
npm run context-health -- --dir .
```

The save must create a session record, update active context, update progress memory, update `state.context`, and leave a concrete next action for the next Codex session.

## Benchmark-Informed Additions

Codex Brain deliberately learns from public systems:

- BMAD: workflow routing, help, quick flow, project context, specialist workflows.
- TracerKit: PRD to plan to build to check, vertical slices, verifiable checkboxes.
- Memory Bank: persistent project context across sessions.

Codex Brain must go beyond those systems through Full-mode product diligence: database scale, tenant isolation, GDPR, security, AI evals, Design DNA, test architecture, launch readiness, and structured learning promotion.

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

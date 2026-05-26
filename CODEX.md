# CODEX.md - Codex Brain Operating Manual

This repository is the canonical Codex Brain system. When a future Codex session is asked to use Codex Brain, read this file first.

## User Trigger Protocol

When the user says "Use Codex Brain", "Follow Codex Brain", "Start with Codex Brain", "Use the brain system", or similar:

1. Treat this repository as the canonical methodology.
2. If the current project is not bootstrapped, bootstrap it with `scripts/bootstrap-project.mjs`.
3. Ensure the target project has a local `CODEX.md` generated from `templates/shared/project-codex.template.md`.
4. Read the local `.codex-brain/` state and project context.
5. Determine and state the next allowed action before building.
6. For AI-core or automation-heavy projects, audit the agentic opportunity and intelligence-system shape before intelligence architecture, agent-engineering, Agent OS runtime, agent network/interoperability, Agentic Zero Trust, and capability/access planning.
7. For AI-core, retrieval-heavy, extraction-heavy, memory-backed, workflow-heavy, or automation-heavy projects, select the intelligence architecture before Agent Engineering.
8. For agentic, skill-driven, retrieval-heavy, or multi-model projects, audit production-agent readiness and procedural skills before Agent OS runtime, agent network/interoperability, Agentic Zero Trust, and capability/access planning.
9. For L3+ agentic, multi-agent, memory-writing, routine-heavy, tool-using, or externally acting projects, define the Agent OS runtime before agent network/interoperability, Agentic Zero Trust, and capability/access planning.
10. For products where agents or domain operating systems collaborate across boundaries, define agent cards, delegation boundaries, task contracts, context sharing, protocol choices, streaming, traces, recovery, and versioning before Agentic Zero Trust and capability/access planning.
11. For agentic systems with tools, MCP, memory, credentials, external action, or sensitive data, define Agentic Zero Trust before capability/access planning.
12. For integration-heavy projects, map capability and access needs before Build Plan approval.

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
4. Before moving into a later phase, run or mentally apply `scripts/verify-lifecycle.mjs --phase [target-phase]`.
5. Classify the project as Light, Standard, or Full if classification is pending.
6. Identify the current phase.
7. Check the gate requirements for that phase.
8. State the next allowed action.
9. Do not perform forbidden actions.

If the user asks how to operate the system end to end, read `USAGE-GUIDE.md`.
If the user asks whether the brain itself should evolve, read `frameworks/governance-and-evolution.md`.
If the user asks what to do next, read `frameworks/context-routing-and-help.md`.
If the user asks whether an idea should become agentic, an operating system, or a high-level intelligence system, read `frameworks/agentic-opportunity-audit.md` and `frameworks/intelligence-system-plan.md`.
If the user asks whether to use ADK, RAG, structured retrieval, extraction, durable memory, workflow agents, or hybrid AI architecture, read `frameworks/intelligence-architecture-selection.md`.
If the user asks how to build production agents, multi-brain orchestration, or reusable agent skills, read `frameworks/agent-engineering-skill-stack.md` and `frameworks/skill-factory.md`.
If the user asks how agents are scheduled, supervised, remembered, sandboxed, attributed, observed, governed, recovered, budgeted, or coordinated, read `frameworks/agent-os-runtime.md`.
If the user asks what an agent should remember, how working/semantic/procedural/episodic memory should be used, or whether a memory store is needed, read `frameworks/memory-architecture.md`.
If the user asks how separate agents or domain operating systems discover each other, delegate work, exchange artifacts, share context, stream progress, or choose between MCP and A2A-style protocol boundaries, read `frameworks/agent-network-interop.md`.
If the user asks how agentic systems defend against prompt injection, tool poisoning, credential theft, excessive agency, memory poisoning, MCP compromise, A2A spoofing, or cyberattackers, read `frameworks/agentic-zero-trust.md`.
If the user asks what APIs, CLIs, MCPs, credentials, or app access are needed, read `frameworks/capability-access-readiness.md` and `frameworks/tool-surface-routing.md`.
If the user asks how to use multiple agents, subagents, QA agents, reviewer agents, or parallel checks for implementation quality, read `frameworks/qa-subagent-orchestration.md`.
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
2.4. Agent OS Runtime
2.45. Agent Network and Interoperability
2.47. Agentic Zero Trust
2.5. Capability and Access
3. Plan
3.5. Design DNA
4. Decompose
5. Execute
6. Review
7. Ship
8. Learn

Phase 8 feeds back into the repository through structured lessons.

For meaningful Standard or Full execution, Codex should audit required skills, MCP tools, MCP access, CLI access, credentials, mocks, and live verification surfaces; create or apply a QA plan; and decide whether explorer, verifier, reviewer, or specialist subagents are warranted before calling the task done. Use `frameworks/qa-subagent-orchestration.md` for the delegation rules and `templates/shared/qa-subagent-orchestration.template.md` for the task-level artifact.

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
- running Agent Engineering, Agent Network, Agentic Zero Trust, or Capability Access before the intelligence substrate is selected

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

- choosing Agentic Zero Trust or capability/access surfaces before skill and tool-contract requirements are understood
- choosing agent network boundaries before skill and tool-contract requirements are understood
- generating or installing executable skills before trust review
- approving Build Plan with missing agent reliability, security, observability, or product trust boundaries
- installing unreviewed public skills because they are popular

### Gate 2.4 - Agent OS Runtime

Required when the product is L3 or higher, multi-agent, memory-writing, routine-heavy, tool-using, externally acting, or intended to behave like a managed agent operating system.

Requires:

- `docs/agent-os-runtime-plan.md`
- scheduler/orchestrator policy for priority, queues, background work, concurrency, cancellation, and escalation
- per-loop memory-fit decision for working, semantic, procedural, and episodic memory when the system is memory-backed
- memory manager policy for short-term, long-term, episodic, semantic, procedural, private, reviewable, deleteable, and tenant-bound memory
- tool manager and sandbox policy for read/write/destructive/public/paid tools, dry runs, fixtures, file/network boundaries, and tool-output trust
- identity and delegation model for user, tenant, service account, scopes, token expiry, impersonation, and audit attribution
- observability and trace schema for prompts, context, retrieval, tool calls, model routes, approvals, memory changes, external actions, cost, latency, and failures
- guardrails and governance policy for input/output controls, prompt injection, human-in-the-loop thresholds, exceptions, and abuse cases
- recovery and resumability policy for job state, retries, idempotency, duplicate prevention, rollback, compensating actions, and resume points
- budget and quota limits for model usage, provider APIs, routines, paid vendors, media generation, and per-user or per-tenant usage
- agent registry with roles, owners, allowed tools, allowed memory, allowed actions, escalation paths, and review cadence
- human control surface for approval queues, pending actions, memory review, trace inspection, pause/stop, rollback/revoke, and escalation

Forbidden:

- choosing agent network, Agentic Zero Trust, or capability/access surfaces before runtime boundaries are known
- approving Build Plan with hidden memory writes
- approving Build Plan with memory storage selected before memory type, owner, provenance, and forgetting rules are justified
- approving Build Plan with unsandboxed tools or unattributed external actions
- allowing autonomous routines without budget, trace, idempotency, and recovery policy
- calling a workflow graph an operating system without memory, identity, governance, and recovery contracts

### Gate 2.45 - Agent Network and Interoperability

Required when agents or domain operating systems collaborate across runtime, vendor, team, product, tenant, or ownership boundaries.

Requires:

- `docs/agent-network-interop-plan.md`
- internal versus external agent/OS roster
- exposed and consumed agent cards with owners, versions, accepted/refused tasks, input/output contracts, modalities, auth, memory policy, approvals, SLA, streaming, traces, and escalation
- collaboration topology and orchestrator ownership
- delegation boundaries for allowed scope, forbidden scope, approvals, context shared, memory writes, and audit
- task, message, artifact, refusal, timeout, retry, and idempotency contracts
- explicit MCP/tool access versus A2A-style agent delegation versus API/SDK versus internal workflow versus event/queue decisions
- memory and context-sharing policy with least-context, redaction, provenance, correction/delete/export, and prompt-injection handling
- identity, auth, trust, scope, token expiry, tenant boundary, impersonation, revocation, and audit attribution model
- streaming/progress model for long-running delegated tasks
- cross-agent observability with correlation IDs, downstream tool traces, approvals, cost, latency, and replay path
- failure, timeout, retry, compensation, fallback, and escalation behavior
- versioning and compatibility policy
- first interoperable slice

Forbidden:

- treating MCP/tool access and A2A-style agent delegation as interchangeable
- exposing agent capabilities without agent cards, owner, version, auth, memory, approval, trace, and compatibility policy
- sharing raw private memory across domain boundaries when a distilled task payload is enough
- approving Build Plan with unscoped remote-agent delegation or untraceable cross-agent actions
- using A2A-style delegation for simple same-runtime function calls

### Gate 2.47 - Agentic Zero Trust

Required when the product is L3+ agentic, tool-using, MCP-enabled, memory/retrieval-backed, externally acting, autonomous, multi-agent, customer-data-bearing, enterprise, regulated, or able to publish, send, delete, spend, or mutate production.

Requires:

- `docs/agentic-zero-trust-plan.md`
- non-human identity and actor-chain attribution for users, tenants, agents, sub-agents, routines, tool runners, credentials, and downstream agents
- JIT credentials, vault/broker checkout, least scope, expiry, rotation, revocation, and secret scanning
- per-action authorization and intent verification for public, paid, destructive, externally visible, and compliance-sensitive actions
- trusted registry for tools, MCP servers, connectors, skills, generated harnesses, agent cards, models, prompts, policies, and eval sets
- AI gateway/firewall and policy enforcement around input, retrieved context, tool arguments, output, egress, and delegated payloads
- memory, retrieval, embedding, policy, preference, eval, and model integrity controls
- sandboxing, segmentation, egress, tenant, browser, desktop, subprocess, and production mutation boundaries
- immutable observability and forensic traces for prompt, context, retrieval, memory, model route, policy, credential checkout, tool call, delegation, approval, failure, and external action events
- human controls: approval queue, kill switch, pause/stop, revoke, throttles, spend limits, canaries, rollback, and incident response
- adversarial eval suite for prompt injection, indirect prompt injection, tool poisoning, MCP compromise, skill supply-chain attack, credential misuse, data exfiltration, memory poisoning, data/model poisoning, excessive agency, sub-agent escalation, A2A spoofing, and unbounded consumption
- first secure autonomous slice

Forbidden:

- choosing capability/access surfaces before zero-trust controls are known
- approving Build Plan with static, broad, embedded, or unrevocable credentials
- approving Build Plan with unregistered privileged tools, MCP servers, skills, models, or agent cards
- allowing model output to drive privileged tool calls without validation and policy enforcement
- shipping launch-critical agentic flows without immutable traces, human controls, adversarial evals, and incident response

### Gate 2.5 - Capability and Access

Required when the product depends on external systems, APIs, SDKs, CLIs, MCP servers, browser automation, desktop apps, paid vendors, media generation, AI tools, authenticated SaaS, deployment platforms, or user-provided credentials.

Requires:

- `docs/capability-access-map.md`
- `docs/agentic-opportunity-audit.md` and `docs/intelligence-system-plan.md` when AI/automation is relevant
- `docs/intelligence-architecture-decision.md` when AI architecture matters
- `docs/agent-engineering-audit.md` and `docs/skill-inventory.md` when agent engineering or procedural skills are relevant
- `docs/agent-os-runtime-plan.md` when L3+ agentic runtime governance is relevant
- `docs/agent-network-interop-plan.md` when agent network or inter-OS collaboration is relevant
- `docs/agentic-zero-trust-plan.md` when agentic security controls are relevant
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

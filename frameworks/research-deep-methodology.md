# Deep Research Methodology

This is the Full-mode research system for Codex Brain.

Use this when the project is Standard with meaningful risk, or Full by classification. Its purpose is to make missed questions structurally difficult. It is not a generic research checklist. It is a decision-grade evidence system for building products that can survive real users, scale, regulation, competition, security review, and investor/customer diligence.

## Core Principle

No important product, architecture, database, security, privacy, design, or business claim should enter the Build Plan unless it is one of:

- evidence-backed
- user-provided and marked as assumption
- explicitly uncertain with a mitigation path
- intentionally deferred with owner and revisit trigger

## Research Outputs

Full research produces:

```text
.codex-brain/research/
├── 00-executive-summary.md
├── 01-product-and-user.md
├── 02-market-and-competition.md
├── 03-moat-and-positioning.md
├── 04-business-model-and-pricing.md
├── 05-technical-feasibility.md
├── 06-database-and-scale.md
├── 07-security-threat-model.md
├── 08-privacy-gdpr-compliance.md
├── 09-design-and-ux-references.md
├── 10-frontend-interaction-quality.md
├── 11-ai-orchestration-and-evals.md
├── 12-integrations-and-vendors.md
├── 13-billing-and-subscription-edge-cases.md
├── 14-reliability-observability-operations.md
├── 15-analytics-data-strategy.md
├── 16-accessibility-internationalization.md
├── 17-legal-trust-and-risk.md
├── 18-build-vs-buy-and-team-capability.md
├── 19-synthesis-decisions.md
├── 20-test-architecture-and-traceability.md
├── 21-context-continuity-and-memory.md
├── 22-workflow-routing-and-governance.md
├── 23-agentic-opportunity-and-intelligence-system.md
├── 24-intelligence-architecture-selection.md
├── 25-agent-engineering-and-skill-factory.md
├── 26-capability-access-readiness.md
└── evidence-ledger.json
```

Light and Standard projects use a subset, but Full projects must touch every category. If a category is not applicable, it must be justified, not silently skipped.

## Evidence Ledger

Every major claim should be entered into `evidence-ledger.json`.

```json
{
  "id": "ev_001",
  "claim": "PostgreSQL is the best primary database for this product.",
  "category": "database-and-scale",
  "evidence_type": "technical-comparison",
  "source": "project analysis / benchmark / official docs / user input",
  "confidence": 0.8,
  "status": "supported",
  "decision_impact": "database choice",
  "open_questions": []
}
```

## Category 1 - Product and User Research

Answer:

- Who is the exact user?
- What job are they trying to do?
- What pain exists today?
- What triggers them to look for a solution?
- How do they solve it now?
- What do they hate about existing solutions?
- What would make them switch?
- What would make them trust the product?
- What would make them churn?
- What is the smallest valuable workflow?

Required artifacts:

- target user profile
- top workflows
- pain severity
- alternatives
- switching triggers
- trust objections
- success criteria

Full-mode additions:

- buyer vs user distinction
- adoption friction
- procurement friction
- stakeholder map
- onboarding risks
- support burden forecast

## Category 2 - Market and Competition

Answer:

- What category is this product in?
- Who are direct competitors?
- Who are indirect competitors?
- What do users currently pay for?
- Where are competitors weak?
- What features are table stakes?
- What features are differentiators?
- What distribution channels dominate?
- What pricing anchors exist?

Minimum Full-mode coverage:

- 10 direct or adjacent competitors, or a justified smaller market map
- feature matrix
- pricing comparison
- positioning map
- distribution map
- gap analysis

## Category 3 - Moat and Positioning

Answer:

- Why will this win?
- Why can it stay winning?
- Is there a data moat?
- Is there workflow lock-in?
- Are there network effects?
- Is speed or quality the wedge?
- Does brand/trust matter?
- Can incumbents copy it easily?
- What compounds over time?

Moat types to evaluate:

- proprietary data
- workflow embeddedness
- switching costs
- integrations
- network effects
- marketplace liquidity
- regulatory/compliance trust
- brand
- cost structure
- operational excellence
- model/evaluation loop

Output:

- moat thesis
- anti-moat risks
- compounding loop
- weakest assumption

## Category 4 - Business Model and Pricing

Answer:

- Who pays?
- Why do they pay?
- How much can they pay?
- Is pricing usage-based, subscription, transaction, seat-based, tiered, enterprise, or hybrid?
- What is the free tier, if any?
- What is the upgrade trigger?
- What happens on downgrade?
- What is the refund/cancellation experience?

Full-mode additions:

- willingness-to-pay hypothesis
- pricing tiers
- plan limits
- margin assumptions
- CAC/LTV hypothesis
- payback period hypothesis
- sales motion
- enterprise procurement requirements

## Category 5 - Technical Feasibility

Answer:

- What must the system technically do?
- What are the hardest parts?
- Which parts are solved by existing tools?
- Which parts require novel engineering?
- What latency, throughput, or accuracy requirements exist?
- What are the failure modes?

Evaluate:

- framework alternatives
- hosting alternatives
- architecture patterns
- state management
- background jobs
- queues
- file/storage handling
- realtime needs
- search needs
- AI/model needs
- data import/export

Output:

- technical risk register
- recommended stack
- alternatives matrix
- proof-of-concept requirements if uncertainty is high

## Category 6 - Database and Scale

Answer:

- What is the source of truth?
- What are the core entities?
- Who owns each record?
- What grows fastest?
- What queries dominate?
- What must be indexed?
- What should be cached?
- What needs auditability?
- What needs deletion/export?
- What happens at 10x, 100x, 1000x?

Full-mode required:

- database alternatives matrix
- primary database ADR
- schema ownership model
- tenant isolation model if applicable
- hot table forecast
- index plan
- migration plan
- backup/restore plan
- RTO/RPO
- archive/retention strategy
- analytics boundary

Decision questions:

- PostgreSQL vs MySQL vs SQLite vs document store vs graph vs specialized store?
- Single database vs separate services?
- JSONB vs normalized tables?
- Soft delete vs hard delete?
- Row-level security vs app-enforced authorization?
- Shared-schema tenancy vs isolated schema/database?

## Category 7 - Security Threat Model

Answer:

- What assets need protection?
- Who are attackers?
- What are abuse cases?
- What are auth risks?
- What are authorization risks?
- What are injection risks?
- What are supply-chain risks?
- What secrets exist?
- What logs could leak sensitive data?

Required:

- asset inventory
- trust boundaries
- authentication model
- authorization model
- OWASP risk scan
- STRIDE or equivalent threat pass
- abuse/rate-limit plan
- secret management
- logging policy
- incident response sketch

Full-mode additions:

- privilege model
- admin impersonation policy
- audit log requirements
- security headers
- dependency scanning
- SAST/DAST plan
- vulnerability response
- customer-facing trust communication

## Category 8 - Privacy, GDPR, and Compliance

Answer:

- What personal data is processed?
- What is the lawful basis?
- Who is controller?
- Who are processors?
- Is data transferred outside the EU?
- What is retention?
- How do users export data?
- How do users delete data?
- What cookies/tracking exist?
- Is consent required?
- Are children or sensitive data involved?

Required:

- data inventory
- lawful basis matrix
- processor/subprocessor list
- retention rules
- deletion/export process
- privacy policy requirements
- DPA need assessment
- cookie/tracking assessment

Full-mode additions:

- DPIA trigger assessment
- data residency requirements
- breach notification plan
- audit evidence plan
- SOC2/ISO roadmap if enterprise

## Category 9 - Design and UX References

Answer:

- What should the product feel like?
- What references does the user like?
- Which references are rejected?
- What page/workflow types need references?
- What trust signals are needed visually?
- What density is appropriate?

Required:

- references by page type
- Design DNA summary
- visual do-not-use list
- color direction
- type direction
- component direction
- accessibility baseline

Full-mode additions:

- competitor visual audit
- trust communication patterns
- motion references
- empty/loading/error state references
- mobile references
- visual QA rubric

## Category 10 - Frontend Interaction Quality

Answer:

- What are the core user flows?
- What states exist?
- What can go wrong?
- How are errors presented?
- What loading states matter?
- What empty states matter?
- What keyboard flows matter?
- What responsive breakpoints matter?

Required:

- core flow map
- UI state inventory
- component inventory
- responsive requirements
- accessibility requirements
- motion boundaries

Full-mode additions:

- prototype requirements
- design system components
- microinteraction rules
- perceived performance plan
- trust and credibility UI
- conversion path review

## Category 11 - AI Orchestration and Evals

Required when AI is core.

Answer:

- What does AI do?
- Which tasks require models?
- Which model(s) and why?
- What context is provided?
- What tools can AI call?
- What data can AI access?
- What is the fallback when AI fails?
- How is quality evaluated?
- How are hallucinations handled?
- How is prompt injection handled?

Required:

- model routing plan
- prompt architecture
- retrieval/context plan
- eval set
- failure handling
- human escalation
- cost controls
- privacy boundaries

Full-mode additions:

- offline eval harness
- golden datasets
- drift monitoring
- tool permission model
- red-team prompts
- customer-facing AI disclosure
- model/provider fallback

## Agentic Opportunity and Intelligence System

Required when AI, automation, memory, recurring workflows, multi-tool action, or operating-system ambition is relevant.

Answer before Intelligence Architecture, Agent Engineering, and Capability and Access:

- Is this a normal app, AI-assisted workflow, memory-backed copilot, workflow agent, bounded autonomous operator, or domain operating system?
- What agentic maturity level should be built now?
- What is the highest plausible maturity level later?
- What is the first closed intelligence loop?
- What should the system sense, remember, reason about, create, act on, evaluate, and learn from?
- What human approval gates and rollback boundaries are required?
- What is overbuilt now, and what would be underbuilt?
- What becomes the private data flywheel or moat?

Required:

- `docs/agentic-opportunity-audit.md`
- `docs/intelligence-system-plan.md`
- maturity decision
- first closed loop
- memory/sensing/tool/routine/approval/eval/learning map
- deferred agentic layers with revisit triggers
- overbuild and underbuild risks

## Intelligence Architecture Selection

Required when AI answers, retrieval, extraction, memory, recurring workflows, multi-tool action, or operating-system ambition is relevant.

Answer before Agent Engineering and Capability and Access:

- For each core loop, is the system answering, deciding, transforming, extracting, remembering, coordinating, acting, or recurring?
- What is the source of truth for each loop?
- Does the loop need semantic RAG, deterministic structured retrieval, LLM extraction into structured fields, durable memory, ADK-style workflow, external action, routine automation, or a hybrid?
- Where would RAG be weaker than exact SQL/API retrieval?
- Where would structured retrieval be weaker than semantic document retrieval?
- What raw material must be extracted into typed fields before it becomes reliable memory or automation input?
- What eval and trace prove the architecture works?

Required:

- `docs/intelligence-architecture-decision.md`
- source-of-truth map
- RAG vs structured retrieval vs extraction decision
- ADK/workflow decision
- memory/knowledge graph decision
- external action and routine automation boundaries
- first vertical slice architecture

## Agent Engineering and Skill Factory

Required when AI agents, retrieval, tool use, multi-model orchestration, procedural skills, or externally visible actions are relevant.

Answer before Capability and Access:

- What are the production-agent system boundaries, data flows, model routes, state owners, and failure boundaries?
- What tool contracts, schemas, examples, output contracts, and approval policies are needed?
- What retrieval sources, ranking, citations, freshness, and evals are needed?
- What timeouts, retries, fallbacks, circuit breakers, job states, and rollback paths are needed?
- What security/safety boundaries protect against prompt injection, overbroad permissions, secret leakage, tenant bleed, and unsafe external action?
- What traces, logs, golden examples, evals, latency/cost metrics, and drift checks are needed?
- What product trust surfaces expose confidence, evidence, memory changes, approvals, escalation, and rollback?
- What procedural skills should be reused, generated, deferred, or rejected?

Required:

- `docs/agent-engineering-audit.md`
- `docs/skill-inventory.md`
- seven-discipline readiness score
- model/provider routing policy
- skill trust levels and T2-T4 review requirements
- skill eval and approval requirements

## Category 12 - Integrations and Vendors

Answer:

- Which third parties are required?
- What happens if they fail?
- What data do they receive?
- What are cost limits?
- What are rate limits?
- What is the exit strategy?

Required:

- vendor list
- API limits
- cost model
- data-sharing model
- failure plan
- substitution plan

## Capability and Access Readiness

Answer before Build Plan:

- Which external capabilities are required?
- Which official APIs, SDKs, CLIs, MCP servers, generated harnesses, browser workflows, or Computer Use paths exist?
- Which surface should the product use at runtime?
- Which surface should Codex use while building and verifying?
- What credentials, OAuth apps, scopes, webhooks, sandbox accounts, billing setup, and local tools are required?
- What can be mocked safely?
- What requires live verification before PRDs or shipping?
- What user actions block planning?

Required:

- capability inventory
- access surface decision for each required capability
- credential and account checklist
- mock and first live verification plan
- destructive/external/paid action boundaries
- `docs/capability-access-map.md`

## Category 13 - Billing and Subscription Edge Cases

Required when paid.

Answer:

- What plans exist?
- What happens on upgrade?
- What happens on downgrade?
- What happens on failed payment?
- What happens on cancellation?
- What happens on refund?
- What happens on chargeback?
- What happens with tax/VAT?
- What happens with usage limits?
- What happens to data after subscription ends?

Required:

- plan model
- Stripe/payment architecture
- dunning flow
- proration behavior
- refund policy
- tax/VAT assumptions
- entitlement model
- grace period
- invoice/customer portal requirements

## Category 14 - Reliability, Observability, and Operations

Answer:

- What must be up?
- What is acceptable downtime?
- What are critical user journeys?
- What should alert?
- What logs/metrics/traces are needed?
- How do we roll back?
- How do we know a deploy failed?

Required:

- health checks
- logging plan
- monitoring plan
- alert plan
- rollback plan
- incident severity definitions

Full-mode additions:

- SLO/SLA targets
- error budgets
- on-call/ownership
- runbooks
- synthetic monitoring
- post-incident review process

## Category 15 - Analytics and Data Strategy

Answer:

- What metrics define success?
- What events are tracked?
- What funnels matter?
- What dashboards are needed?
- What data can be used for product learning?
- What data must not be collected?

Required:

- north-star metric
- activation metric
- retention metric
- event taxonomy
- analytics vendor
- privacy-safe tracking approach

Full-mode additions:

- A/B testing plan
- cohort analysis
- warehouse strategy
- data quality checks
- customer health scoring if B2B

## Category 16 - Accessibility and Internationalization

Answer:

- Does the product need WCAG AA?
- What keyboard flows exist?
- What screen reader needs exist?
- What contrast requirements exist?
- What languages/locales are needed?
- Is RTL needed?
- What date/time/currency formats matter?

Required for UI:

- accessibility baseline
- keyboard navigation plan
- contrast plan
- semantic HTML/component requirements

Full-mode additions:

- WCAG checklist
- localization strategy
- translation workflow
- locale-sensitive data handling

## Category 17 - Legal, Trust, and Risk

Answer:

- What user promises are made?
- What disclaimers are needed?
- What terms/privacy pages are needed?
- What trust pages are needed?
- What customer objections must be answered?

Required:

- legal page inventory
- trust communication plan
- risk register
- launch claim review

## Category 18 - Build vs Buy and Team Capability

Answer:

- What should be built?
- What should be bought?
- What should be deferred?
- What capabilities are missing?
- What is risky for the current team?

Required:

- build/buy/defer matrix
- capability gaps
- learning/prototype needs
- implementation risk mitigation

## Category 19 - Synthesis and Decisions

Research ends with decisions.

Output:

- accepted assumptions
- rejected assumptions
- open questions
- required Build Plan sections
- risks to carry forward
- mode escalation/de-escalation recommendation
- go / conditional go / pivot / no-go

## Category 20 - Test Architecture and Traceability

Answer:

- What P0/P1 requirements need verification?
- Which vertical slices prove the critical journeys?
- Which tests map to each requirement?
- What security, privacy, tenant isolation, billing, accessibility, performance, and AI eval cases are required?
- What release gate evidence is needed?

Required:

- test strategy
- traceability matrix
- P0/P1 test coverage plan
- release gate evidence model

## Category 21 - Context Continuity and Memory

Answer:

- What project context must every future session load?
- What decisions belong in memory rather than a transient chat?
- Which large artifacts need context distillation?
- Do state, memory, Build Plan, Design DNA, and current code agree?
- What lessons should be promoted into the brain?

Required:

- project context
- memory files
- context distillation plan
- stale-context risk review

## Category 22 - Workflow Routing and Governance

Answer:

- What is the next allowed action?
- Which workflow creates the missing artifact?
- Which actions are blocked by the current gate?
- Does the workflow manifest route the project correctly?
- Does a mode downgrade require risk acceptance?

Required:

- next-action routing
- workflow manifest coverage
- blocked action list
- downgrade risk protocol

## Research Quality Gate

Before planning:

- Every required category exists or is justified as not applicable.
- Every major claim is evidence-backed or marked assumption.
- Every risk has owner/mitigation/defer decision.
- Every architecture decision has enough evidence for the Build Plan.
- Every AI-core, automation-heavy, or operating-system-shaped product has an agentic maturity decision and first closed intelligence loop.
- Every AI-core, retrieval-heavy, extraction-heavy, memory-backed, workflow-heavy, or automation-heavy product has an intelligence architecture decision covering RAG, structured retrieval, extraction, memory, workflow, action, and routine needs.
- Every L3+ or skill-driven agentic product has agent-engineering readiness, model routing, skill inventory, trust levels, and eval/trace requirements.
- Every critical external capability has an explicit access surface, credential plan, mock strategy, and live verification trigger.
- Every UI product has Design DNA inputs started.
- Every Full-mode project has explicit security, database, privacy, reliability, agentic opportunity, intelligence architecture, agent engineering/skill factory, capability/access, business-model, test architecture, context continuity, and workflow routing coverage.

## Anti-Patterns

- Research as a list of links.
- Research that does not affect decisions.
- Assuming the database is obvious.
- Treating GDPR as a footer policy.
- Treating design as colors only.
- Treating AI as magic.
- Skipping billing edge cases until implementation.
- Calling a category "not applicable" without justification.

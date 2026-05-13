# Deep Build Plan Methodology

This is the Full-mode Build Plan generator for Codex Brain.

The Build Plan is the master specification. It turns research into a product, architecture, design, data, security, privacy, reliability, and execution contract.

If research is the evidence layer, the Build Plan is the decision layer.

## Core Rule

No implementation task should require the agent to invent product behavior, database structure, security rules, user flows, visual direction, or deployment assumptions from scratch.

If the agent has to guess, the Build Plan is incomplete.

## Build Plan Outputs

```text
docs/
├── build-plan.md
├── adr/
│   ├── 001-primary-database.md
│   ├── 002-auth-strategy.md
│   ├── 003-hosting-platform.md
│   └── ...
├── architecture/
│   ├── system-overview.md
│   ├── data-model.md
│   ├── api-contracts.md
│   ├── auth-authorization.md
│   ├── security-threat-model.md
│   ├── privacy-gdpr.md
│   ├── observability.md
│   └── ai-orchestration.md
├── product/
│   ├── user-flows.md
│   ├── feature-spec.md
│   ├── pricing-and-billing.md
│   └── narrative-promises.md
└── ship/
    ├── launch-plan.md
    ├── monitoring-plan.md
    └── rollback-plan.md
```

## Required Build Plan Sections

### 1. Executive Product Summary

Define:

- product name
- product category
- target user
- buyer if different from user
- primary problem
- core promise
- core workflow
- success definition
- non-goals

Quality bar:

- A non-technical stakeholder can understand the product.
- An engineer can understand the product boundary.

### 2. Rigor Mode and Gate History

Include:

- selected mode
- classification signals
- why this mode was selected
- user approval
- gates completed
- known deferred risks

### 3. Research Traceability

Every major decision should trace to research:

| Decision | Research Category | Evidence ID | Confidence | Open Risk |
| --- | --- | --- | --- | --- |

No traceability means the decision is an assumption.

### 4. User Personas and Jobs-to-be-Done

Define:

- primary users
- secondary users
- buyers/admins
- jobs-to-be-done
- pains
- success moments
- trust objections
- onboarding needs

### 5. Product Scope

Define:

- MVP
- v1
- explicitly out of scope
- future roadmap
- feature kill criteria

### 6. Core User Flows

For each major workflow:

- entry point
- steps
- success path
- error path
- empty state
- loading state
- permissions
- analytics events
- support concerns

Example:

```text
Flow: Create workspace
Actor: authenticated user
Preconditions: user has account
Steps:
1. User clicks New Workspace
2. User enters name
3. System creates workspace and owner membership
4. User lands on empty workspace dashboard
Failure cases:
- duplicate name
- rate limit
- validation error
- network failure
Events:
- workspace_create_started
- workspace_create_completed
- workspace_create_failed
```

### 7. Information Architecture

Define:

- pages
- routes
- navigation
- layout hierarchy
- admin areas
- settings areas
- empty states
- error pages

### 8. Design DNA Integration

Reference:

- `design/design-dna.md`
- `design/tokens.json`
- screenshots/references

Define:

- visual mood
- typography
- colors
- density
- component style
- motion
- responsive behavior
- accessibility baseline
- do-not-use list

Gate:

- frontend tasks cannot be created unless Design DNA is approved for user-facing UI.

### 9. Technical Architecture

Define:

- application architecture
- frontend architecture
- backend architecture
- data layer
- service boundaries
- background jobs
- queues
- file storage
- cache layers
- search/vector layers
- realtime needs
- external integrations

Include a diagram if helpful.

### 10. Technology Stack Decisions

For every major choice:

- selected tool
- alternatives considered
- decision criteria
- why selected
- risks
- exit strategy

### Agentic Opportunity and Intelligence System

Reference `docs/agentic-opportunity-audit.md` and `docs/intelligence-system-plan.md` when AI, automation, memory, recurring workflows, or operating-system ambition is relevant.

Define:

- agentic maturity level now
- highest plausible maturity level later
- first closed intelligence loop
- normal app vs AI-assisted vs agentic OS tradeoff
- memory model
- sensing/input model
- reasoning and skill model
- routine and automation model
- human approval/control model
- eval and quality model
- learning flywheel and moat
- deferred OS layers
- overbuild and underbuild risks

### Capability and Access Readiness

Reference `docs/capability-access-map.md` and define:

- production runtime surface for each external capability
- Codex/agent implementation surface for each capability
- setup/testing surface
- official API/SDK/CLI/MCP availability
- generated harness, Browser, or Computer Use fallback if needed
- credentials, OAuth, scopes, webhooks, billing, sandbox, and local tooling requirements
- mock strategy and first live verification path
- required-now user action checklist
- destructive, externally visible, paid, and permission-sensitive action boundaries

Required ADRs for Full mode:

- primary database
- web framework
- auth provider/strategy
- hosting/deployment platform
- payment provider if paid
- AI/model provider if AI-core
- analytics/observability stack

### 11. Database and Data Model

Define:

- every entity
- ownership
- relationships
- constraints
- indexes
- retention/deletion behavior
- audit needs
- migration strategy

For each table/entity:

```text
Entity: workspace
Purpose:
Owner:
Fields:
- id
- tenant_id
- name
- created_at
Indexes:
- tenant_id
- tenant_id + name
Access rules:
- owners/admins can update
- members can read
Retention:
- soft delete for 30 days
```

Full mode must include:

- scale model
- hot tables
- multi-tenancy if applicable
- backup/restore
- data export/delete
- analytics boundary

### 12. Multi-Tenancy and Authorization

Required if teams/orgs/workspaces/customers exist.

Define:

- tenant model
- membership model
- roles
- permissions
- cross-tenant prevention
- admin override rules
- background job tenant context
- tests proving isolation

Authorization matrix:

| Resource | Owner | Admin | Member | Viewer | Anonymous |
| --- | --- | --- | --- | --- | --- |

### 13. Authentication

Define:

- auth method
- signup
- login
- logout
- password reset
- OAuth if applicable
- session duration
- MFA if applicable
- email verification
- invite flow
- account deletion

### 14. API / Module Contracts

For every endpoint or internal module:

- method/function
- path/name
- auth requirements
- input schema
- output schema
- errors
- rate limits
- side effects
- events emitted

### 15. Security Architecture

Define:

- threat model summary
- trust boundaries
- authz enforcement points
- input validation
- rate limiting
- secret handling
- logging policy
- dependency scanning
- security headers
- admin controls
- incident response

Full mode:

- OWASP mapping
- STRIDE mapping
- abuse cases
- audit logs
- vulnerability process

### 16. Privacy, GDPR, and Compliance

Define:

- personal data inventory
- lawful basis
- retention
- export/delete
- subprocessors
- cookie/tracking
- privacy policy requirements
- DPA requirements
- breach response

Full mode:

- DPIA trigger assessment
- data residency
- compliance roadmap
- trust/security page requirements

### 17. AI Orchestration

Required if AI-core.

Define:

- AI use cases
- model routing
- prompts
- context/RAG
- tools
- permissions
- evals
- failure modes
- fallback
- safety
- cost limits
- monitoring

### 18. Billing and Subscription

Required if paid.

Define:

- plans
- entitlements
- limits
- trial
- upgrade
- downgrade
- cancellation
- failed payment
- refund
- chargeback
- tax/VAT
- customer portal
- webhooks
- invoice states
- data access after cancellation

### 19. Reliability and Observability

Define:

- health checks
- logs
- metrics
- traces
- alerts
- dashboards
- SLOs
- error budgets
- rollback
- incident response

### 20. Analytics and Product Learning

Define:

- north-star metric
- funnel metrics
- activation events
- retention events
- event taxonomy
- dashboards
- privacy boundaries
- experiments

### 21. Accessibility and Internationalization

Define:

- WCAG target
- keyboard navigation
- screen reader support
- contrast
- focus states
- reduced motion
- touch targets
- languages/locales
- timezone/currency/date handling

### 22. Performance

Define:

- performance budgets
- frontend bundle targets
- API latency targets
- database query budgets
- caching plan
- image/media optimization
- load testing requirements

### 23. Testing Strategy

Define:

- unit tests
- integration tests
- E2E tests
- visual tests
- accessibility tests
- security tests
- database isolation tests
- AI evals if applicable
- smoke tests

### 24. Deployment and Infrastructure

Define:

- environments
- CI/CD
- env vars
- secrets
- migrations
- deployment flow
- rollback
- preview environments
- monitoring

### 25. Admin, Support, and Operations

Define:

- admin dashboard
- support tooling
- audit trails
- user impersonation policy
- manual remediation
- customer support flows

### 26. Legal and Trust Communication

Define:

- terms
- privacy
- security page
- trust page
- cookie notice
- compliance claims
- AI disclosure
- data processing claims

### 27. Narrative Promises

List the promises the product makes to users.

Each promise must trace to a spec section or become a gap.

| Promise | Spec Section | Status |
| --- | --- | --- |

### 28. Phase Breakdown

Break implementation into PRDs:

- foundation
- data/auth
- core backend
- core frontend
- integrations
- billing
- AI
- polish
- review/ship

Each phase must have:

- goal
- dependencies
- tasks
- acceptance criteria
- verification

### 29. Risk Register

For each risk:

- description
- severity
- likelihood
- owner
- mitigation
- trigger
- decision

### 30. Open Questions and Deferred Decisions

Every unknown must have:

- why it is unknown
- owner
- deadline
- blocker status
- fallback

### 31. Test Architecture and Traceability

Define:

- P0/P1 requirements
- traceability matrix
- vertical slice to test mapping
- security/privacy/tenant/billing/AI eval coverage
- release gate evidence

### 32. Context Continuity and Distillation

Define:

- project context update policy
- memory files to maintain
- research distillate
- Build Plan distillate
- execution distillate
- stale-context review process

### 33. Workflow Routing and Governance

Define:

- next allowed action
- workflow manifest route
- blocked actions
- approval points
- downgrade risk process

## Build Plan Completion Gate

The Build Plan is complete only when:

- all required sections exist or are justified as not applicable
- every major research decision is traced
- agentic opportunity and intelligence-system plan exist for AI/automation-heavy products
- capability/access map exists and all critical required-now access paths are explicit
- Design DNA is approved if UI exists
- database plan matches mode
- security/privacy plan matches mode
- billing plan exists if paid
- AI plan exists if AI-core
- test strategy and traceability matrix exist for Full mode
- project context and memory are initialized
- large research or Build Plan artifacts have distillation plan
- next-action routing is clear
- multi-tenancy plan exists if applicable
- phase breakdown is execution-ready
- no critical open question blocks PRDs

## Anti-Patterns

- A Build Plan that is mostly code snippets.
- A Build Plan that ignores user flows.
- A Build Plan with "TBD" in security/privacy/database.
- A Build Plan that says "use PostgreSQL" without explaining why for Full mode.
- A Build Plan that includes UI tasks before Design DNA approval.
- A Build Plan that says "Stripe integration" without edge cases.
- A Build Plan that says "AI assistant" without evals.
- A Build Plan with tasks too large for one execution loop.

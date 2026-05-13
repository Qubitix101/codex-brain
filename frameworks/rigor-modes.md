# Rigor Modes

Codex Brain adapts process depth to project risk and ambition.

## Light Mode

Use for:

- internal tools
- prototypes
- simple scripts
- static pages
- short-lived experiments
- personal utilities

Minimum required:

- short brief
- basic technical plan
- lightweight Design DNA if UI exists
- task checklist
- basic test/build verification
- lesson capture

Do not require:

- full market analysis
- compliance roadmap
- deep scalability plan
- multi-agent review

Unless the project risk triggers Standard or Full.

## Standard Mode

Use for:

- SaaS MVPs
- real user-facing apps
- authenticated products
- products storing user data
- dashboards
- integrations
- production deployments

Minimum required:

- validation brief
- competitor scan
- user/problem research
- Build Plan
- database and auth model
- security and privacy baseline
- GDPR screen if EU users or personal data
- Design DNA for UI
- PRDs
- review checklist
- monitoring and rollback
- structured lessons

## Full Mode

Use for:

- unicorn-level ambition
- enterprise customers
- multi-tenant SaaS
- paid subscriptions or marketplace payments
- regulated domains
- AI-core products
- high-scale products
- sensitive personal data
- compliance expectations
- products where trust is a core buying factor

Minimum required:

- deep validation
- market and moat analysis
- pricing and unit economics
- technical research with alternatives
- ADRs for major decisions
- full database scale model
- multi-tenancy isolation model
- threat model
- GDPR/data processing plan
- compliance roadmap
- billing edge-case spec
- reliability/SLO plan
- observability plan
- AI orchestration/evals/safety plan if applicable
- agentic opportunity audit and intelligence system plan if AI/automation is relevant
- intelligence architecture decision if RAG, structured retrieval, extraction, memory, workflow, action, or routine automation is relevant
- agent-engineering audit and skill inventory if agents, retrieval, model routing, or procedural skills are relevant
- Design DNA with references by workflow
- narrative validation
- review swarm
- launch readiness gate
- formal learning capture

## Escalation Rules

Escalate to at least Standard if:

- the project has user accounts
- the project stores user data
- the project will be deployed publicly
- the project accepts payments
- users depend on the output

Escalate to Full if:

- multi-tenant data exists
- customer data isolation matters
- EU personal data is processed at scale
- the domain is high-impact or regulated
- the product has enterprise buyers
- AI decisions affect users materially
- the product needs agents, retrieval, extraction, memory, model routing, external tool action, automation, or reusable procedural skills
- the user explicitly asks for world-class, top-ten, unicorn-level, or maximum quality

## Who Decides

Codex recommends. The user approves.

Codex should provide:

- recommended mode
- confidence
- reasons
- what the mode adds
- what is saved by choosing a lower mode
- risks of choosing a lower mode

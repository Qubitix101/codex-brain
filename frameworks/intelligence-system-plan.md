# Intelligence System Plan Framework

An Intelligence System Plan describes the high-level operating architecture for products that should become more than a normal app.

It is the bridge between the Agentic Opportunity Audit, the Intelligence Architecture Decision, the Agent Engineering Audit, the Skill Factory, the Agent OS Runtime Plan, the Agent Network and Interoperability Plan, the Agentic Zero Trust Plan, and the Capability and Access Map.

## Purpose

The plan turns an idea into a clear intelligence architecture:

- what the system knows
- what it senses
- what it creates
- what it can do
- when it asks permission
- how it evaluates quality
- how it learns
- what tooling and harnesses it will need
- what procedural skills it will need
- what intelligence substrates it needs: model-only reasoning, ADK/workflow, semantic RAG, structured retrieval, extraction, memory, action, and routines
- what production-agent disciplines must be satisfied
- what runtime kernel must supervise the agents
- what other agents or domain operating systems it should expose, consume, or delegate to
- what zero-trust controls must govern identity, credentials, policy, memory integrity, traces, and human control before access is granted

## Required Artifact

Use:

- `docs/intelligence-system-plan.md`
- `templates/shared/intelligence-system-plan.template.md`
- `catalogs/agentic-system-patterns.json`
- `frameworks/intelligence-architecture-selection.md`
- `catalogs/intelligence-architecture-catalog.json`
- `frameworks/agent-engineering-skill-stack.md`
- `frameworks/skill-factory.md`
- `frameworks/agent-os-runtime.md`
- `frameworks/agent-network-interop.md`
- `frameworks/agentic-zero-trust.md`
- `catalogs/agent-engineering-catalog.json`

## System Anatomy

A strong intelligence system has these layers.

### 1. Domain Model

The map of the user's world:

- entities
- relationships
- workflows
- desired outcomes
- constraints
- success metrics

### 2. Private Memory

The durable context that makes the system useful:

- profile
- preferences
- voice/style
- proof
- examples
- history
- assets
- decisions
- boundaries
- feedback

### 3. Sensing Layer

How the system gets information:

- manual capture
- file upload
- browser reading
- email/calendar/drive
- social platforms
- APIs and webhooks
- scheduled research
- audio/video/image inputs
- user feedback

### 4. Reasoning Layer

How the system decides:

- classification
- prioritization
- planning
- recommendation
- generation
- critique
- routing
- escalation

### 5. Skill Layer

Reusable domain abilities:

- write
- summarize
- research
- analyze
- score
- transform
- generate media
- inspect UI
- reconcile data
- prepare decisions

Skills should have inputs, outputs, quality criteria, and failure modes.

The detailed skill inventory belongs in `docs/skill-inventory.md`; this plan should identify the operating loops from which skills will be generated.

The exact intelligence substrate per loop belongs in `docs/intelligence-architecture-decision.md`.

### 6. Tool and Harness Layer

How the system acts:

- official APIs and SDKs
- official CLIs
- MCP servers and connectors
- generated CLI harnesses
- browser automation
- Computer Use
- queues and jobs
- webhooks

The detailed architecture choice belongs in `docs/intelligence-architecture-decision.md`.

The detailed access selection belongs in the Capability and Access Map.

The production readiness of those tools belongs in `docs/agent-engineering-audit.md`.

### 7. Agent OS Runtime Layer

How the system is supervised:

- scheduler/orchestrator
- memory manager
- tool manager and sandbox
- identity and delegation
- observability and traces
- guardrails and governance
- recovery and resumability
- budget and quota controls
- agent registry
- human control surface

The detailed runtime kernel belongs in `docs/agent-os-runtime-plan.md`.

### 8. Agent Network and Interoperability Layer

How the system collaborates beyond its own runtime:

- internal versus external agents and operating systems
- agent cards to expose and consume
- delegation boundaries
- task, message, artifact, and refusal contracts
- MCP/tool access versus A2A-style agent delegation decisions
- memory and context sharing
- identity, auth, trust, and tenant boundaries
- streaming progress and cross-agent traces
- versioning and compatibility

The detailed interop boundary belongs in `docs/agent-network-interop-plan.md`.

### 9. Agentic Zero Trust Layer

How the system earns trust before it receives real access:

- non-human identity and actor-chain attribution
- just-in-time credentials and vaulting
- per-action authorization and approval thresholds
- trusted tool, MCP, skill, agent-card, model, prompt, policy, and eval registry
- AI gateway/firewall and policy enforcement
- memory, retrieval, embedding, policy, preference, eval, and model integrity
- sandboxing and segmentation
- immutable traces
- human control, kill switch, throttles, and canaries
- adversarial evals and incident response

The detailed zero-trust boundary belongs in `docs/agentic-zero-trust-plan.md`.

### 10. Routine Layer

What happens repeatedly:

- daily briefing
- weekly review
- monitoring
- draft generation
- renewal/reminder
- analytics review
- cleanup
- follow-up
- learning update

Routines should define trigger, schedule, owner, inputs, output, approval, and failure behavior.

### 11. Approval and Control Layer

Where humans remain in control:

- create proposal
- approve memory update
- approve draft
- approve external write
- approve spend
- approve publish/send/delete
- rollback or revoke

### 12. Evaluation Layer

How quality is proven:

- golden examples
- scorecards
- factuality checks
- style/voice match
- safety review
- privacy checks
- regression tests
- outcome metrics

### 13. Learning Layer

How the system improves:

- user corrections
- performance data
- accepted/rejected proposals
- outcome tracking
- memory updates
- prompt/skill/routine changes
- promoted lessons

## Plan Output

Every plan should include:

- intelligence-system thesis
- target maturity now and later
- key operating loops
- memory model
- sensing inputs
- core skills
- tool/harness needs
- intelligence architecture substrate needs
- agent-engineering readiness requirements
- agent OS runtime requirements
- procedural skill inventory
- routine map
- approval map
- eval and quality plan
- learning flywheel
- risk boundaries
- first vertical slice
- future OS layers

## First Slice Rule

Do not build the full operating system first.

Pick the smallest closed loop that proves the system:

```text
capture input -> update memory or context -> generate/propose output -> review/approve -> record outcome -> learn
```

For a social content system, the first slice might be:

```text
capture proof/story -> classify into memory -> generate weekly content brief -> approve direction -> draft one LinkedIn post -> score voice/proof/platform fit
```

## Anti-Patterns

- A plan that lists tools but no operating loop.
- A plan with memory but no update policy.
- A plan with automation but no approval or rollback boundary.
- A plan with generation but no evals.
- A plan that starts with every integration instead of the first closed loop.
- A plan that cannot explain how the product gets better over time.

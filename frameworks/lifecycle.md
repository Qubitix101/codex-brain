# Lifecycle Framework

Codex Brain uses an adaptive product lifecycle. The point is not bureaucracy. The point is to prevent predictable failure.

## The Lifecycle

```text
Classify -> Validate -> Research -> Agentic Opportunity -> Intelligence Architecture -> Agent Engineering -> Agent OS Runtime -> Agent Network and Interoperability -> Agentic Zero Trust -> Capability and Access -> Plan -> Design DNA -> Decompose -> Execute -> Review -> Ship -> Learn
```

Each phase has:

- requires
- produces
- validation
- forbidden actions
- escalation conditions

## Phase 0 - Classify

Determine the project rigor mode: Light, Standard, or Full.

The classification decides the minimum artifacts required before execution.

### Produces

- `.codex-brain/classification.json`
- approved mode
- reason list

### Exit Gate

- mode is approved by the user for Standard or Full
- Light may be auto-selected only for clearly low-risk work

## Phase 1 - Validate

Answer: should this be built?

### Light

- problem statement
- target user
- expected outcome
- success criteria

### Standard

- problem statement
- target users
- alternatives
- value proposition
- risk scan
- commercial or operational rationale

### Full

- all Standard requirements
- market sizing hypothesis
- moat hypothesis
- pre-mortem
- willingness-to-pay or economic justification
- competitive wedge

## Phase 2 - Research

Answer: what must be true for this to work?

Research should not become an endless archive. It should produce decisions, risks, and requirements.

See `frameworks/research.md`.

## Phase 2.25 - Agentic Opportunity

Answer: should the idea become a normal app, AI-assisted workflow, memory-backed copilot, workflow agent, bounded autonomous operator, or domain operating system?

Codex should map:

- agentic maturity level now
- highest plausible maturity level later
- first closed intelligence loop
- memory and sensing needs
- tool/action/routine/approval/eval needs
- learning loop and moat
- overbuild and underbuild risks

See `frameworks/agentic-opportunity-audit.md` and `frameworks/intelligence-system-plan.md`.

## Phase 2.3 - Intelligence Architecture Selection

Answer: what intelligence substrate does each product loop need?

Codex should map:

- model-only reasoning vs ADK-style workflow
- semantic RAG vs deterministic structured retrieval
- LLM extraction into structured fields
- durable memory or knowledge graph
- external action and routine automation boundaries
- source-of-truth policy
- eval and trace requirements
- first vertical slice architecture

See `frameworks/intelligence-architecture-selection.md`.

## Phase 2.35 - Agent Engineering and Skill Factory

Answer: what production-agent discipline and procedural memory must exist before the product can be built safely?

Codex should map:

- seven-discipline readiness: system design, tool contracts, retrieval, reliability, security/safety, evals/observability, and product trust UX
- model/provider routing policy for multi-brain orchestration
- procedural skill inventory
- skill trust levels
- skill evals and approval gates
- skills to reuse, generate, defer, or reject
- blockers before capability/access and Build Plan

See `frameworks/agent-engineering-skill-stack.md` and `frameworks/skill-factory.md`.

## Phase 2.4 - Agent OS Runtime

Answer: what runtime kernel supervises the agents?

Codex should map:

- scheduler/orchestrator priority, queues, concurrency, and cancellation
- memory manager policy for short-term, long-term, episodic, semantic, procedural, and tenant-specific memory
- tool manager and sandbox boundaries
- identity and delegation model
- observability and trace schema
- guardrails and governance policy
- recovery and resumability model
- budget and quota limits
- agent registry and role boundaries
- human control surface
- blockers before capability/access and Build Plan

See `frameworks/agent-os-runtime.md`.

## Phase 2.45 - Agent Network and Interoperability

Answer: should this product collaborate with, expose, or consume other agents or domain operating systems?

Codex should map:

- internal versus external agents and operating systems
- agent cards to expose and consume
- collaboration topology
- delegation boundaries
- task, message, artifact, and refusal contracts
- MCP/tool access versus A2A-style agent delegation versus API/internal/event boundaries
- memory and context-sharing policy
- identity, auth, trust, and tenant boundaries
- streaming/progress model for long-running delegated work
- cross-agent observability and correlation IDs
- failure, retry, timeout, fallback, and escalation behavior
- versioning, compatibility, and reusable capability opportunities
- blockers before capability/access and Build Plan

See `frameworks/agent-network-interop.md`.

## Phase 2.47 - Agentic Zero Trust

Answer: how does this agentic system earn trust continuously before it receives real access?

Codex should map:

- non-human identities and actor-chain attribution
- just-in-time credentials, vaulting, rotation, and revocation
- per-action authorization and intent verification
- tool, MCP, skill, agent-card, model, prompt, policy, and eval registry trust
- AI gateway/firewall and policy enforcement boundaries
- memory, retrieval, embedding, policy, preference, eval, and model integrity
- sandboxing, segmentation, egress, tenant, browser, desktop, and production mutation boundaries
- immutable observability and forensic traces
- human control, kill switch, throttles, canaries, and rollback
- adversarial evals for prompt injection, tool poisoning, credential misuse, exfiltration, memory poisoning, excessive agency, A2A spoofing, and cost runaway
- incident response and blast-radius reduction
- blockers before capability/access and Build Plan

See `frameworks/agentic-zero-trust.md`.

## Phase 2.5 - Capability and Access

Answer: what external powers, access paths, credentials, and tool surfaces are required before planning and execution?

Codex should map the difference between:

- product runtime integrations
- Codex/agent implementation tools
- setup/testing tools
- mocks and live verification

See `frameworks/capability-access-readiness.md` and `frameworks/tool-surface-routing.md`.

## Phase 3 - Plan

Create the Build Plan: the source of truth for product, architecture, data, security, privacy, integrations, design constraints, delivery, and verification.

See `frameworks/build-plan.md`.

## Phase 3.5 - Design DNA

For user-facing UI, capture aesthetic direction before frontend implementation.

See `frameworks/design-dna.md`.

## Phase 4 - Decompose

Break the Build Plan into PRDs and atomic tasks.

See `frameworks/decomposition.md`.

## Phase 5 - Execute

Implement one task at a time.

See `frameworks/execution-loop.md`.

## Phase 6 - Review

Review product correctness, implementation quality, security, privacy, accessibility, performance, and architecture.

See `frameworks/review-and-ship.md`.

## Phase 7 - Ship

Deploy with monitoring, rollback, smoke tests, and launch approval.

## Phase 8 - Learn

Capture structured lessons and decide which should be promoted back into Codex Brain.

See `frameworks/learning-loop.md`.

## The Critical Rule

If the current phase gate is not satisfied, Codex must not skip ahead. It should produce the missing artifact.

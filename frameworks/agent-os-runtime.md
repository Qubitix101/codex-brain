# Agent OS Runtime Framework

Agentic products need a runtime operating model, not only a model, prompt, RAG pipeline, or tool list.

The Agent OS Runtime Plan defines the kernel that supervises agents: scheduling, memory, tools, identity, observability, guardrails, recovery, budgets, and agent roles.

## Purpose

Many AI products fail after the demo because no one owns the runtime rules:

- which agent or task runs first
- what memory is readable, writable, reviewable, or deleteable
- which tools are available and sandboxed
- which user or service identity authorizes an action
- what gets logged and traced
- what policies block unsafe behavior
- how jobs recover after failure
- how costs, rate limits, and quotas are enforced
- which agents exist and what they are allowed to do

The Agent OS Runtime gate prevents "brilliant but unmanaged" agents from reaching Build Plan approval.

## Gate 2.4

Agent OS Runtime sits after Agent Engineering and before Agent Network and Interoperability, Agentic Zero Trust, then Capability and Access.

```text
Classify -> Validate -> Research -> Agentic Opportunity -> Intelligence Architecture -> Agent Engineering -> Agent OS Runtime -> Agent Network and Interoperability -> Agentic Zero Trust -> Capability and Access -> Plan -> Design DNA -> Decompose -> Execute -> Review -> Ship -> Learn
```

Required for L3+ agentic products and any product with multi-agent coordination, autonomous routines, external actions, customer-specific memory, tool sandboxing, delegated identity, or public/paid/destructive writes.

Required artifact:

- `docs/agent-os-runtime-plan.md`

Use:

- `templates/shared/agent-os-runtime-plan.template.md`
- `catalogs/agent-os-runtime-catalog.json`
- `frameworks/agent-engineering-skill-stack.md`
- `frameworks/agent-network-interop.md`
- `frameworks/agentic-zero-trust.md`
- `frameworks/capability-access-readiness.md`

Optional helper:

```bash
npm run plan-agent-os-runtime -- --brief "[what we are building]" --mode full --markdown
```

This gate defines one product's internal runtime kernel. If the product must collaborate with another autonomous agent, remote specialist, vertical operating system, or externally consumed agent service, continue into `frameworks/agent-network-interop.md`, then `frameworks/agentic-zero-trust.md`, before capability/access mapping.

## Kernel Components

### 1. Scheduler and Orchestrator

Defines what runs now, later, in parallel, or never.

Map:

- foreground versus background work
- priority rules
- queues and job ownership
- concurrency limits
- escalation triggers
- cancellation and pause rules

Block when live user work can be delayed by background jobs, routines can overlap unsafely, or no priority model exists.

### 2. Memory Manager

Defines how short-term, long-term, episodic, semantic, procedural, and tenant-specific memory works.

Map:

- per-loop memory fit: working, semantic, procedural, episodic, or not needed
- memory stores
- read/write authority
- approval policy for memory updates
- provenance and confidence
- conflict handling
- delete/export/retention rules

Use `frameworks/memory-architecture.md` when memory is central to the product. Create `docs/memory-architecture-decision.md` from `templates/shared/memory-architecture-decision.template.md` when durable, customer-specific, regulated, cross-agent, or cross-session memory needs its own artifact.

Block when memory writes are hidden, no owner exists, tenant/user boundaries are unclear, or a storage choice is made before the memory type and owner are justified.

### 3. Tool Manager and Sandbox

Defines the tool registry, execution boundaries, and sandbox model.

Map:

- tool classes
- read/write/destructive/public/paid classification
- sandbox scope
- file/network restrictions
- dry-run or preview mode
- test fixtures
- approval requirements

Block when agents can run code, mutate external systems, or access broad files/secrets without a sandbox and approval policy.

### 4. Identity and Delegation Manager

Defines who the agent acts for and which credentials are used.

Map:

- user identity
- organization or tenant identity
- service accounts
- short-lived tokens
- scopes
- impersonation rules
- audit attribution

Block when actions cannot be attributed to a user, agent, and authorization event.

### 5. Observability and Trace Layer

Defines the security camera system for agent behavior.

Map:

- prompt and context traces
- retrieved-context traces
- tool-call traces
- model route traces
- approval traces
- memory-change traces
- cost, latency, and failure metrics

Block when bad outcomes cannot be reproduced or explained.

### 6. Guardrails and Governance

Defines policy enforcement.

Map:

- input guardrails
- output guardrails
- prompt-injection controls
- policy checks
- human-in-the-loop gates
- escalation rules
- public/paid/destructive action rules

Block when policies are only written as prompts and not enforced by runtime boundaries.

### 7. Recovery and Resumability

Defines what happens when an agent, job, model, provider, or tool fails.

Map:

- durable job state
- idempotency keys
- retry/backoff limits
- duplicate-action prevention
- partial completion handling
- rollback or compensating actions
- resume points

Block when routines or external writes can be duplicated after retry or crash.

### 8. Budget and Quota Manager

Defines cost and usage controls.

Map:

- model budgets
- provider quotas
- rate limits
- token/cost ceilings
- routine budgets
- per-user or per-tenant limits
- spend approval thresholds

Block when autonomous or recurring work has no budget ceiling.

### 9. Agent Registry and Role Model

Defines which agents exist and their boundaries.

Map:

- agent roles
- allowed tools
- allowed memory
- allowed models
- allowed actions
- escalation targets
- owner and review cadence

Block when agents have overlapping authority with no owner or role boundary.

### 10. Human Control Surface

Defines how users inspect, approve, correct, pause, revoke, and escalate.

Map:

- approval queues
- pending actions
- memory review
- trace viewer
- stop/pause controls
- rollback or revoke controls
- human escalation path

Block when important actions happen invisibly or the user cannot regain control.

## Required Output

The runtime plan must produce:

- runtime thesis
- kernel component map
- scheduler and queue model
- memory manager policy
- tool registry and sandbox policy
- identity/delegation model
- observability and trace schema
- guardrails and governance policy
- recovery and resumability plan
- budget and quota plan
- agent registry
- human control surface
- P0 runtime blockers
- first vertical slice runtime scope
- deferred runtime layers

## Gate Decision

Approve the gate only when:

- every active agent loop has a runtime owner
- every memory-backed loop has a per-loop memory fit decision
- memory reads and writes are governed
- tool actions are sandboxed and classified
- external actions have preview, approval, audit, and recovery rules
- identity and delegation are attributable
- traces can reconstruct failures
- autonomous routines have budgets and recovery boundaries
- users can inspect and control important behavior

## Anti-Patterns

- Treating a workflow graph as an operating system.
- Adding memory without a memory manager.
- Choosing a vector store, graph, or transcript archive before deciding whether the loop needs semantic, procedural, episodic, or only working memory.
- Adding tools without a sandbox or approval policy.
- Calling logs observability when tool inputs, retrieved context, and approvals are missing.
- Allowing agents to act on behalf of users without identity attribution.
- Running recurring jobs without idempotency and budget limits.
- Building a multi-agent product without an agent registry.

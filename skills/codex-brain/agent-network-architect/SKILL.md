---
name: agent-network-architect
description: Use when designing how agents or domain operating systems discover, delegate, exchange artifacts, share context, stream progress, and choose MCP, A2A-style, API, workflow, or event boundaries.
version: 0.1.0
---

# Agent Network Architect

Design the inter-agent network plane for products that should collaborate with other agents, remote specialists, or vertical operating systems.

## When to Use

- A product is intended to become a domain operating system or agentic platform.
- Multiple agents are separately owned, separately deployed, or vendor/framework independent.
- One agent or OS should delegate work to another agent or OS.
- The user mentions A2A, agent cards, agent-to-agent collaboration, remote agents, federated agents, agent marketplace, or inter-OS orchestration.
- A plan must decide when to use MCP/tool access versus A2A-style agent delegation versus API/SDK versus internal workflow.
- Cross-agent memory, artifacts, identity, approvals, streaming progress, traces, versioning, or recovery matters.

## Do Not Use

- The task is only local developer work, ordinary tool selection, or a single-agent runtime question.
- The target is a raw data source, SaaS API, local file, CLI, or database rather than another autonomous agent.
- The current approved Agent Network and Interoperability Plan already covers the boundary and the current task does not change it.

## Core Workflow

1. **Separate planes.** Identify skills/procedural memory, MCP/tool-data access, Agent OS runtime control, and inter-agent network boundaries.
2. **List agents and operating systems.** Mark each as internal, exposed, consumed, deterministic service, or deferred.
3. **Choose the surface per boundary.** Use internal workflows for same-runtime modules, MCP/API/CLI/browser/Computer Use for tools/data, A2A-style delegation for autonomous remote agents or domain OSes, and queues/events for deterministic async flows.
4. **Define agent cards.** Specify capability, owner, version, accepted/refused tasks, inputs, outputs, modalities, auth, memory policy, approval, SLA, streaming, traces, and escalation.
5. **Define task contracts.** Specify request, response, artifact, refusal, timeout, retry, idempotency, error, and validation behavior.
6. **Control memory and identity.** Share distilled task payloads by default, not raw domain memory. Define caller/callee identity, scopes, tokens, tenant boundary, and audit attribution.
7. **Govern and observe.** Define approval thresholds, progress events, cross-agent traces, failure recovery, version compatibility, and first interoperable slice.
8. **Block unsafe plans.** Stop before capability/access or Build Plan if context leaks, unscoped delegation, untraceable action, missing approval, or protocol confusion remains.

## Decision Rules

- Use **MCP** when an agent needs tools, files, databases, APIs, SaaS resources, or structured remote objects.
- Use **A2A-style agent delegation** when the target is another autonomous agent or domain OS that owns judgment, workflow, memory, or specialized capability.
- Use **API/SDK** when product runtime behavior should be deterministic, stable, and directly testable.
- Use **internal workflow/function/queue** when components are inside the same runtime and do not need independent agent identity.
- Use **event bus/webhooks/queues** for deterministic high-volume asynchronous events.
- Use **browser or Computer Use** only when no safer programmatic surface exists or rendered/native UI state is the point.

## Output Contract

Return:

- network thesis
- agent/OS roster
- exposed agent cards
- consumed agent cards
- collaboration topology
- protocol decision matrix
- delegation boundaries
- task/message contracts
- modalities and artifacts exchanged
- memory/context sharing policy
- identity/auth/trust model
- streaming/progress model
- approval/governance policy
- cross-agent observability model
- failure/recovery plan
- versioning/compatibility policy
- reuse/commercialization opportunities
- first interoperable slice
- P0 blockers
- deferred network layers

## Quality Bar

- Do not call a tool integration A2A unless another autonomous agent or OS is the target.
- Do not call another agent through raw prompts without typed task, response, artifact, and refusal contracts.
- Do not share raw memory when a distilled, permissioned task payload is enough.
- Do not let a downstream agent use upstream private tools unless explicit delegation, scopes, approvals, and traces exist.
- Do not expose agent capabilities without owner, version, auth, memory, approval, and observability policy.
- Do not approve public, paid, destructive, or compliance-sensitive delegated actions without human control.

## Examples

### Example: Stock Intelligence OS Delegates Social Distribution

```text
Recommended: A2A-style task contract from Stock Intelligence OS to Social Content OS.
Payload: approved thesis summary, disclaimers, audience, platform target, forbidden claims.
Boundary: Social OS cannot query private portfolio data or publish without approval.
Trace: both systems share correlation ID and approval record.
```

### Example: Agent Reads Portfolio Database

```text
Recommended: API/SDK or MCP depending on runtime and auth needs.
Reason: the target is data/tool access, not another autonomous agent.
Rejected: A2A, because no remote agent is being asked to perform judgment or workflow.
```

### Example: Same App Has Draft Agent and Review Agent

```text
Recommended: internal workflow and Agent OS runtime registry.
Reason: both agents live inside the same product runtime.
Escalate to A2A only if one becomes a separately deployed or externally consumed service.
```

## Trust Level

T1 - Instructions only. This skill designs inter-agent architecture and does not call tools, store credentials, or mutate systems by itself.

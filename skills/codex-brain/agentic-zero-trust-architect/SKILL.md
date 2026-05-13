---
name: agentic-zero-trust-architect
description: Use when securing AI agents that call tools, use MCP, delegate to agents, write memory, handle sensitive data, publish, spend, delete, or run autonomous routines.
version: 0.1.0
---

# Agentic Zero Trust Architect

Design the zero-trust control layer for agentic products. Use this skill when an AI system needs verified identity, scoped credentials, policy enforcement, sandboxing, traces, human controls, and adversarial evaluation before it can safely act.

## When to Use

- Agents can call tools, APIs, CLIs, MCP servers, connectors, browser automation, or Computer Use.
- Agents can publish, send, delete, spend, mutate production, contact customers, or perform compliance-sensitive work.
- Agents write or retrieve customer-specific memory, RAG context, embeddings, policies, preferences, or eval data.
- The product uses sub-agents, remote agents, agent cards, A2A-style delegation, or multi-agent orchestration.
- A plan needs non-human identity, JIT credentials, vaulting, policy enforcement, kill switches, throttles, canaries, or incident response.
- The user asks to harden agents against prompt injection, tool poisoning, credential theft, memory poisoning, excessive agency, exfiltration, or cyberattackers.

## Do Not Use

- The task is a simple model-only generation feature with no tools, no memory, no external action, and no sensitive data.
- A current approved Agentic Zero Trust Plan already covers the same controls and the current task does not change the risk boundary.
- The task is ordinary web-app security with no agentic behavior; use security review instead.

## Core Workflow

1. **Map power and assets.** List agents, sub-agents, routines, tools, MCP servers, skills, models, memories, retrieval sources, credentials, external actions, and sensitive assets.
2. **Draw trust boundaries.** Mark where untrusted user input, retrieved content, model output, memory writes, tool calls, delegated agent payloads, credentials, and external egress cross boundaries.
3. **Assign non-human identities.** Give every agent, sub-agent, routine, service account, and tool runner a unique identity with actor-chain attribution.
4. **Broker credentials just in time.** Replace static or broad credentials with vault/broker checkout, least scope, short expiry, rotation, revocation, and secret scanning.
5. **Authorize every action.** Check user intent, task scope, agent role, tenant, data class, policy, credential scope, risk class, and approval threshold before sensitive actions.
6. **Register trusted capabilities.** Vet tools, MCP servers, connectors, CLIs, skills, generated harnesses, agent cards, models, prompts, policies, and eval sets before use.
7. **Enforce policy outside the model.** Add input controls, retrieved-context labeling, tool argument validation, output DLP, egress allowlists, and refusal behavior.
8. **Protect memory and retrieval.** Require provenance, trust tiers, quarantine, correction/delete/export propagation, index rebuilds, and poisoning tests.
9. **Sandbox execution.** Limit file, network, database, tenant, browser, desktop, subprocess, and production-write access per agent or tool runner.
10. **Make traces forensic.** Log prompt/context/retrieval, memory, model route, policy decision, credential checkout, tool call, delegation, approval, failure, and external action events with tamper controls for high-risk flows.
11. **Add human control.** Define approval queues, kill switches, pause/stop, revoke, tool disable, throttles, spend limits, canaries, rollback, and incident response.
12. **Attack the design.** Run adversarial scenarios for direct and indirect prompt injection, tool poisoning, MCP compromise, skill supply chain, credential misuse, exfiltration, memory poisoning, data/model poisoning, excessive agency, sub-agent escalation, A2A spoofing, and cost runaway.

## Output Contract

Return:

- zero-trust thesis
- asset and actor-chain inventory
- trust boundaries
- threat model
- non-human identity model
- JIT credential and vault plan
- per-action authorization matrix
- trusted registry plan
- AI gateway/firewall and policy enforcement plan
- memory/retrieval/model integrity plan
- sandbox and segmentation plan
- immutable trace plan
- human control, kill switch, throttle, and canary plan
- continuous verification plan
- adversarial eval suite
- incident response and blast-radius plan
- first secure autonomous slice
- P0 blockers

## Quality Bar

- Do not allow agentic action without user, tenant, agent, credential, policy, and approval attribution.
- Do not allow static, broad, embedded, or unrevocable credentials.
- Do not let model output directly drive privileged tool calls without validation and policy enforcement.
- Do not trust retrieved context, memory, policies, preferences, skills, MCP servers, agent cards, or model artifacts without provenance and review.
- Do not approve public, paid, destructive, externally visible, or compliance-sensitive actions without approval thresholds, traces, throttles, and recovery.
- Do not ship launch-critical agentic flows without adversarial evals and an incident response path.

## Examples

### Example: Social Content Agent

```text
Risk: prompt injection in source material tricks the agent into publishing private or harmful content.
Controls: least-context retrieval, output policy check, platform token issued only after approval, publishing throttle, trace, kill switch.
First secure slice: draft-only workflow with no platform write until human approval and token checkout exist.
```

### Example: Refund Agent

```text
Risk: malicious support ticket asks the agent to ignore policy and issue a high refund.
Controls: ticket content labeled untrusted, policy decision outside model, refund threshold, JIT scoped credential, idempotency, approval event, trace.
First secure slice: propose refund only; execution remains approval-gated.
```

### Example: Multi-Agent Research OS

```text
Risk: remote specialist agent returns poisoned analysis or asks for private memory.
Controls: verified agent card, least-context task payload, response validation, no upstream tool access, correlation ID, refusal on scope expansion.
First secure slice: read-only delegated summary with no memory write until provenance and review pass.
```

## Trust Level

T1 - Instructions only. This skill designs security architecture and does not call tools, store credentials, mutate systems, or execute scans by itself.

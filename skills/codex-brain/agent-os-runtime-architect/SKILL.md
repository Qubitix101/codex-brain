---
name: agent-os-runtime-architect
description: Use when designing the runtime operating system for AI agents, including scheduling, memory management, tool sandboxing, identity, observability, governance, recovery, budgets, and multi-agent coordination.
version: 0.1.0
---

# Agent OS Runtime Architect

Design the control layer that supervises production agents. Use this skill when an AI product needs more than prompts, tools, or RAG: it needs a runtime kernel.

## When to Use

- A product is L3+ agentic, memory-backed, tool-using, multi-agent, workflow-heavy, or automation-heavy.
- Agents can run routines, call tools, write external systems, publish, send, delete, spend, or act for users.
- A plan needs the "principal" layer: scheduler, memory manager, tool sandbox, identity, observability, guardrails, recovery, budgets, and agent registry.
- The user asks how to make an agentic product reliable, governed, traceable, or enterprise-grade.

## Do Not Use

- The task is a simple model-only generation feature.
- The system has no durable memory, external action, routine automation, delegated identity, or tool execution.
- A current Agent OS Runtime Plan already exists and the current task does not affect runtime behavior.

## Core Workflow

1. **List the agent loops.** Name every agent, routine, memory write, tool call, external action, and human approval path.
2. **Map the kernel.** Decide which runtime components are required now, deferred, or not applicable.
3. **Define runtime contracts.** For each required component, define owner, boundary, state, approvals, traces, failure behavior, and first-slice scope.
4. **Find P0 blockers.** Block plans with hidden memory writes, unsandboxed tools, unattributed actions, missing approval, missing traces, duplicate-prone retries, or unchecked budgets.
5. **Scope the first slice.** Do not build the whole operating system first. Build the smallest governed loop that proves the runtime.
6. **Produce the runtime plan.** Make the output concrete enough to drive agent network/interoperability, Agentic Zero Trust, capability/access mapping, and Build Plan approval.

## Kernel Components

- **Scheduler and orchestrator:** priority, queue, concurrency, background jobs, cancellation, escalation.
- **Memory manager:** short-term, long-term, episodic, semantic, procedural, tenant-specific memory, provenance, correction, delete/export.
- **Tool manager and sandbox:** tool registry, read/write/destructive/public/paid classification, file/network boundaries, dry runs, fixtures.
- **Identity and delegation:** user, tenant, service account, scopes, token expiry, impersonation, audit attribution.
- **Observability and trace layer:** prompts, context, retrieval, tool calls, approvals, memory changes, external actions, cost, latency, failures.
- **Guardrails and governance:** input/output guardrails, prompt-injection controls, policy checks, human-in-the-loop thresholds, exceptions.
- **Recovery and resumability:** job state, idempotency, duplicate prevention, retries, rollback, compensation, resume points.
- **Budget and quota manager:** model cost, API quota, rate limits, media generation spend, routine budgets, per-user/tenant caps.
- **Agent registry and role model:** agents, owners, allowed models, allowed tools, memory scope, action scope, escalation path.
- **Human control surface:** approval queue, pending actions, memory review, trace view, pause/stop, rollback/revoke, escalation.

## Output Contract

Return:

- runtime thesis
- agent roster
- required kernel components
- scheduler model
- memory manager policy
- tool sandbox policy
- identity/delegation model
- trace schema
- guardrails/governance policy
- recovery/resumability plan
- budget/quota plan
- human control surface
- P0 blockers
- first runtime slice
- deferred runtime layers

## Quality Bar

- Do not call workflow orchestration an Agent OS unless memory, identity, tools, traces, governance, and recovery are also governed.
- Do not allow public, paid, destructive, or external writes without preview, approval, audit, and recovery rules.
- Do not allow memory updates without provenance, review, conflict handling, and delete/export policy.
- Do not allow autonomous routines without budget, idempotency, trace, and failure recovery.
- Do not approve multi-agent systems without a role registry.
- Do not model remote autonomous agents or separate domain operating systems only as tools; route those boundaries to an Agent Network and Interoperability Plan.

## Examples

### Example: Social Content OS

```text
Required runtime: scheduler, memory manager, tool sandbox, identity, traces, governance, recovery, budgets, human approval queue.
First slice: idea capture -> voice/proof memory retrieval -> draft -> score -> approval queue -> outcome trace.
Blocker: publishing API cannot be connected until approval, audit, rollback note, and platform scopes are defined.
```

### Example: Customer Refund Agent

```text
Required runtime: identity, policy guardrails, tool sandbox, trace layer, approval threshold, recovery.
Rule: refunds under threshold may be proposed or executed only inside policy; higher-value refunds require human approval.
Blocker: action attribution and refund idempotency missing.
```

## Trust Level

T1 - Instructions only. This skill designs runtime architecture and does not call tools, store credentials, or mutate systems by itself.

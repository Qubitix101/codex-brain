---
name: memory-architecture-planner
description: Use when deciding which agent loops need working, semantic, procedural, or episodic memory, including storage, ownership, provenance, review, correction, retention, and forgetting policy.
version: 0.1.0
---

# Memory Architecture Planner

Design agent memory per loop before choosing storage. Use this skill when a product, workflow, or agent needs persistent knowledge, reusable procedures, cross-session learning, customer memory, retrieval, or a memory-backed operating model.

## When to Use

- The user asks what an agent should remember or forget.
- A product is memory-backed, retrieval-heavy, skill-driven, routine-driven, multi-agent, or expected to improve across sessions.
- A team is considering Markdown memory, vector search, knowledge graphs, transcripts, session records, or skills.
- A loop may write user, tenant, project, policy, preference, proof, or outcome memory.
- The plan needs memory provenance, review, correction, retention, export, or deletion rules.

## Do Not Use

- The task is a one-off transformation where all relevant context is already provided.
- The system has no durable memory, retrieval, reusable procedure, or cross-session learning.
- A current memory architecture decision already exists and the current change does not affect memory behavior.

## Core Workflow

1. **List the loops.** Name each user request, routine, agent handoff, retrieval path, memory write, and learning update.
2. **Classify memory fit.** For each loop, decide whether it needs working, semantic, procedural, episodic, or no durable memory.
3. **Choose the smallest storage.** Use prompt/context, Markdown docs, structured records, retrieval index, graph, skill folder, session record, or distillate based on the memory type.
4. **Define ownership.** Specify read access, write access, review, approval, provenance, confidence, conflict handling, and stale-memory correction.
5. **Define forgetting.** Specify retention, delete, export, rollback, and refresh rules.
6. **Set evidence.** Define the eval, trace, or review proof that memory improved the loop instead of adding noise.
7. **Produce the decision.** Embed the matrix in the Agent OS runtime plan or create a standalone memory architecture decision when memory is central.

## Memory Types

- **Working memory:** current context, loaded files, scratchpad, active task state.
- **Semantic memory:** stable facts, policies, conventions, source-of-truth knowledge, structured records, retrieval indexes.
- **Procedural memory:** skills, workflows, scripts, templates, checklists, repeatable methods.
- **Episodic memory:** distilled past decisions, failures, outcomes, lessons, session records, postmortems.

## Output Contract

Return:

- memory thesis
- per-loop memory-fit matrix
- memory stores and sources of truth
- storage decisions and rejected alternatives
- read/write/review/approval policy
- provenance, confidence, and conflict policy
- stale-memory correction and forgetting policy
- private, tenant-bound, and cross-agent sharing rules
- memory poisoning and rollback controls
- evals and evidence
- handoff requirements for Agent Engineering, Agent OS Runtime, Agent Network, Agentic Zero Trust, Capability Access, and Build Plan

## Quality Bar

- Do not choose vector search, graph storage, or transcript archives before memory type and owner are clear.
- Do not allow hidden durable memory writes.
- Do not store raw transcripts when a distilled episodic lesson is enough.
- Do not put customer-specific private memory inside reusable procedural skills.
- Do not share raw private memory across agents when a distilled, permissioned task payload is enough.
- Do not approve memory-backed Build Plans without correction, delete/export, provenance, and review rules.

## Examples

### Example: Coding Agent

```text
Working: current task, files, tests.
Semantic: project architecture, coding conventions, source-of-truth docs.
Procedural: code review skill, test workflow, release checklist.
Episodic: distilled prior bugs, failed checks, accepted architecture decisions.
Blocker: no hidden memory writes and no transcript archive without distillation.
```

### Example: Customer Support Agent

```text
Working: current ticket and account state.
Semantic: policy docs and exact customer records.
Procedural: refund, password reset, and escalation workflows.
Episodic: prior case outcomes only when reviewed and tenant-bound.
Blocker: customer memory needs retention, correction, export, and deletion policy.
```

## Trust Level

T1 - Instructions only. This skill designs memory architecture and does not read private memory, call tools, store credentials, or mutate systems by itself.


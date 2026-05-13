---
name: agent-engineering-reviewer
description: Use when auditing whether an AI product is production-ready across system design, tool contracts, retrieval, reliability, security, observability, evaluation, and product trust UX.
version: 0.1.0
---

# Agent Engineering Reviewer

Audit agentic products as engineered systems, not prompt collections. Use this skill before implementation, before launch, or when an agent behaves impressively in demos but lacks production discipline.

## When to Use

- The product includes agents, tools, retrieval, model routing, workflows, autonomous routines, or external actions.
- A plan needs the seven production-agent disciplines from the agent-engineering framework.
- The user asks whether an AI system is a real agentic product or a prompt wrapper.
- A PRD, Build Plan, or architecture doc needs readiness review.

## Do Not Use

- The feature has no AI, retrieval, tool use, memory, or automation.
- The user only wants copywriting, model output, or a small local code fix.
- A formal agent-engineering audit already exists and the current change does not affect it.

## Core Workflow

1. **Identify the agent loops.** Name where the system reasons, retrieves, remembers, calls tools, asks approval, acts, or learns.
2. **Audit the seven disciplines.** Check system design, tool contracts, retrieval, reliability, security and safety, evals and observability, and product trust UX.
3. **Find blockers.** Separate launch blockers from improvements. Block on missing boundaries, missing evals, unsafe writes, hidden memory, or untraceable actions.
4. **Map remediation.** Convert each blocker into a concrete artifact, test, schema, approval gate, trace, or UX requirement.
5. **Recommend build order.** Prioritize foundations that reduce production risk before high-autonomy features.

## Seven Disciplines

### 1. System Design

Check model boundaries, database and memory ownership, retrieval path, tool execution path, queues, jobs, routines, approval surfaces, logs, and failure boundaries.

Block when there is no system diagram for a multi-tool agent, no state owner, or no coordination model.

### 2. Tool and Contract Design

Check strict input schemas, required fields, examples, output contracts, id formats, idempotency, permission scopes, validation errors, and human-readable failures.

Block when tools are prose-only, write tools lack approvals, or downstream outputs are undefined.

### 3. Retrieval Engineering

Check source inventory, chunking, embeddings, metadata filters, reranking, citation rules, freshness, deletion/export policy, and relevance evals.

Block when RAG is assumed without corpus design, source of truth, or relevance metric.

### 4. Reliability Engineering

Check timeouts, retries with backoff, fallback paths, circuit breakers, job state, resumability, duplicate prevention, rollback, rate limits, and cost limits.

Block when retries are unbounded, tool calls can hang, or external writes cannot be rolled back or compensated.

### 5. Security and Safety

Check prompt-injection boundaries, input validation, output filtering, least privilege, tenant isolation, secret handling, approval gates, policy checks, audit logs, and destructive/public/paid action controls.

Block when the agent can access more data than needed or act publicly without review.

### 6. Evaluation and Observability

Check trace timelines, tool-call logs, retrieved-context logs, model routing logs, golden examples, regression tests, success rate, latency, cost per task, quality metrics, and drift detection.

Block when failures cannot be reproduced or core workflows lack evals.

### 7. Product Trust UX

Check confidence states, evidence trails, memory visibility, pending approvals, escalation, graceful errors, undo/rollback affordances, capability boundaries, and onboarding expectations.

Block when users cannot inspect why the agent answered or acted.

## Output Contract

Return:

- agent loops reviewed
- score by discipline: green, yellow, or red
- launch blockers
- important improvements
- required artifacts
- required tests and evals
- approval gates
- recommended next implementation slice

## Examples

### Example: Content Agent

```text
Finding: Red on product trust UX.
Reason: agent can publish drafts without a review queue.
Fix: add draft preview, publish approval, audit log, and rollback note before connecting platform APIs.
```

### Example: Support Copilot

```text
Finding: Red on retrieval engineering.
Reason: no source inventory, freshness rule, or citation eval.
Fix: define corpus, chunking, metadata filters, reranking, and golden support questions before production rollout.
```

## Trust Level

T1 - Instructions only. This skill performs review and planning. It does not execute code, call external tools, or mutate systems by itself.

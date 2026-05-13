---
name: agentic-opportunity-auditor
description: Use when evaluating whether an idea should become a normal app, AI generation tool, memory-backed copilot, workflow agent, bounded operator, or domain operating system.
version: 0.1.0
---

# Agentic Opportunity Auditor

Decide whether the real opportunity is a normal app, a light AI feature, or a domain-specific agentic operating system.

## When to Use

- The user brings a product idea and wants to know how powerful or agentic it could become.
- A product risks becoming a thin ChatGPT wrapper.
- A project needs to decide how much memory, tooling, automation, approval, and learning it deserves.
- The user asks for an in-depth audit of what could be agentic.

## Do Not Use

- The task is a small implementation request with an already approved product shape.
- The product clearly has no AI, automation, memory, or recurring workflow.

## Maturity Levels

- **L0 - Normal App:** deterministic CRUD or workflow product, no AI core loop.
- **L1 - AI Generation:** user asks, model generates, user copies or edits.
- **L2 - AI Plus Tools:** model calls tools, but user still drives each task.
- **L3 - Memory-Backed Copilot:** system remembers private context and improves suggestions.
- **L4 - Workflow Agent With Approvals:** system runs multi-step workflows and asks at gates.
- **L5 - Bounded Autonomous Operator:** recurring or monitored work runs within policy, budget, and audit boundaries.
- **L6 - Domain Operating System:** memory, tools, skills, routines, permissions, evals, analytics, and learning become the user's operating layer for a domain.

## Core Workflow

1. **Clarify the user job.** Is the user buying a result, workflow, assistant, or operating system?
2. **Find the recurring loop.** Agentic value rises when the job repeats and improves with memory.
3. **Map senses.** What must the system read, watch, ingest, hear, see, or monitor?
4. **Map memory.** What private context compounds: preferences, voice, examples, proof, outcomes, decisions, entities, relationships, history?
5. **Map reasoning.** What decisions can the system make, recommend, or escalate?
6. **Map creation.** What artifacts are produced: text, image, video, voice, docs, slides, code, data, tickets, reports, or campaigns?
7. **Map action.** What external systems should it update, publish to, send through, schedule in, or query?
8. **Map routines.** What should run daily, weekly, monthly, event-triggered, or continuously?
9. **Define control.** Set approvals, review queues, stop buttons, rollback, and escalation.
10. **Select build sequence.** Start with the smallest slice that proves compounding intelligence.

## Output Contract

Return:

- recommended maturity level now
- highest plausible maturity level later
- normal app version
- AI-assisted version
- agentic OS version
- required memory
- required tools and access surfaces
- required skills
- recurring routines
- approval gates
- evals and quality checks
- automation boundaries
- moat and learning loop
- recommended first slice
- deferred layers

## Examples

### Example: Social Media Product

```text
Weak version: prompt box that writes posts.
Strong version: authority operating system with voice memory, proof bank, platform tools, weekly briefs, approval queue, scheduling, analytics, and performance learning.
Recommended: start at L3, design toward L5 or L6.
```

### Example: Invoice Tracker

```text
Normal app: upload invoices and show statuses.
Agentic version: monitors inbox, extracts invoice fields, routes approvals, reminds owners, pays only after policy checks.
Recommended: L2 or L4 depending on payment authority.
```

## Trust Level

T1 - Instructions only. This skill audits opportunity and does not call tools or mutate systems.

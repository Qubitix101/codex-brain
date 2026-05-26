# Memory Architecture Framework

Agent memory is not one feature. It is four different responsibilities that must be selected per loop.

Use this framework when a product, workflow, or agent is AI-core, memory-backed, retrieval-heavy, skill-driven, routine-driven, multi-agent, or expected to improve across sessions.

## Purpose

The memory decision prevents two common failures:

- adding a vector store when the loop only needed a clear procedure
- giving an agent hidden long-term memory without ownership, provenance, correction, or deletion rules

The output should be short enough to sit inside `docs/agent-os-runtime-plan.md`. Create a separate `docs/memory-architecture-decision.md` only when durable, customer-specific, regulated, cross-agent, or cross-session memory is central to the product.

## The Four Memory Types

| Memory Type | Agent Meaning | Codex Brain Surface | Best For | Avoid When |
| --- | --- | --- | --- | --- |
| Working memory | Current context, loaded files, active task state, scratchpad | current prompt, active files, `.codex-brain/memory/active-context.md` | immediate reasoning and execution | the fact must survive session close without distillation |
| Semantic memory | Stable facts, policies, conventions, source-of-truth knowledge | docs, project context, knowledge base, structured records, retrieval indexes | product rules, domain facts, user-visible truth | facts change often and no freshness/provenance policy exists |
| Procedural memory | How to perform repeatable work | skills, workflows, scripts, checklists, templates | repeatable operating loops, reviews, generation, QA, handoffs | the process is not yet stable enough to encode |
| Episodic memory | Distilled past decisions, failures, outcomes, and lessons | session records, distillates, lessons, postmortems | learning across projects and avoiding repeated mistakes | raw transcripts would create noise, privacy risk, or stale assumptions |

## Per-Loop Memory Fit

For each product or agent loop, answer:

1. What must be visible in working memory right now?
2. Which semantic facts must be retrieved or loaded?
3. Which procedures should be skills, workflows, scripts, or checklists?
4. Which episodic lessons should influence this loop?
5. Which memory should be read-only, writeable, reviewable, or deleteable?
6. Who owns corrections, conflicts, stale memory, retention, export, and forgetting?
7. What evidence proves memory improved the output rather than adding noise?

## Required Matrix

| Loop | Working Memory | Semantic Memory | Procedural Memory | Episodic Memory | Read/Write Owner | Approval | Forget/Refresh Rule | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | |

## Storage Decision

Pick the simplest storage that satisfies the loop:

- prompt/context only for one-off transformations
- Markdown/project docs for stable conventions and human-readable operating rules
- structured records when exact fields, status, ownership, timestamps, or analytics matter
- retrieval index when flexible semantic lookup over unstructured material matters
- knowledge graph when relationships between entities, claims, decisions, and evidence matter
- skill folder when the value is repeatable procedure
- session record or distillate when the value is past experience, decisions, or lessons

Do not choose storage before choosing the memory type and owner.

## Governance Rules

- Hidden durable memory writes are not allowed.
- Customer, tenant, or user memory must have provenance, correction, delete, export, and retention rules.
- Episodic memory should be distilled, not raw transcript hoarding.
- Procedural memory should not contain customer-specific private memory.
- Semantic memory needs source-of-truth and freshness policy.
- Cross-agent memory sharing should prefer distilled task payloads over raw private memory.
- Memory changes that affect external actions, public outputs, paid work, destructive actions, or user identity require trace and approval policy.

## Runtime Handoff

Feed the memory decision into:

- Agent Engineering: skill inventory, retrieval requirements, tool contracts, evals
- Agent OS Runtime: memory manager, traces, human control, recovery, budgets
- Agent Network: cross-agent context-sharing and memory boundaries
- Agentic Zero Trust: memory integrity, poisoning resistance, immutable traces, rollback
- Capability and Access: retrieval stores, databases, APIs, credentials, mocks, live verification

## Blockers

Block Build Plan approval when:

- an agent needs durable memory but no memory owner exists
- memory writes are hidden from the user or operator
- stale, wrong, private, or poisoned memory has no correction path
- tenant or user memory boundaries are unclear
- a retrieval/vector/graph store is selected before source-of-truth and memory-fit decisions
- the product relies on learning but has no episodic distillation or lesson-promotion rule


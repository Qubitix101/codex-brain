---
name: intelligence-architecture-selector
description: Use when deciding whether an AI product loop needs model-only reasoning, ADK/workflow, semantic RAG, structured retrieval, extraction, durable memory, external action, routines, or a hybrid.
version: 0.1.0
---

# Intelligence Architecture Selector

Select the right intelligence substrate before implementation. Use this skill to avoid defaulting to "just add RAG", "just add an agent", or "just call a model" when the product loop needs a different architecture.

## When to Use

- A product idea includes AI, agents, retrieval, memory, automation, workflows, or external tools.
- A Build Plan must decide between RAG, ADK/workflow, structured retrieval, extraction, memory, actions, or routines.
- The user asks what kind of AI system a product should use.
- A feature loop depends on private data, documents, live APIs, user memory, or repeatable operations.

## Do Not Use

- The task is a simple code edit with no AI architecture decision.
- The user only asks for syntax, debugging, or one local command.
- A prior approved architecture decision already exists and the current task does not change it.

## Inputs

Collect only what is available. Ask for missing facts only when the decision would be risky.

- Product goal and user job.
- Core user loops or workflows.
- Source of truth for each loop.
- Data shape: unstructured documents, structured records, live APIs, user memory, or external web.
- Required actions: read, write, send, publish, delete, purchase, schedule, deploy.
- Freshness, citation, confidence, and approval needs.
- Cost of wrong output or wrong action.

## Core Workflow

1. **Split the product into loops.** Do not choose one architecture for the whole app when different loops need different substrates.
2. **Classify the loop's primary job.** Use answer, decide, transform, extract, remember, coordinate, act, or operate repeatedly.
3. **Name the source of truth.** Documents imply possible semantic RAG. Tables and state imply structured retrieval. Messy inputs that become durable data imply extraction. User history implies memory.
4. **Select the minimum substrate set.** Prefer the smallest architecture that satisfies accuracy, repeatability, trust, and action requirements.
5. **Add production controls.** For actions and routines, require approval boundaries, traces, rollback or compensating action, and evals.
6. **Produce a decision artifact.** Make the result concrete enough to guide engineering.

## Substrate Rules

- **Model-only reasoning:** Use for drafting, rewriting, classification, critique, and short transformations where all needed context is already provided.
- **ADK/workflow:** Use for repeatable multi-step tasks, coordination, tool use, approvals, branching, and orchestration.
- **Semantic RAG:** Use for flexible questions over policies, PDFs, docs, manuals, and knowledge bases.
- **Deterministic structured retrieval:** Use for exact records, counts, statuses, permissions, timestamps, ownership, metrics, and filters.
- **LLM extraction into structured fields:** Use when emails, transcripts, documents, posts, or notes must become durable queryable data.
- **Durable memory or knowledge graph:** Use when user-specific preferences, examples, relationships, decisions, history, or feedback must compound over time.
- **External action layer:** Use when the system sends, publishes, schedules, updates, deletes, buys, deploys, or mutates production data.
- **Routine automation layer:** Use when the system runs daily, weekly, monthly, event-triggered, or monitored work without a fresh user prompt.

## Output Contract

Return a concise architecture decision with:

- loops analyzed
- selected substrate per loop
- rejected substrates and reasons
- source of truth
- retrieval or extraction approach
- memory model, if any
- tool/action boundary, if any
- routine boundary, if any
- evals and traces required
- first build slice
- open access questions

## Quality Bar

- Do not recommend RAG for exact database facts.
- Do not recommend agents for simple single-step generation.
- Do not allow external action without approval, audit, and failure handling.
- Do not hide memory changes from users.
- Every selected substrate must map to a product loop and a verification method.

## Examples

### Example: Social Content OS

```text
Loop: Weekly content planning
Substrates: durable memory, structured retrieval, workflow, routine
Why: needs voice profile, proof bank, content history, weekly cadence, and approval.
Not enough: model-only generation would miss user context and learning.
```

### Example: Policy Q&A

```text
Loop: Answer employee questions about policies
Substrates: semantic RAG plus citation and freshness policy
Why: source of truth is long-form documents.
Avoid: autonomous action, unless the assistant also opens HR requests.
```

## Trust Level

T1 - Instructions only. This skill makes architecture recommendations and does not call tools or write files by itself.

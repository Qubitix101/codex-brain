# Step 02 - Loop Architecture Map

## Read

- `docs/intelligence-architecture-decision.md`
- `docs/intelligence-system-plan.md`
- `frameworks/intelligence-architecture-selection.md`

## Goal

Turn architecture selection into concrete loop requirements that Agent Engineering can audit.

## Procedure

For each selected product loop, define:

- source of truth
- retrieval strategy
- extraction schema if any
- memory read/write policy
- workflow graph if any
- external action boundary if any
- routine trigger if any
- required eval
- required trace
- first vertical slice coverage

## Required Decisions

### RAG vs Structured Retrieval

- Use semantic RAG for unstructured document questions.
- Use deterministic structured retrieval for exact records, dates, counts, statuses, ownership, permissions, and analytics.
- Use hybrid when the answer needs both document grounding and exact records.

### Extraction First

Use LLM extraction before retrieval/action when messy inputs must become reusable facts.

Examples:

- transcript -> claims, examples, preferences, proof points
- email -> task, deadline, account, risk
- customer note -> issue, sentiment, priority, next action
- social post -> topic, voice pattern, performance signal

### Workflow First

Use ADK-style workflow when steps, tools, branching, approvals, jobs, or retries matter.

## Output

Update:

- `docs/intelligence-architecture-decision.md#per-loop-architecture-map`
- `docs/intelligence-architecture-decision.md#evaluation-and-trace-requirements`
- `docs/intelligence-architecture-decision.md#handoff-to-agent-engineering`

## State Update

- keep `phase`: `intelligence-architecture`
- keep `gates.intelligence_architecture.status`: `in-progress`
- keep blockers in `gates.intelligence_architecture.notes`

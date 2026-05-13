# Intelligence Architecture Decision

## 1. Architecture Thesis

- Product:
- User/job:
- Recommended architecture:
- Why this is stronger than a generic prompt/RAG/agent wrapper:

## 2. Gate Applicability

- Applies: yes / no
- Reason:
- Agentic maturity input: `docs/agentic-opportunity-audit.md`
- Intelligence system input: `docs/intelligence-system-plan.md`

## 3. Per-Loop Architecture Map

| Product Loop | User Job | Source Of Truth | Chosen Substrate | Why | Rejected Alternatives |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Substrate options:

- model-only reasoning
- ADK-style workflow or agent
- semantic RAG
- deterministic structured retrieval
- LLM extraction into structured fields
- durable memory / knowledge graph
- external action layer
- routine automation layer
- hybrid

## 4. Source Of Truth Policy

| Source | Type | Owner | Freshness | Permission Boundary | Used By |
| --- | --- | --- | --- | --- | --- |
|  | documents / database / API / memory / web / user input |  |  |  |  |

## 5. RAG Decision

- Semantic RAG required: yes / no / later
- Corpus:
- Chunking strategy:
- Metadata strategy:
- Citation policy:
- Freshness policy:
- Retrieval eval:
- Why RAG is or is not the correct primary strategy:

## 6. Structured Retrieval Decision

- Structured retrieval required: yes / no / later
- Source tables/APIs/indexes:
- Required fields:
- Query/filter contracts:
- Tenant/user permission boundary:
- Freshness guarantee:
- Why structured retrieval is or is not the correct primary strategy:

## 7. Extraction Decision

- LLM extraction required: yes / no / later
- Raw inputs:
- Target schema:
- Provenance fields:
- Confidence fields:
- Review/correction flow:
- Conflict handling:
- Why extraction is or is not required before retrieval/action:

## 8. Memory and Knowledge Graph Decision

- Durable memory required: yes / no / later
- Memory types:
- Relationship/entity model:
- Read policy:
- Write policy:
- User visibility:
- Delete/export/correction policy:

## 9. ADK / Workflow Decision

- ADK-style workflow required: yes / no / later
- Workflow graph:
- Deterministic steps:
- Model-judgment steps:
- Tool/action steps:
- Approval steps:
- Failure/retry/escalation steps:

## 10. Action and Routine Decision

- External actions required: yes / no / later
- Routine automation required: yes / no / later
- Public/paid/destructive/production actions:
- Preview requirement:
- Approval requirement:
- Audit requirement:
- Rollback or compensating action:
- Trigger/schedule model:

## 11. Evaluation and Trace Requirements

| Loop | Required Eval | Required Trace | Pass Bar |
| --- | --- | --- | --- |
|  |  |  |  |

## 12. First Vertical Slice

- Smallest loop to prove:
- Included substrates:
- Excluded/deferred substrates:
- Demo outcome:
- Verification:

## 13. Handoff To Agent Engineering

- Required agent-engineering disciplines:
- Tool contracts needed:
- Retrieval requirements:
- Extraction requirements:
- Memory requirements:
- Reliability requirements:
- Security/safety requirements:
- Evals/observability requirements:
- Product trust UX requirements:
- Skill candidates:

## 14. Gate Decision

- Status: pass / blocked / not applicable
- P0 blockers:
- Open questions:
- Approved by:
- Date:

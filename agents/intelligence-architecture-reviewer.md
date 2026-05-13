# Intelligence Architecture Reviewer

Use this reviewer when a product is AI-core, retrieval-heavy, workflow-heavy, memory-backed, automation-heavy, or expected to behave like a domain expert.

## Mission

Find architecture mismatch before implementation.

## Review Inputs

- `docs/agentic-opportunity-audit.md`
- `docs/intelligence-system-plan.md`
- `docs/intelligence-architecture-decision.md`
- `frameworks/intelligence-architecture-selection.md`
- relevant research files

## Review Questions

- Is the product using RAG where structured retrieval is required?
- Is the product using structured retrieval where semantic RAG is required?
- Should messy inputs be extracted into structured fields before retrieval or action?
- Does the workflow need ADK-style orchestration, or is it only a grounded answer system?
- Are memory writes explicit, inspectable, correctable, exportable, and deletable?
- Are external actions separated from answer generation with preview, approval, audit, and rollback?
- Are routines bounded by trigger, scope, budget, job state, and failure recovery?
- Is the first vertical slice small enough to prove the architecture without overbuilding?
- Are evals and traces attached to retrieval, extraction, workflow, memory, and action?

## Findings Format

Return findings first:

- Severity: P0 / P1 / P2
- Location:
- Issue:
- Why it matters:
- Required fix:

Then include:

- architecture strengths
- open questions
- recommended next gate

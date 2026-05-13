# Step 01 - Seven-Discipline Agent Engineering Audit

## Read

- `docs/agentic-opportunity-audit.md`
- `docs/intelligence-system-plan.md`
- `docs/intelligence-architecture-decision.md`
- `frameworks/agent-engineering-skill-stack.md`
- `catalogs/agent-engineering-catalog.json`
- `.codex-brain/research/` when present

## Decide

For every AI-core, agentic, automation-heavy, retrieval-heavy, or tool-using project, score the seven disciplines against the selected intelligence architecture:

1. system design
2. tool and contract design
3. retrieval engineering
4. reliability engineering
5. security and safety
6. evaluation and observability
7. product trust and UX

Use 0-3 readiness scoring:

- 0: missing
- 1: drafted but unsafe or incomplete
- 2: usable for first slice with known limits
- 3: production-ready for current scope

## Write

Create or update:

- `docs/agent-engineering-audit.md`

Use:

- `templates/shared/agent-engineering-audit.template.md`

## Blockers

Stop before Agent OS Runtime and Capability and Access if:

- the system has tools but no tool-contract policy
- the system has RAG but no retrieval design
- the system has structured retrieval or extraction but no source-of-truth, schema, provenance, or validation policy
- the system has external actions but no approval boundary
- the system has automation but no reliability and observability plan
- the system has multiple models/providers but no routing policy
- the system will answer important questions but has no evals or traceability

## State

Update `.codex-brain/state.json`:

- `phase`: `agent-engineering`
- `gates.agent_engineering.status`: `in-progress`
- `gates.agent_engineering.missing`: include `docs/skill-inventory.md` until Step 02 is complete
- `distillates.agent_engineering`: concise audit summary when available

## Next

Proceed to Step 02 only after P0 discipline gaps are explicit.

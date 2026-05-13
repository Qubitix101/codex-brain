# Step 03 - Intelligence Architecture Readiness Gate

## Read

- `docs/intelligence-architecture-decision.md`
- `frameworks/intelligence-architecture-selection.md`
- `.codex-brain/state.json`

## Gate Questions

- Is every core product loop mapped to an intelligence substrate?
- Is the source of truth explicit for every loop?
- Are RAG, structured retrieval, extraction, memory, workflow, action, and routine decisions explicit?
- Are rejected alternatives documented?
- Are eval and trace requirements defined?
- Is the first vertical slice architecture explicit?
- Is the handoff to Agent Engineering clear?

## Pass Criteria

The gate can pass when:

- `docs/intelligence-architecture-decision.md` exists
- semantic RAG is not used for exact records without justification
- structured retrieval is not used for broad semantic document questions without justification
- extraction into structured fields has schema, provenance, confidence, and correction requirements
- ADK/workflow use has steps, state, approvals, and failure handling
- external actions have preview, approval, audit, and rollback or accepted irreversibility
- the first vertical slice proves the selected architecture without overbuilding the full operating system

## State Update

If pass:

- set `.codex-brain/state.json#gates.intelligence_architecture.status` to `complete`
- set `.codex-brain/state.json#gates.intelligence_architecture.approved` according to user/project policy
- clear missing artifacts for `intelligence_architecture`
- set `phase`: `agent-engineering`

If blocked:

- keep `phase`: `intelligence-architecture`
- set `gates.intelligence_architecture.status`: `blocked`
- record blockers in `gates.intelligence_architecture.notes`

## Next

After approval, run Agent Engineering and Skill Factory so production-agent discipline is grounded in the selected intelligence architecture.

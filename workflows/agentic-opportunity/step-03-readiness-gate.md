# Agentic Opportunity - Step 03 - Readiness Gate

## Read

- `docs/agentic-opportunity-audit.md`
- `docs/intelligence-system-plan.md`
- `.codex-brain/state.json`
- `frameworks/agentic-opportunity-audit.md`
- `frameworks/intelligence-system-plan.md`

## Gate Questions

- Is the maturity level now explicit?
- Is the highest plausible later maturity explicit?
- Is the first closed loop defined?
- Are memory, sensing, tools, routines, approval, evals, and learning considered?
- Are deferred agentic layers listed with revisit triggers?
- Are overbuild and underbuild risks documented?
- Is the next step clear for Intelligence Architecture Selection?

## Pass Criteria

The gate can pass when:

- `docs/agentic-opportunity-audit.md` exists
- `docs/intelligence-system-plan.md` exists
- the product has a recommended maturity level
- the first closed loop is explicit
- reasoning, retrieval, extraction, memory, workflow, action, routine, tool, and harness needs are framed as hypotheses for the intelligence architecture decision

## State Update

If pass:

- set `.codex-brain/state.json#gates.agentic_opportunity.status` to `complete`
- clear missing artifacts for `agentic_opportunity`
- set `approved` according to user/project policy
- next workflow: `intelligence-architecture-selection`

If blocked:

- set status to `blocked`
- keep the first blocking gap in `missing`
- next allowed action is to finish the missing audit or plan section

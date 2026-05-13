# Step 03 - Skill Factory Readiness Gate

## Read

- `docs/intelligence-architecture-decision.md`
- `docs/agent-engineering-audit.md`
- `docs/skill-inventory.md`
- `frameworks/skill-factory.md`

## Decide

Approve the Agent Engineering gate only when:

- all seven disciplines are scored
- RAG, structured retrieval, extraction, memory, workflow, action, and routine requirements from the intelligence architecture decision are reflected
- P0 blockers are resolved or explicitly accepted as deferred with a safe first slice
- required first-slice skills are named
- trust levels are assigned
- T2-T4 skills have review requirements
- skill generation does not bypass capability/access planning
- model routing policy is documented when multiple models/providers are expected

## Write

Update:

- `docs/agent-engineering-audit.md#gate-decision`
- `docs/skill-inventory.md#gate-decision`
- `.codex-brain/state.json`

## Approval

User approval is required before moving to Agent OS Runtime when:

- the product is L3 or higher
- any skill is T3 or T4
- any external action, public action, paid action, destructive action, or unattended routine is in scope
- model routing includes user/private/customer data across providers

## State

If approved:

- `gates.agent_engineering.status`: `complete`
- `gates.agent_engineering.approved`: `true`
- `gates.agent_engineering.missing`: `[]`
- `phase`: `agent-os-runtime`

If blocked:

- keep `phase`: `agent-engineering`
- set `gates.agent_engineering.status`: `blocked`
- record blockers in `gates.agent_engineering.notes`

## Next

After approval, run Agent OS Runtime with `docs/agent-engineering-audit.md` and `docs/skill-inventory.md` as required inputs so runtime kernel choices are grounded in actual procedures. Agent Network and Interoperability follows when cross-agent or inter-OS boundaries are relevant; Capability and Access follows after runtime and network boundaries are explicit.

# Capability Access - Step 02 - Map Surfaces

## Read

- `docs/capability-access-map.md`
- `docs/intelligence-system-plan.md` if relevant
- `docs/intelligence-architecture-decision.md` if relevant
- `docs/skill-inventory.md` if relevant
- `frameworks/tool-surface-routing.md`
- `catalogs/tool-surface-routing-matrix.json`

## Decide

For every required capability, select:

- product runtime surface
- agent implementation surface
- setup/testing surface
- mock strategy
- live verification trigger
- skill trust-level impact
- architecture substrate impact: semantic RAG, structured retrieval, extraction, memory, workflow, action, or routine automation

## Surface Rules

- Prefer native CLI for local deterministic developer work.
- Prefer official API/SDK for production runtime behavior.
- Prefer MCP/connectors when managed auth, scoped permissions, structured remote objects, no-shell environments, or auditability justify the tool context.
- Prefer generated CLI harnesses only when official automation surfaces are missing and the harness can be tested.
- Prefer browser automation for rendered web state and visual QA.
- Prefer Computer Use for native desktop UI workflows with no structured interface.

## Write

Update `docs/capability-access-map.md` sections:

- Access Surface Decisions
- Credentials and Accounts
- OAuth, Webhooks, and App Setup
- Mock and Live Verification Plan
- Risk and Governance

Optional task router:

```bash
npm run route-tool -- --task "[specific task]"
```

## Stop If

- a production runtime path depends on Browser or Computer Use without explicit accepted risk
- an MCP server would be loaded broadly when a scoped CLI/API path is sufficient
- a destructive or externally visible action lacks an approval boundary
- a T3/T4 skill lacks credentials, audit logging, rollback, or eval requirements

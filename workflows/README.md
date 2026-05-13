# Codex Brain Workflows

Workflow files are small executable step guides for future Codex sessions.

Use them with:

- `catalogs/workflow-manifest.json` for routing
- `scripts/next-action.mjs` for current phase
- framework files for deeper reasoning

## Rules

- Load only the workflow needed for the current phase.
- Follow step files in order.
- Stop at approval points.
- Update `.codex-brain/state.json`, project context, memory, or artifacts when the workflow says so.
- Do not use workflow steps to bypass phase gates.

## Workflows

- `context-routing/` - determine the next allowed action
- `agentic-opportunity/` - decide normal app vs AI workflow vs agentic/domain operating system and write the intelligence system plan
- `intelligence-architecture/` - choose model-only, ADK/workflow, semantic RAG, structured retrieval, extraction, memory, action, and routine substrates per loop
- `agent-engineering/` - audit production-agent readiness and map procedural skill candidates before access planning
- `capability-access/` - map APIs, SDKs, CLIs, MCPs, credentials, mocks, and live verification before planning
- `quick-flow/` - low-risk fast path
- `full-mode-readiness/` - Full-mode evidence, plan, and readiness checks
- `session-close/` - save structured session context and check context health

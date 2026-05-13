# Computer Use Plugin Scaffold

This is a repository-local scaffold for future Codex Computer Use workflows.

Current status:

- no MCP servers declared
- no app connectors declared
- no active skills shipped
- marketplace metadata is intentionally minimal

Use this scaffold only after checking `frameworks/tool-surface-routing.md`.

Default rule:

- prefer CLI, official API/SDK, or MCP when those surfaces satisfy the task
- use Browser for rendered web state and visual QA
- use Computer Use for native desktop UI workflows with no structured interface
- turn repeated desktop workflows into tested generated CLI harnesses when possible

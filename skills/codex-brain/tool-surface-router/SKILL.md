---
name: tool-surface-router
description: Use when choosing between CLI, API/SDK, MCP or connector, A2A-style agent delegation, generated CLI harness, browser automation, Computer Use, or direct shell scripting for a task.
version: 0.1.0
---

# Tool Surface Router

Choose the least-context, least-permission, most reliable way for an agent or product to reach the outside world.

## When to Use

- The same system can be reached through CLI, API, SDK, MCP, connector, A2A-style agent delegation, browser automation, or desktop UI.
- The user asks when to use GitHub CLI versus GitHub MCP, or similar choices for any app.
- A plan needs implementation tooling and production integration surfaces separated.
- An agent is about to use a brittle or expensive surface for a simple deterministic job.

## Do Not Use

- The task already has a single obvious local command and no integration tradeoff.
- The user explicitly requires a specific surface and the action is safe.
- The decision has already been made in an approved capability map.

## Default Rule

Use the cheapest deterministic surface that satisfies the task. Escalate only when a richer surface provides required value: managed auth, per-user permissions, auditability, structured remote objects, rendered UI state, human UI workflows, or governance controls.

## Surface Decision Tree

1. **Is this local developer work?** Prefer CLI for files, search, git, package managers, tests, migrations, local logs, and deterministic asset transforms.
2. **Is this production product behavior?** Prefer official API or SDK for runtime integrations, webhooks, customer-facing features, and explicit error handling.
3. **Does auth, user scoping, or enterprise audit matter more than token cost?** Prefer MCP or connector when managed OAuth, scoped permissions, structured objects, and audit trails are the value.
4. **Is the target another autonomous agent or domain operating system?** Prefer A2A-style delegation with agent cards, task contracts, context boundaries, progress, traces, and approval rules.
5. **Is there no official automation surface but the workflow can be made repeatable?** Consider a generated CLI harness with tests and version pinning.
6. **Does the result depend on rendered web state?** Use browser automation for JavaScript-rendered pages, screenshots, visual QA, and authenticated web journeys.
7. **Does the task require a native desktop app?** Use Computer Use only when API, CLI, MCP, browser, or generated harness cannot satisfy the job.

## GitHub Routing

- Use `git` CLI for local status, diffs, logs, branches, commits, merges, and local/remote parity.
- Use `gh` CLI for PRs, CI runs, issues, releases, and scripted GitHub operations from a shell.
- Use GitHub API or SDK for product runtime integrations, GitHub Apps, OAuth, webhooks, and customer-facing GitHub features.
- Use GitHub MCP for hosted agents without shell access, user-scoped GitHub operations, enterprise governance, scoped permissions, and cross-app workflows.
- Use browser only for GitHub visual inspection or flows not exposed through API, CLI, or MCP.

## MCP Cost Rule

MCP is not automatically better because it is structured. It is better when the server abstraction, auth boundary, auditability, or high-level remote objects justify the tool-schema context cost.

CLI is not automatically better because it is cheap. It is worse when the agent must reverse-engineer rendered UI, manually manage OAuth, or perform brittle text scraping.

A2A-style delegation is not a replacement for MCP. Use it when the target is another autonomous agent or domain operating system. Use MCP when the target is a tool, data source, file system, SaaS object, database, or structured resource.

## Output Contract

Return:

- recommended surface
- rejected surfaces and reasons
- agent build surface versus product runtime surface
- required access or credentials
- safety boundary
- fallback surface
- verification method

## Examples

### Example: Read Local Git History

```text
Recommended: git CLI
Reason: deterministic local repo operation, low context overhead, easy verification.
Rejected: GitHub MCP, because remote structured tools add cost without value.
```

### Example: Read a JavaScript-Rendered Web Page

```text
Recommended: browser automation or MCP fetcher with rendering
Reason: curl returns raw app shell or bundles, not the rendered page content.
Rejected: curl plus text processing, because it invites fragile reverse engineering.
```

### Example: SaaS User Calendar Integration

```text
Recommended runtime: official API with OAuth
Recommended agent surface: connector or MCP if user-scoped auth is managed there
Reason: per-user permissions, token refresh, and auditability matter.
```

## Trust Level

T1 - Instructions only. This skill routes tool choices and does not call tools by itself.

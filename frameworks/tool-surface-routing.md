# Tool Surface Routing Framework

Codex Brain should help agents choose the right way to reach the outside world.

The question is not CLI versus MCP. The question is which surface gives the least-context, least-permission, most reliable path for the specific task.

For agentic products, surface routing should be grounded in `docs/intelligence-architecture-decision.md`, `docs/agent-engineering-audit.md`, and `docs/skill-inventory.md`; the selected architecture defines what must be reached, and the required procedures and skill trust levels determine whether a surface is safe enough.

## Purpose

Agents can often reach the same system through multiple surfaces:

- native CLI
- official API or SDK
- MCP server or connector
- generated CLI harness
- browser automation
- computer use
- direct shell scripting
- procedural skills that orchestrate the above

Without a routing policy, agents may pick a surface that is technically possible but operationally bad. The wrong choice wastes context, leaks permissions, creates brittle workflows, or sends the agent into avoidable loops.

## Default Rule

Use the cheapest deterministic surface that satisfies the task.

Escalate only when the task requires something the cheaper surface cannot provide:

- rendered UI state
- managed auth
- per-user permissions
- audit trails
- structured remote objects
- official production runtime integration
- human UI interaction
- governance controls

## Surface Preference Stack

### 1. Native CLI

Prefer for local developer work:

- `git status`, `git diff`, `git log`, `git show`
- `rg`, `sed`, `find`, `ls`
- package managers and test runners
- local migrations
- local build logs
- deterministic asset transforms

Why:

- low context overhead
- model training includes many examples
- composable with pipes
- easy to verify
- no large tool schemas

Avoid when:

- the CLI cannot render JavaScript
- credentials or token refresh would be ad hoc
- the task needs per-user SaaS authorization
- the CLI output is too raw and requires fragile reverse engineering

### 2. Official API or SDK

Prefer for production product behavior:

- app runtime integrations
- backend workflows
- webhook handlers
- typed or documented external calls
- durable customer-facing features

Why:

- explicit contracts
- stable production semantics
- testable error handling
- better fit for application code

Avoid when:

- the user only needs a one-off local repo or setup operation
- the API requires credentials that are not yet available and a safe mock is enough

### 3. MCP or Connector

Prefer when managed abstraction is the value:

- hosted agent has no shell
- OAuth and token refresh should be server-managed
- operations must be scoped to the current user
- the organization needs auditability
- the server exposes high-level structured objects
- the agent needs cross-app workflows
- the toolset can be scoped to only needed tools

Why:

- safer permission boundaries
- structured inputs
- fewer app-specific auth details in the prompt
- better enterprise governance

Avoid when:

- local CLI solves the task with one or two commands
- loading a large MCP toolset would waste context
- the task is purely local and deterministic
- the MCP server exposes broad write actions without scoping

### 4. Generated CLI Harness

Prefer when:

- no official CLI/API/MCP exists
- a GUI app can be wrapped into repeatable command workflows
- asset generation/export steps need automation
- the harness can be tested and versioned

Why:

- gives agents a deterministic control layer over otherwise messy apps
- can be tailored to project workflows
- cheaper than repeated UI automation when stable

Avoid when:

- an official API, SDK, or CLI exists
- the workflow is inherently visual and cannot be validated from command output
- the harness is untested or tied to fragile UI state

### 5. Browser Automation

Prefer when:

- the result depends on rendered web state
- JavaScript builds the page
- visual QA matters
- screenshots are required
- a real user path must be tested
- an authenticated browser session is needed

Avoid when:

- a stable API or CLI gives the same result
- the task is local file or repo work

### 6. Computer Use

Prefer when:

- the task requires a native desktop app
- no structured automation surface exists
- the workflow is UI-only
- a one-off setup step must be performed visually

Avoid when:

- the action is destructive or externally visible without explicit approval
- the workflow can be expressed through API, CLI, MCP, or generated harness
- long-term production behavior depends on UI automation

## GitHub Routing

Use `git` CLI for:

- local status, diff, log, branch, commit, merge, rebase
- checking local and remote commit parity
- inspecting local files and history

Use `gh` CLI for:

- creating PRs from a local branch
- reading CI runs and logs
- listing issues and PRs
- checking releases
- scripted GitHub operations from a shell session

Use GitHub API or SDK for:

- product runtime GitHub integration
- GitHub App installation flows
- webhook handlers
- customer-facing GitHub features

Use GitHub MCP for:

- hosted agents without shell access
- user-scoped GitHub operations
- enterprise governance, auditability, and scoped permissions
- cross-app agent workflows where GitHub is one tool among many

Use browser only for:

- visual GitHub UI inspection
- flows not exposed through API/CLI/MCP

## Media Generation Routing

For image, video, and voice generation:

- local batch generation: official CLI
- production product feature: official API/SDK
- agent-managed creative workspace: MCP if it handles auth, assets, job state, or permissions better
- no official interface: generated CLI harness
- visual inspection and QA: browser or native viewer

## Context Budget Guardrail

MCP schemas are not free. A large toolset can cost more context than the task is worth.

Before using MCP, ask:

- Can the toolset be scoped?
- Is read-only mode available?
- Is managed auth or governance important?
- Does the MCP server return a higher-level result than raw CLI/API?
- Would CLI require brittle parsing or reverse engineering?

## Skill Surface Guardrail

Before generating or using a skill that calls tools, ask:

- Is this T0/T1/T2/T3/T4?
- Does the skill need scripts, references, assets, or only instructions?
- Does it call external systems?
- Does it read secrets?
- Does it write, publish, spend, delete, or run unattended?
- Is approval, logging, rollback, and eval coverage explicit?

If the answer is no, prefer CLI/API.

## Execution Protocol Addition

Before a meaningful execution step, Codex should state:

- selected surface
- why it fits the task
- why cheaper surfaces were not enough, if escalating
- permission or credential boundary
- first verification command/tool

Example:

```text
Execution surface: gh CLI.
Reason: this is a shell-backed local repo PR operation. MCP would load broader GitHub tool context without adding auth or governance value here.
Verification: gh pr view + git rev-parse local/remote commit IDs.
```

## Anti-Patterns

- Using MCP for a two-command local repo inspection.
- Using raw CLI for authenticated SaaS workflows that need OAuth, audit, or user scoping.
- Using browser automation because the API was not checked.
- Treating generated CLI harnesses as stable without tests.
- Letting tool availability decide the architecture instead of task requirements.
- Mixing production integration choices with agent implementation choices.

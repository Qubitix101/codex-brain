---
name: capability-access-mapper
description: Use before planning or building when a project depends on APIs, SDKs, CLIs, MCP servers, A2A-style agent surfaces, OAuth, credentials, SaaS accounts, media tools, databases, deployment, or automation.
version: 0.1.0
---

# Capability Access Mapper

Create the access map before the Build Plan. Use this skill to identify what external powers the product and the agent need, what can be mocked, and what must be verified live.

## When to Use

- A project uses external services, databases, auth, payments, deployment, AI models, media generation, browser automation, desktop apps, or remote agent services.
- The user asks what API keys, accounts, MCPs, CLIs, or setup are needed.
- A Build Plan risks being blocked by missing credentials, OAuth setup, scopes, test accounts, billing, or sandbox access.
- The product is AI-core, automation-heavy, workflow-heavy, or integration-heavy.

## Do Not Use

- The task is entirely local and has no external access dependency.
- A current capability map already exists and the current change does not affect access.

## Core Distinctions

- **Agent build surface:** What Codex uses while implementing and verifying.
- **Product runtime surface:** What the shipped product uses in production.
- **Setup surface:** What creates or configures infrastructure.
- **Mock surface:** What stands in for external behavior during early development.
- **Live verification surface:** What proves real vendor behavior before launch.

Never assume the best agent tool is the best production integration.

## Core Workflow

1. **List product capabilities.** Include source control, auth, database, storage, payments, email, calendar, files, media generation, models, retrieval, analytics, observability, deployment, browser automation, desktop automation, admin, and support workflows.
2. **Classify each capability.** Mark read-only, write, paid, destructive, public, private, regulated, or automation-sensitive.
3. **Map surfaces.** Identify official API/SDK, official CLI, MCP/connector, A2A-style agent protocol, webhooks, generated harness, browser fallback, and Computer Use fallback.
4. **Map access.** List accounts, API keys, OAuth clients, scopes, billing plans, test tenants, sandbox mode, local tools, and secrets policy.
5. **Plan mocks and cutover.** Define what can be mocked, what needs sandbox, and what must be verified live.
6. **Set approval boundaries.** Require human confirmation for public, destructive, paid, production, or externally visible actions.
7. **Output readiness.** Show blockers, safe next steps, and questions for the user.

## Output Contract

Return a capability map with:

- capability
- production runtime surface
- Codex implementation surface
- interop surface when another agent or domain OS is the target
- setup surface
- mock or sandbox plan
- required credentials and scopes
- owner or provider account
- first live verification
- write/destructive/public/paid classification
- approval requirement
- blocker status

## Access Questions

Ask concise questions only when needed:

- Which provider account owns this integration?
- Do we have sandbox or test mode?
- What OAuth scopes are acceptable?
- Is public send/publish/delete/spend allowed, or approval-only?
- Which vendor is authoritative for production?

## Examples

### Example: AI Video App

```text
Capability: video generation
Runtime surface: provider API
Codex surface: provider CLI or API dry run
Access needed: API key, billing, model quota, test prompt policy
Approval: required before public publishing or paid batch generation
```

### Example: GitHub-Integrated SaaS

```text
Capability: repo issue creation
Runtime surface: GitHub App plus API and webhooks
Codex surface: git and gh CLI for repo work
Mock: local fixture for issue payloads
Live verification: create issue in test repo after user approval
```

## Trust Level

T1 - Instructions only. This skill creates access plans and does not request or store secrets.

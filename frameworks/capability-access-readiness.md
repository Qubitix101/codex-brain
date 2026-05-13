# Capability and Access Readiness Framework

Codex Brain should identify the powers a project needs before it writes the Build Plan or decomposes PRDs.

This framework turns integrations, credentials, APIs, MCP servers, CLIs, browser workflows, and generated harnesses into a first-class planning gate.

## Purpose

Many projects fail late because the team discovers too late that a required external capability is blocked by missing API access, OAuth setup, rate limits, vendor costs, weak sandbox support, unavailable webhooks, or a brittle automation path.

Capability and Access Readiness prevents that by asking, before planning:

- What outside systems does this product depend on?
- What should the built product use in production?
- What should Codex use while implementing and verifying?
- Which official APIs, SDKs, CLIs, MCP servers, webhooks, or UI automation paths exist?
- What access, credentials, scopes, billing setup, test accounts, or local tools must the user provide?
- What can be mocked safely, and what must be verified live before execution?
- What actions are destructive, expensive, externally visible, or permission-sensitive?

## Gate 2.5

Capability and Access Readiness sits after Agentic Opportunity, Intelligence Architecture, Agent Engineering, and Agent OS Runtime, and before Build Plan.

```text
Classify -> Validate -> Research -> Agentic Opportunity -> Intelligence Architecture -> Agent Engineering -> Agent OS Runtime -> Capability and Access -> Plan -> Design DNA -> Decompose -> Execute -> Review -> Ship -> Learn
```

For AI-core, automation-heavy, memory-backed, workflow-heavy, or operating-system-shaped products, finish these first so the access map is grounded in the intended intelligence loop and procedural skill plan:

- `docs/agentic-opportunity-audit.md`
- `docs/intelligence-system-plan.md`
- `docs/intelligence-architecture-decision.md`
- `docs/agent-engineering-audit.md`
- `docs/skill-inventory.md`
- `docs/agent-os-runtime-plan.md`

For Standard and Full projects, `docs/capability-access-map.md` is required before the Build Plan is approved when the product depends on external services, AI tools, media generation, browser automation, authenticated SaaS systems, payments, deployment platforms, databases, file storage, email, calendar, source control, analytics, or observability.

For Light projects, use a lighter version when the task depends on an external account, paid API, desktop app, or non-trivial integration.

## Required Artifact

Primary artifact:

- `docs/capability-access-map.md`

Use:

- `templates/shared/capability-access-map.template.md`
- `catalogs/capability-access-catalog.json`
- `catalogs/tool-surface-routing-matrix.json`

Also read:

- `docs/intelligence-architecture-decision.md`
- `docs/agent-engineering-audit.md`
- `docs/skill-inventory.md`
- `docs/agent-os-runtime-plan.md`

Optional helpers:

```bash
npm run plan-capabilities -- --brief "[what we are building]" --mode standard
npm run plan-intelligence-architecture -- --brief "[what we are building]" --mode standard
npm run plan-agent-skills -- --brief "[what we are building]" --mode standard
npm run plan-agent-os-runtime -- --brief "[what we are building]" --mode standard
npm run route-tool -- --task "create a GitHub issue from a validated bug report"
```

## Core Distinctions

### Agent Build Surface vs Product Runtime Surface

Codex may use one surface while building, while the product uses another in production.

Example:

- Building a GitHub-integrated app: Codex uses `git` and `gh` CLI for repo work.
- Product runtime: the app uses GitHub API, GitHub App, webhooks, and OAuth.
- Hosted user assistant: GitHub MCP may be appropriate for scoped user-authorized operations.

Never assume the best agent tool is the best production integration.

### Setup Surface vs Runtime Surface

Some tools are best for setup, not runtime.

Examples:

- Vercel CLI can create and inspect deployments while the app runtime uses environment variables and platform APIs.
- Supabase CLI can manage migrations while the app runtime uses Supabase client libraries or direct Postgres access.
- Stripe CLI can test webhooks while production uses Stripe API and signed webhook handlers.

### Mock Surface vs Live Surface

Every external capability should state:

- mock/stub strategy
- sandbox/test-mode strategy
- first live verification trigger
- production cutover requirements

If the product value depends on a vendor's real behavior, do not rely only on mocks.

## Access Surface Types

### Native CLI

Use for deterministic local developer work:

- files
- search
- git
- package managers
- tests
- local logs
- migrations
- asset processing
- batch jobs

CLI is usually cheapest in tokens and easiest to compose with pipes.

### Official API or SDK

Use for production product integrations:

- runtime calls
- webhooks
- customer-facing features
- durable backend workflows
- typed client libraries
- explicit error handling and rate-limit handling

For production, prefer official API/SDK over an agent-only MCP or browser workflow.

### MCP or Connector

Use when the server abstraction justifies its context and setup cost:

- managed OAuth or per-user authorization
- scoped permissions
- audit trails
- structured remote objects
- no shell access
- app connectors inside a hosted agent environment
- multi-user enterprise governance
- cross-app workflows where the server manages app-specific identifiers and tokens

Prefer scoped toolsets and read-only modes when available.

### Generated CLI Harness

Use when no official automation surface exists or the app is primarily GUI-based but can be driven deterministically:

- desktop creative tools
- command wrappers over GUI apps
- repeatable asset export flows
- local automation bridges

Treat generated harnesses as project-owned infrastructure. They need tests, version pinning, and clear fragility notes.

### Browser Automation

Use for rendered web state:

- visual QA
- screenshots
- authenticated web flows
- JavaScript-rendered pages
- E2E user journeys
- local app verification

Use browser automation when `curl` or raw HTTP would miss the real UI state.

### Computer Use

Use for desktop app workflows:

- native macOS app interactions
- visual workflows not exposed by CLI/API/MCP
- one-off setup inside apps
- workflows that require human-like UI state

Computer Use is powerful but fragile. Prefer official APIs, CLIs, or MCP when they exist and satisfy the task.

## Capability Inventory

Every capability map should consider:

- source control and issue tracking
- auth and identity
- database and storage
- payments and billing
- email and notifications
- calendar and scheduling
- file storage and document processing
- image generation
- video generation
- voice or audio generation
- AI model calls and agent tools
- search, vector, and retrieval
- analytics
- observability
- deployment and environments
- browser automation or web scraping
- desktop app automation
- admin/support workflows

## Access Readiness Checklist

For each capability, record:

- capability owner
- production integration surface
- agent implementation surface
- official API/SDK availability
- official CLI availability
- MCP/connector availability
- generated harness need
- browser/computer-use fallback
- required credentials
- OAuth app/client requirements
- scopes and least-privilege rules
- sandbox or test-mode availability
- production account requirements
- billing/cost requirements
- webhook requirements
- rate limits and quota risks
- local environment variables
- secret storage rule
- mock strategy
- first live verification command
- destructive or externally visible actions
- audit/logging requirement
- blocked-until items for the user

## User-Facing Output

Before Build Plan, Codex should be able to say:

```text
To build this properly, we need these capabilities and access paths:

1. GitHub
   - Agent build path: git + gh CLI
   - Product runtime path: GitHub App + REST/GraphQL API + webhooks
   - MCP: useful only for hosted user-authorized assistant workflows
   - Needed from user: GitHub org/repo, app permission model, webhook secret

2. Stripe
   - Agent build path: Stripe CLI for webhook tests
   - Product runtime path: Stripe API
   - Needed from user: test keys, product/pricing model, webhook endpoint secret
```

The artifact should separate:

- required now
- can be mocked
- can wait until later
- blocked until user provides access
- explicitly not needed

## Blocking Rules

Block Build Plan approval when:

- a critical external capability is named but the access path is unknown
- a production integration depends on browser automation without explicit acceptance
- an authenticated SaaS integration lacks scope and credential requirements
- a paid or quota-limited API has no cost/rate-limit plan
- a destructive or externally visible action lacks approval boundaries
- AI tool use lacks data-access and permission boundaries
- webhooks are required but no local/test verification path exists

Do not block when:

- the capability is non-critical and safely deferred
- a mock is enough for the next PRD and the live verification trigger is explicit
- the user deliberately accepts a documented risk

## Examples

### GitHub

- Local repo work: `git` CLI.
- GitHub-hosted repo operations: `gh` CLI if shell is available.
- Product runtime: GitHub API, GitHub App, OAuth, webhooks.
- Hosted agent/user-scoped workflow: GitHub MCP when managed auth, structured objects, or governance matter.
- Browser: only for UI-only GitHub behavior or visual verification.

### Image, Video, and Voice Generation

- Local generation jobs: official CLI when available.
- Product runtime: official API/SDK.
- Agent-managed creative workflow: MCP when it manages assets, auth, projects, permissions, or job state better than raw CLI.
- No official surface: generated CLI harness or browser automation, marked as fragile.

### Rendered Web Pages

- Static/raw HTML: `curl` or HTTP client.
- JavaScript-rendered pages: browser/MCP fetcher/headless browser.
- Visual layout: browser screenshots and pixel checks.

### Desktop Apps

- Official CLI or scripting bridge first.
- Generated CLI harness when repeatable and testable.
- Computer Use for UI-only workflows or setup steps.

## Anti-Patterns

- Choosing MCP because it feels modern when CLI is enough.
- Choosing CLI because it is cheap when auth, rendering, or governance is the hard part.
- Using Browser or Computer Use as a production integration plan.
- Treating a local setup token as a production credential strategy.
- Loading huge tool surfaces without scoping toolsets.
- Writing PRDs that assume credentials, webhooks, or sandbox accounts already exist.
- Hiding access blockers inside implementation tasks.

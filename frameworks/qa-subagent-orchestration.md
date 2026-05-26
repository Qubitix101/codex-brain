# QA Subagent Orchestration Framework

This framework turns one Codex session into a disciplined engineering lead that can route work across specialist agents without creating chaos.

The goal is not to spawn more agents. The goal is to reduce missed defects, improve proof quality, and keep the human out of low-signal shoulder surfing.

## When to Use

Use this framework for:

- Standard or Full mode implementation work
- user-facing UI, product, dashboard, onboarding, checkout, or admin flows
- auth, authorization, privacy, payments, database migrations, deployment, or production bug fixes
- AI, retrieval, memory, tool use, routine automation, or multi-agent behavior
- any task where "done" requires more than one kind of proof
- any user request to use multiple agents, subagents, reviewers, or QA specialists

For small Light mode tasks, use a single-agent execution loop unless the change touches security, data loss, production, or public UX.

## Core Principle

Parallelize independent judgement, not overlapping edits.

The main Codex agent keeps ownership of the critical path. Before delegation, it must audit the required powers: skills, MCP tools, MCP access, CLI access, browser/computer-use needs, credentials, and verification surfaces. Subagents should receive bounded sidecar tasks with clear read or write permissions, expected output, and stop conditions.

## Role Model

| Role | Use For | Edits Allowed | Output |
| --- | --- | --- | --- |
| Main implementer | The active feature, fix, or artifact | Yes, scoped to the task | Working change and verification |
| Explorer | Architecture, constraints, existing patterns, root cause | No | Findings and recommended boundaries |
| QA verifier | Tests, browser checks, screenshots, critical journeys, regression proof | Usually no | Evidence, failures, residual risk |
| Code reviewer | Diff review for correctness, maintainability, missing tests | No | Severity-ranked findings |
| Security/privacy reviewer | Auth, tenant isolation, secrets, PII, approval boundaries | No | P0/P1 blockers and required fixes |
| Design/accessibility reviewer | Visual fit, responsive behavior, keyboard, contrast, overflow | No | UI findings and screenshots when possible |
| Data/reliability reviewer | migrations, retries, idempotency, performance, observability | No | risk findings and verification gaps |
| Writer/auditor | content quality, source quality, article craft, SEO/AEO/GEO | No unless assigned | scored audit and revision guidance |

Worker subagents may edit only when the work can be partitioned by disjoint file/module ownership.

## Dispatch Rules

1. Start with the project state, branch, dirty worktree, active PRD, and allowed phase.
2. Audit required capabilities, tools, access, and skills before choosing subagents.
3. Decide whether subagents are useful. Do not use them for trivial one-file changes.
4. Keep the immediate blocker local. Do not delegate the next result that the main agent needs before it can proceed.
5. Delegate sidecar tasks that can run in parallel: architecture exploration, test discovery, visual QA, security review, or independent module implementation.
6. Give every subagent a concrete scope, allowed files, forbidden files, output contract, and stop condition.
7. Use read-only reviewers by default. Only use write-capable workers when file ownership is disjoint.
8. Require proof before done: tests, screenshots, logs, API responses, diff review, deploy checks, or audit artifact.
9. Integrate findings once. Do not let reviewer agents endlessly relitigate P2/P3 polish.

## Capability, Access, and Skill Audit

Before spawning subagents, list the powers required for the task:

| Area | Questions |
| --- | --- |
| Codex skills | Which local/global skills should be used? Which are required, optional, or unsafe for this task? |
| Project skills or docs | Which project-local runbooks, PRDs, `CODEX.md`, `AGENTS.md`, or skill docs must agents read? |
| MCP tools and connectors | Which MCP servers, connectors, or app tools are needed? Are they installed and callable in this session? |
| MCP access | Which accounts, scopes, OAuth grants, tenant access, or permissions are required? |
| CLI access | Which CLIs are needed: `git`, `gh`, `supabase`, `vercel`, package manager, test runner, database CLI, or project scripts? |
| Browser or Computer Use | Is rendered web state, screenshots, authenticated UI, or native desktop UI required? |
| External credentials | Are API keys, service accounts, sandbox accounts, billing access, or secrets required? Never print secret values. |
| Product runtime surface | What will the shipped product use: API, SDK, webhook, database, queue, MCP, or agent delegation? |
| Agent build surface | What will Codex use while building: CLI, MCP, connector, browser automation, fixtures, dry run, or local scripts? |
| Mock and live verification | What can be mocked now, and what must be verified live before ship? |

If the task depends on missing access, do not pretend the agent can verify it. Define the fallback: mock, fixture, dry run, user action, connector install, sandbox setup, or blocked status.

## QA Plan Contract

Every meaningful implementation should define:

- goal
- critical user or operator journeys
- risk areas
- required skills, tools, MCPs, CLIs, connectors, and access
- required agents or reviewer roles
- acceptance criteria
- verification commands
- browser/device checks if UI exists
- data/security/privacy checks if relevant
- required evidence artifacts
- known non-goals
- done means

## Default Role Selection

### FORQQ Public Site

Use:

- explorer for current homepage voice, layout, route structure, and design constraints
- main implementer for the route or section
- design/accessibility reviewer for responsive screenshots, text overflow, UI hierarchy, and brand fit
- product reviewer for anti-hype, approval-first voice, and whether the page creates intrigue before explanation

Proof:

- desktop and mobile rendered screenshots
- route loads without stale dev-server confusion
- copy follows the FORQQ voice and stated constraints

### FORQQ Trust/Admin Surfaces

Use:

- explorer for PRD boundary, schema constraints, access rules, and existing trust components
- main implementer for the governed slice
- security/privacy reviewer for authorization, raw-debug leakage, tenant/user boundaries, and audit safety
- QA verifier for locked states, empty/error states, and read-only behavior

Proof:

- targeted tests
- route/browser verification
- evidence that no fake Brand Health score, raw protocol leakage, or schema expansion slipped in

### Nordic Education Production Bug

Use:

- explorer for exact failing production path and current deployment state
- main implementer for the fix
- QA verifier for regression coverage of the broken payload or journey
- deploy verifier only after merge or deploy work is explicitly requested

Proof:

- failing path explained
- regression test covers root cause
- local commit, remote commit, and production deploy are separated when reporting status

### Business Intelligence / The Loom

Use:

- research explorer for source packet and source quality
- writer/producer for article, newsletter, or audit artifact
- audit reviewer for craft canon, SEO/AEO/GEO, claims, and distribution fit
- final verifier for one publishable artifact plus one audit artifact

Proof:

- source list
- quality audit
- explicit residual weaknesses before expansion into a larger agent business

### Codex Brain Itself

Use:

- explorer for existing lifecycle, templates, skills, and workflow manifest
- main implementer for scoped framework/template/skill changes
- reviewer for consistency with existing gates and no overbuilt runtime claims
- validator for `npm run check` and `npm run install-global-skills -- --dry-run`

Proof:

- changed files are focused
- global skill validation passes if skills changed
- lifecycle language stays conservative and project-local

## Universal Prompt

Use this prompt inside any project folder when you want Codex to plan and use multiple agents for QA, testing, analysis, writing, or review:

```text
Use Codex Brain style QA subagent orchestration for this project.

First, inspect the project context before acting:
- current branch and dirty worktree
- project instructions such as CODEX.md, AGENTS.md, README, docs, PRD, Build Plan, Design DNA, and test strategy
- package scripts, test commands, routes, deployment notes, and known constraints
- available Codex skills, project skills, MCP tools/connectors, CLI tools, browser/computer-use surfaces, credentials/access assumptions, mocks, and live verification needs
- current task, acceptance criteria, and risk areas

Then propose the smallest powerful capability and subagent plan.

Rules:
- Keep the main agent responsible for the critical path and final integration.
- Use subagents only where they add independent value.
- Prefer read-only explorer/reviewer/verifier agents unless write scopes are clearly disjoint.
- Do not spawn agents that edit the same files or chase the same question.
- Give each subagent a concrete scope, allowed files, forbidden files, expected output, and stop condition.
- Audit required skills, MCP tools, MCP access, CLI access, credentials, mocks, and live verification before spawning agents.
- Separate Codex implementation surfaces from product runtime surfaces.
- Make QA evidence mandatory before calling the task done.
- Separate P0/P1 blockers from P2/P3 improvements.
- Preserve existing user changes and project conventions.
- Do not use broad refactors unless required by the task.

Create this plan before implementation:

1. Task summary:
2. Current project constraints:
3. Risk classification: low / medium / high
4. Critical user or operator journeys:
5. Capability and skill audit:
   - Required Codex/project skills:
   - Required MCP tools/connectors:
   - Required MCP access, accounts, scopes, or OAuth grants:
   - Required CLI tools and local commands:
   - Browser or Computer Use needs:
   - Product runtime surfaces:
   - Codex implementation surfaces:
   - Credentials, sandbox, mock, or live verification needs:
   - Access blockers:
6. Subagents to invoke:
   - Agent name:
   - Purpose:
   - Read/write permission:
   - Files or modules owned:
   - Skills/tools/access allowed:
   - Questions to answer:
   - Expected output:
   - Stop condition:
7. Main-agent work plan:
8. QA plan:
   - commands to run:
   - browser or screenshot checks:
   - data/security/privacy checks:
   - regression tests:
   - required evidence:
9. Done means:
10. What will not be done:

After the plan, execute efficiently:
- start independent read-only/explorer/verifier tasks in parallel when available
- do local implementation only for the assigned scope
- integrate reviewer findings once
- run the agreed verification
- report exactly what passed, what failed, and what remains risky
```

## Completion Report

When the orchestration is finished, report:

- subagents used and why
- files changed
- verification run
- screenshots or evidence gathered if relevant
- P0/P1 findings resolved
- P2/P3 findings deferred
- residual risks
- next action

Do not claim the task is done because agents were used. Claim done only when the evidence supports it.

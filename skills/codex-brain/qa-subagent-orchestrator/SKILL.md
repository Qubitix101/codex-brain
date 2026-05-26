---
name: qa-subagent-orchestrator
description: Use when planning multiple Codex subagents for QA, testing, analysis, review, writing, or verification while keeping scopes disjoint and evidence mandatory.
version: 0.1.0
---

# QA Subagent Orchestrator

Plan high-leverage subagent use for software, product, content, and research work. This skill makes Codex act like an engineering lead: audit required powers first, keep the critical path local, delegate independent checks, and require proof before done.

## When to Use

- The user asks to use multiple agents, subagents, reviewers, QA agents, or parallel checks.
- A task needs testing, browser verification, security review, design review, product review, or content audit.
- A task needs MCP tools, MCP access, CLI access, browser/computer-use surfaces, project skills, or external credentials.
- A Standard or Full project has user-facing, production, data, auth, payment, AI, retrieval, memory, or external-action risk.
- The work would benefit from separate explorer, implementer, verifier, and reviewer perspectives.
- The user asks for a reusable prompt for powerful, optimized Codex agent use.

## Do Not Use

- The task is a trivial one-file change with an obvious verification command.
- The user only asks a conceptual question and does not want project execution.
- The required subagent result is the immediate blocker for the main agent's next step.
- The project has no clear acceptance criteria, verification path, or scope boundary.

## Core Workflow

1. **Inspect context first.** Read project instructions, state, PRD, Build Plan, Design DNA, tests, package scripts, branch, and dirty worktree notes.
2. **Classify risk.** Mark low, medium, or high based on user impact, data, auth, payments, AI, deployment, and production blast radius.
3. **Audit capabilities and skills.** List required Codex skills, project skills, MCP tools/connectors, MCP access, CLI access, browser/computer-use surfaces, credentials, mocks, and live verification needs.
4. **Separate surfaces.** Distinguish Codex implementation surfaces from product runtime surfaces.
5. **Choose the smallest useful team.** Prefer one main implementer plus read-only explorer, QA verifier, and reviewer roles.
6. **Keep the critical path local.** The main agent handles the next blocking step and final integration.
7. **Define task contracts.** Every subagent gets purpose, permission, scope, files/modules, allowed skills/tools/access, questions, expected output, and stop condition.
8. **Protect write scopes.** Use write-capable workers only when file/module ownership is disjoint.
9. **Make QA explicit.** Define commands, browser checks, screenshots, data/security/privacy checks, regression tests, and evidence before implementation.
10. **Integrate once.** Resolve P0/P1 findings. Defer P2/P3 polish only with a clear note.
11. **Report evidence.** Final status must say what passed, what failed, what changed, and what remains risky.

## Capability and Skill Audit

Before spawning agents, produce:

- required Codex skills
- required project-local skills, runbooks, or instructions
- required MCP servers, MCP tools, connectors, or app tools
- required MCP accounts, OAuth grants, scopes, tenant access, or permissions
- required CLI tools and local commands
- required browser automation or Computer Use surfaces
- product runtime surfaces: API, SDK, webhook, database, queue, MCP, or agent delegation
- Codex implementation surfaces: CLI, MCP, connector, browser, fixture, dry run, or script
- credentials, sandbox, mock, or live verification needs
- missing access and the fallback: mock, fixture, dry run, user action, connector install, sandbox setup, or blocked status

## Role Patterns

- **Explorer:** read-only architecture, constraints, root cause, existing patterns.
- **Main implementer:** owns the active change and final integration.
- **QA verifier:** tests, browser checks, screenshots, regressions, acceptance evidence.
- **Code reviewer:** correctness, maintainability, missing tests, behavioral regression.
- **Security/privacy reviewer:** auth, authorization, tenant boundaries, PII, secrets, approvals.
- **Design/accessibility reviewer:** responsive behavior, text overflow, keyboard, labels, contrast, visual fit.
- **Data/reliability reviewer:** migrations, retries, idempotency, observability, performance.
- **Writer/auditor:** source quality, article craft, SEO/AEO/GEO, claims, editorial fit.

## Universal Prompt

Use this prompt inside any project:

```text
Use professional QA subagent orchestration for this task.

First inspect the project context:
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

## Project Examples

### FORQQ Public Site

Use explorer for homepage voice and route patterns, main implementer for the route, design/accessibility reviewer for desktop and mobile screenshots, and product reviewer for approval-first anti-hype copy.

### FORQQ Trust/Admin Surface

Use explorer for PRD and schema boundaries, main implementer for the governed slice, security reviewer for access/raw-debug leakage, and QA verifier for locked/read-only/error states.

### Nordic Education Production Bug

Use explorer for the exact failing path, main implementer for the fix, QA verifier for regression coverage, and deploy verifier only when merge or deployment is explicitly in scope.

### Business Intelligence / The Loom

Use research explorer for source packet quality, writer for the artifact, audit reviewer for craft and SEO/AEO/GEO, and final verifier for one publishable artifact plus one audit artifact.

## Output Contract

Return:

- subagents warranted: yes/no
- risk classification
- capability, access, and skill audit
- selected roles and why
- main-agent critical path
- subagent contracts
- QA plan
- evidence required before done
- P0/P1 blockers to watch
- disjoint write scopes if workers are used
- final report format

## Quality Bar

- Do not use agents because it sounds powerful. Use them where independent judgment catches real risk.
- Do not delegate overlapping edits.
- Do not delegate the immediate blocker if the main agent cannot continue without it.
- Do not mark done without evidence.
- Do not allow P2/P3 reviewer comments to bury P0/P1 blockers.
- Do not claim verification passed unless commands or checks actually ran.

## Examples

### Example: Web Feature

```text
Roles: explorer reads current route/component patterns; main implementer changes the route; QA verifier runs tests and browser screenshots; design reviewer checks responsive overflow and visual fit.
Done means: tests pass, desktop/mobile screenshots verified, acceptance criteria mapped to evidence, no P0/P1 review findings remain.
```

### Example: Production Bug

```text
Roles: explorer traces root cause; main implementer fixes the failing path; QA verifier adds or runs regression coverage; reviewer checks for broader data/security impact.
Done means: root cause explained, regression proof exists, local and remote/deploy status are reported separately.
```

## Trust Level

T1 - Instructions only. This skill plans subagent usage and QA evidence. It does not execute external actions by itself.

# Codex Brain Usage Guide

This guide explains how to use Codex Brain from first idea to shipped product and back into the learning loop.

The short version:

```text
Classify -> Validate -> Research -> Agentic Opportunity -> Agent Engineering -> Capability and Access -> Plan -> Design DNA -> Decompose -> Execute -> Review -> Ship -> Learn
```

The important version:

Codex must not guess its way through high-stakes product creation. It must know the project mode, current phase, allowed actions, forbidden actions, required artifacts, and unresolved blockers.

## 1. Start a New Project

Bootstrap:

```bash
node ~/codex-brain/scripts/bootstrap-project.mjs --project "[project-name]" --mode auto
```

Then tell Codex:

```text
Use Codex Brain. Read CODEX.md. Classify this project and tell me the next allowed action.
```

The shortest reliable trigger after bootstrap is:

```text
Use Codex Brain for this project.
```

Bootstrap creates a local `CODEX.md` from `templates/shared/project-codex.template.md`, plus `.codex-brain/USE-CODEX-BRAIN.md`, so future sessions have the instruction locally.

To let the repo compute the next action:

```bash
npm run next-action -- --dir "[project-root]"
```

Codex should:

1. Read `.codex-brain/state.json`.
2. Read `.codex-brain/classification.json`.
3. Read `.codex-brain/project-context.md` and `.codex-brain/memory/` if present.
4. Classify the project as Light, Standard, or Full.
5. Explain the mode recommendation.
6. Ask for approval if Standard or Full.
7. Refuse to implement until the active gate allows implementation.

## 2. Classification

Use:

```bash
node ~/codex-brain/scripts/classify-project.mjs \
  --project "[project-name]" \
  --brief "[what we are building]"
```

The classifier is intentionally conservative.

Full mode is triggered by:

- multi-tenancy
- enterprise customers
- regulated/high-impact domain
- EU personal data and meaningful user risk
- payments plus trust/compliance pressure
- AI as a core feature
- high-scale ambition
- world-class/unicorn ambition

The user can override the mode, but Codex must explain the risk of downgrading.

## 3. Light Mode Flow

Use Light for low-risk tools and prototypes.

Minimum flow:

1. Brief
2. Basic technical plan
3. Design DNA if UI exists
4. Small PRD/checklist
5. Execute
6. Run checks
7. Capture lessons

Light mode is not blind mode. It is focused mode.

For very small, low-risk tasks, use Quick Flow:

1. Confirm no escalation triggers exist.
2. Copy `templates/light/quick-spec.template.md`.
3. Define acceptance criteria and verification.
4. Implement one vertical slice.
5. Run checks.
6. Update memory and lessons.

## 4. Standard Mode Flow

Use Standard for real products with users.

Required:

1. Validation
2. Focused research
3. Agentic Opportunity and Agent Engineering gates if AI/agentic value is relevant
4. Capability and Access Map if external systems are relevant
5. Build Plan
6. Design DNA if UI exists
7. PRDs
8. Execution loop
9. Security/privacy/accessibility review where relevant
10. Ship checklist
11. Lessons

## 5. Full Mode Flow

Use Full for glory-grade products.

Full mode requires the deep systems:

- `frameworks/research-deep-methodology.md`
- `frameworks/build-plan-deep-methodology.md`
- `frameworks/quality-gate-matrix.md`
- `frameworks/narrative-validation.md`
- `frameworks/test-architecture.md`
- `frameworks/context-distillation.md`
- `catalogs/full-mode-coverage-catalog.json`

Recommended sequence:

```text
1. Classification approved as Full
2. Validation with market/moat/pre-mortem
3. Deep research using the Full-mode coverage catalog
4. Evidence ledger
5. Agentic Opportunity Audit and Intelligence System Plan if AI/automation/workflow OS value is relevant
6. Agent Engineering Audit and Skill Inventory if agents, retrieval, model routing, or procedural skills are relevant
7. Capability and Access Map
8. Design references and Design DNA
9. Master Build Plan
10. ADRs for major choices
11. Test strategy and traceability matrix
12. Promise-to-spec audit
13. Phase PRDs with vertical slices
14. Execution loop
15. Specialist reviews
16. Ship gate
17. Postmortem and lessons
```

## 6. Research Procedure

For Full mode:

1. Copy `templates/full/research-matrix.template.md`.
2. Create one research file per category.
3. Maintain `templates/full/evidence-ledger.template.json`.
4. End with synthesis decisions.

Every category must be:

- complete
- not applicable with justification
- blocked with owner and deadline

Silent omission is not allowed.

## 7. Agentic Opportunity Procedure

Before capability/access planning, audit whether the idea should become a normal app, AI-assisted workflow, memory-backed copilot, workflow agent, bounded autonomous operator, or domain operating system.

Start with:

```bash
npm run plan-agentic-system -- --brief "[what we are building]" --mode full --markdown
```

Then copy or fill:

```text
templates/shared/agentic-opportunity-audit.template.md -> docs/agentic-opportunity-audit.md
templates/shared/intelligence-system-plan.template.md -> docs/intelligence-system-plan.md
```

Decide:

- recommended maturity level now
- highest plausible maturity level later
- normal app version
- AI-assisted version
- agentic OS version
- first closed intelligence loop
- memory, sensing, tools, routines, approvals, evals, and learning requirements
- overbuild/underbuild risk
- deferred agentic layers

Agent Engineering and capability/access planning are blocked while an AI-core or automation-heavy product has no maturity decision or first closed loop.

## 8. Agent Engineering and Skill Factory Procedure

Before capability/access planning, audit whether the intended agent can survive production.

Start with:

```bash
npm run plan-agent-skills -- --brief "[what we are building]" --mode full --markdown
```

Then copy or fill:

```text
templates/shared/agent-engineering-audit.template.md -> docs/agent-engineering-audit.md
templates/shared/skill-inventory.template.md -> docs/skill-inventory.md
templates/shared/skill-spec.template.md -> docs/skills/[skill-name].md when a candidate needs its own spec
```

Decide:

- seven-discipline readiness across system design, tool contracts, retrieval, reliability, security/safety, evals/observability, and product trust UX
- model/provider routing policy for latest research, coding, reasoning, retrieval, structured data, external actions, browser verification, and desktop workflows
- required procedural skills
- existing skills to reuse
- new skills to generate
- skill trust levels T0-T4
- which skills are instructions-only vs scripted vs externally acting
- approval, logging, rollback, and eval requirements for T2-T4 skills

Capability/access planning is blocked while an L3+ agent has no agent-engineering audit, model-routing policy, or skill inventory.

## 9. Capability and Access Procedure

Before Build Plan approval, create the capability/access map when the product touches external systems, authenticated apps, APIs, SDKs, CLIs, MCP servers, media generation providers, deployment platforms, browser automation, desktop apps, or paid vendors.

Start with:

```bash
npm run plan-capabilities -- --brief "[what we are building]" --mode standard --markdown
```

Then copy or fill:

```text
templates/shared/capability-access-map.template.md -> docs/capability-access-map.md
```

For each capability, decide:

- product runtime surface
- agent implementation surface
- setup/testing surface
- required credentials, scopes, accounts, OAuth apps, webhooks, billing, and sandbox access
- mock strategy
- first live verification command or tool
- blocked-until user action

Use the router for specific task decisions:

```bash
npm run route-tool -- --task "create a GitHub PR and inspect failing CI"
```

Build Plan approval is blocked while a critical required-now capability has no access path.

## 10. Build Plan Procedure

For Full mode:

1. Copy `templates/full/master-build-plan.template.md` to `docs/build-plan.md`.
2. Fill all applicable sections.
3. Create ADRs from `templates/full/adr.template.md`.
4. Run the Build Plan checklist.
5. Reference `docs/agentic-opportunity-audit.md` and `docs/intelligence-system-plan.md` when AI/automation is relevant.
6. Reference `docs/agent-engineering-audit.md` and `docs/skill-inventory.md` when agents, retrieval, model routing, or procedural skills are relevant.
7. Reference `docs/capability-access-map.md`.
8. Do not create PRDs until P0/P1 plan gaps are resolved.

## 11. Design DNA Procedure

For any user-facing UI:

1. Collect references into `design/references/`.
2. Use `templates/shared/design-dna.template.md`.
3. Define mood, colors, type, components, motion, accessibility, and do-not-use list.
4. Get user approval.
5. Use `templates/full/frontend-visual-qa.template.md` after major UI screens are built.

Frontend work is blocked before Design DNA approval.

## 12. PRD Procedure

Each PRD must include:

- goal
- prerequisites
- references
- allowed scope
- tasks
- acceptance criteria
- verification commands
- completion criteria

Each task should be small enough for one execution loop.

Use vertical slices when possible:

- slice through schema, service, API, UI/integration, tests, and verification
- name the slice by demo outcome
- keep every checkbox verifiable

Validate plans with:

```bash
npm run verify-plan -- docs/prd/[file].md
```

## 13. Execution Procedure

Codex executes one task at a time:

1. Read state.
2. Read current PRD.
3. Select unblocked task.
4. Select the execution surface: CLI, API/SDK, MCP, generated harness, browser, or Computer Use.
5. Check dirty worktree.
6. Implement.
7. Run checks.
8. Review diff.
9. Update task status.
10. Capture task record.
11. Consider lessons.
12. Stop.

Parallel execution requires explicit task assignment or task claiming.

## 14. Review Procedure

Use specialist roles:

- product strategist
- adversary
- architect / architecture strategist
- database scaler
- security and GDPR reviewer
- design director
- accessibility reviewer
- AI orchestration reviewer
- performance and reliability reviewer

Full mode cannot ship with unresolved critical/high findings.

## 15. Ship Procedure

Ship only when:

- tests pass
- build passes
- smoke tests exist
- monitoring exists
- rollback exists
- security/privacy/accessibility blockers are resolved
- user approves launch
- lesson capture is ready

## 16. Learning Procedure

At project end:

1. Capture lessons as JSON.
2. Write postmortem if anything meaningful failed or surprised us.
3. Decide whether lessons should update frameworks, schemas, templates, scripts, or agent prompts.
4. Promote proven lessons back into Codex Brain.

## 16.5 Context Procedure

At session start, phase changes, and major decisions:

1. Read `.codex-brain/project-context.md`.
2. Read `.codex-brain/memory/active-context.md`.
3. Run or produce a session brief.
4. Update memory after meaningful changes.
5. Distill large research or Build Plan artifacts before long execution phases.

Useful commands:

```bash
npm run session-brief -- --dir "[project-root]"
npm run distill-context -- --dir "[project-root]" docs/build-plan.md .codex-brain/research
```

## 16.6 Session Close Procedure

At the end of every meaningful session, save context.

Use:

```bash
npm run save-context -- --dir "[project-root]" \
  --summary "what happened" \
  --completed "completed item" \
  --decision "decision made" \
  --check "check command/result" \
  --blocker "blocker if any" \
  --next "the next allowed action"
```

Then check:

```bash
npm run context-health -- --dir "[project-root]"
```

This creates `.codex-brain/sessions/session-[timestamp].json`, updates active context, updates progress memory, and writes the latest next action into `.codex-brain/state.json`.

Reusable learning still belongs in `.codex-brain/lessons/*.json`. Ordinary session progress belongs in `.codex-brain/sessions/*.json`.

## 17. Downgrade Protocol

If the user asks to downgrade from Full to Standard or Light:

Codex must state:

- what rigor is removed
- what risks increase
- which gates are no longer required
- which gates should remain despite downgrade

For high-risk projects, Codex should strongly recommend against downgrading.

## 18. Glory Rule

If the user says the goal is world-class, unicorn-level, top-ten, enterprise-grade, or no-corners-cut:

- classify as Full
- use deep research
- use deep Build Plan
- require Design DNA
- require narrative validation
- require specialist review
- require ship and learning loops

Speed is not the optimization target. Correctness, quality, trust, and product power are.

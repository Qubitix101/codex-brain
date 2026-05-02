# Codex Brain Usage Guide

This guide explains how to use Codex Brain from first idea to shipped product and back into the learning loop.

The short version:

```text
Classify -> Validate -> Research -> Plan -> Design DNA -> Decompose -> Execute -> Review -> Ship -> Learn
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
3. Build Plan
4. Design DNA if UI exists
5. PRDs
6. Execution loop
7. Security/privacy/accessibility review where relevant
8. Ship checklist
9. Lessons

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
5. Design references and Design DNA
6. Master Build Plan
7. ADRs for major choices
8. Test strategy and traceability matrix
9. Promise-to-spec audit
10. Phase PRDs with vertical slices
11. Execution loop
12. Specialist reviews
13. Ship gate
14. Postmortem and lessons
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

## 7. Build Plan Procedure

For Full mode:

1. Copy `templates/full/master-build-plan.template.md` to `docs/build-plan.md`.
2. Fill all applicable sections.
3. Create ADRs from `templates/full/adr.template.md`.
4. Run the Build Plan checklist.
5. Do not create PRDs until P0/P1 plan gaps are resolved.

## 8. Design DNA Procedure

For any user-facing UI:

1. Collect references into `design/references/`.
2. Use `templates/shared/design-dna.template.md`.
3. Define mood, colors, type, components, motion, accessibility, and do-not-use list.
4. Get user approval.
5. Use `templates/full/frontend-visual-qa.template.md` after major UI screens are built.

Frontend work is blocked before Design DNA approval.

## 9. PRD Procedure

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

## 10. Execution Procedure

Codex executes one task at a time:

1. Read state.
2. Read current PRD.
3. Select unblocked task.
4. Check dirty worktree.
5. Implement.
6. Run checks.
7. Review diff.
8. Update task status.
9. Capture task record.
10. Consider lessons.
11. Stop.

Parallel execution requires explicit task assignment or task claiming.

## 11. Review Procedure

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

## 12. Ship Procedure

Ship only when:

- tests pass
- build passes
- smoke tests exist
- monitoring exists
- rollback exists
- security/privacy/accessibility blockers are resolved
- user approves launch
- lesson capture is ready

## 13. Learning Procedure

At project end:

1. Capture lessons as JSON.
2. Write postmortem if anything meaningful failed or surprised us.
3. Decide whether lessons should update frameworks, schemas, templates, scripts, or agent prompts.
4. Promote proven lessons back into Codex Brain.

## 13.5 Context Procedure

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

## 14. Downgrade Protocol

If the user asks to downgrade from Full to Standard or Light:

Codex must state:

- what rigor is removed
- what risks increase
- which gates are no longer required
- which gates should remain despite downgrade

For high-risk projects, Codex should strongly recommend against downgrading.

## 15. Glory Rule

If the user says the goal is world-class, unicorn-level, top-ten, enterprise-grade, or no-corners-cut:

- classify as Full
- use deep research
- use deep Build Plan
- require Design DNA
- require narrative validation
- require specialist review
- require ship and learning loops

Speed is not the optimization target. Correctness, quality, trust, and product power are.

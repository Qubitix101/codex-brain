# Codex Brain

Codex Brain is a Codex-native operating system for building serious software products methodically.

It exists to stop AI-assisted projects from failing in predictable ways:

- building before the idea is validated
- writing code before the architecture is understood
- choosing a database without a scale model
- ignoring security, GDPR, billing, observability, or reliability until too late
- producing generic frontend design because visual taste was never captured
- losing lessons from one project instead of feeding them back into the next one

The goal is not more process for its own sake. The goal is adaptive rigor: light where speed matters, full where quality and risk demand it.

## The Core Idea

Every project runs through three loops:

1. Build Loop: classify, validate, research, plan, design, decompose, execute, review, ship.
2. Execution Loop: one task, one patch, one verification pass, one state update.
3. Learning Loop: project lessons become reusable rules, gates, templates, and checklists.
4. Context Loop: state, memory, distillates, and project context keep future Codex sessions aligned.

Codex Brain is designed for future Codex sessions. The repository is both a human playbook and a machine-readable control layer.

## Rigor Modes

Every project is classified into one of three modes.

| Mode | Use When | Process Weight |
| --- | --- | --- |
| Light | Internal tools, prototypes, small static sites, simple scripts | Fast, focused, still not blind |
| Standard | Real user-facing apps, SaaS MVPs, dashboards, products with user data | Structured product and engineering discipline |
| Full | Unicorn-level, regulated, multi-tenant, paid, AI-core, enterprise, marketplace, health, finance, education, legal, or high-scale products | Maximum rigor before execution |

Codex proposes the mode using `schemas/project-classification.schema.json` and `scripts/classify-project.mjs`.
The user approves or overrides it.

## Lifecycle

| Phase | Name | Gate Output |
| --- | --- | --- |
| 0 | Classify | Light, Standard, or Full mode selected and approved |
| 1 | Validate | Go, conditional go, pivot, or no-go decision |
| 2 | Research | Evidence collected for the required mode |
| 3 | Plan | Build Plan with architecture, data, product, security, and delivery decisions |
| 3.5 | Design DNA | User-approved aesthetics before frontend implementation |
| 4 | Decompose | PRDs with atomic tasks and acceptance criteria |
| 5 | Execute | Working code through task-level execution loops |
| 6 | Review | Product, code, security, privacy, accessibility, performance, and architecture review |
| 7 | Ship | Deployment, monitoring, rollback |
| 8 | Learn | Lessons, memory updates, distillates, and brain promotion candidates |

## Repository Structure

```text
codex-brain/
├── CODEX.md                         # System entrypoint for future Codex sessions
├── README.md
├── USAGE-GUIDE.md                    # End-to-end operating guide
├── frameworks/
│   ├── lifecycle.md                  # Master operating model
│   ├── research-deep-methodology.md   # Full-mode deep research system
│   ├── build-plan-deep-methodology.md  # Exhaustive Full-mode Build Plan system
│   ├── rigor-modes.md                # Light / Standard / Full classification
│   ├── validation.md                 # Idea and product validation
│   ├── research.md                   # Evidence requirements by mode
│   ├── build-plan.md                 # Build Plan requirements
│   ├── design-dna.md                 # Frontend aesthetics gate
│   ├── frontend-visual-qa.md         # Visual verification after UI build
│   ├── narrative-validation.md        # Promise-to-spec audit
│   ├── governance-and-evolution.md    # How lessons safely upgrade the brain
│   ├── competitive-benchmark.md       # BMAD / TracerKit / Memory Bank benchmark
│   ├── context-routing-and-help.md     # Next-action routing
│   ├── quick-flow.md                  # Low-risk fast path
│   ├── vertical-slice-planning.md      # Demoable execution slicing
│   ├── context-distillation.md         # Compact context packs
│   ├── test-architecture.md            # Risk-ranked testing and traceability
│   ├── project-context.md              # Per-project implementation constitution
│   ├── expert-councils.md              # Structured specialist review councils
│   ├── skill-workflow-architecture.md  # Workflow manifest and step architecture
│   ├── decomposition.md              # PRDs and task shape
│   ├── execution-loop.md             # Codex task execution protocol
│   ├── review-and-ship.md            # Review swarm and launch gates
│   ├── learning-loop.md              # Structured project learning
│   ├── database-scale.md             # Data architecture and scale thinking
│   ├── security-gdpr.md              # Security, privacy, GDPR, compliance
│   ├── quality-gate-matrix.md        # P0/P1 blockers by mode and phase
│   └── world-class-quality.md        # Top-tier product quality bar
├── schemas/                          # Machine-readable state and lesson contracts
├── catalogs/                         # Full-mode and workflow routing catalogs
├── templates/                        # Light / Standard / Full project templates
├── workflows/                        # Small executable workflow step guides
├── scripts/                          # Local validators and helpers
├── agents/                           # Role prompts for optional specialist review
├── examples/                         # Example state and classification files
└── postmortems/                      # Learning inputs from real projects
```

## Quick Start

Create a new project and initialize Codex Brain state:

```bash
node ~/codex-brain/scripts/bootstrap-project.mjs --project "my-product" --mode auto
```

Then ask Codex:

```text
Use Codex Brain. Read CODEX.md, classify this project, and tell me the next allowed action.
```

Useful commands:

```bash
npm run next-action -- --dir /path/to/project
npm run session-brief -- --dir /path/to/project
npm run verify-plan -- /path/to/project/docs/prd/some-prd.md
npm run distill-context -- --dir /path/to/project docs/build-plan.md .codex-brain/research
```

## Non-Negotiables

- No frontend implementation before Design DNA is approved.
- No serious backend implementation before database, auth, security, and privacy assumptions are documented.
- No multi-tenant product without an isolation model.
- No paid product without billing edge cases.
- No European user data without GDPR analysis.
- No AI-core product without model, retrieval, eval, fallback, and safety plans.
- No Full-mode product without test strategy and traceability matrix.
- No major project continuation without project context and session brief.
- No shipping without monitoring and rollback.
- No project ends without lesson capture.

## Philosophy

Better models do not remove the need for methodology. They raise the cost of weak methodology because they can build the wrong thing faster.

Codex Brain uses Codex at full power by giving it a disciplined product, engineering, design, security, compliance, and learning system to operate inside.

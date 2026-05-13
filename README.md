# Codex Brain

Codex Brain is a Codex-native operating system for building serious software products methodically.

It is especially strict for AI-native products: before implementation, it decides whether the idea should become a normal app, an AI-assisted workflow, a memory-backed copilot, a workflow agent, a bounded autonomous operator, or a full domain operating system, selects the right intelligence architecture, defines the Agent OS runtime kernel, maps whether the product should collaborate with other agents or operating systems, locks down Agentic Zero Trust controls, then maps the production-agent skills and access surfaces needed to build it safely.

It exists to stop AI-assisted projects from failing in predictable ways:

- building before the idea is validated
- writing code before the architecture is understood
- choosing a database without a scale model
- ignoring security, GDPR, billing, observability, or reliability until too late
- producing generic frontend design because visual taste was never captured
- losing lessons from one project instead of feeding them back into the next one

The goal is not more process for its own sake. The goal is adaptive rigor: light where speed matters, full where quality and risk demand it.

## The Core Idea

Every project runs through four loops:

1. Build Loop: classify, validate, research, audit agentic opportunity, select intelligence architecture, audit agent engineering and skills, define the Agent OS runtime, map agent network/interoperability boundaries, lock down Agentic Zero Trust, map capabilities and access, plan, design, decompose, execute, review, ship.
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
| 2.25 | Agentic Opportunity | Decide normal app vs AI workflow vs memory-backed copilot vs agentic/domain operating system |
| 2.3 | Intelligence Architecture Selection | Choose model-only, ADK/workflow, semantic RAG, structured retrieval, extraction, memory, action, and routine substrates per loop |
| 2.35 | Agent Engineering and Skill Factory | Audit production-agent readiness and map procedural skills, trust levels, evals, and model routing |
| 2.4 | Agent OS Runtime | Define scheduler, memory manager, tool sandbox, identity, observability, governance, recovery, budgets, agent registry, and human control |
| 2.45 | Agent Network and Interoperability | Define agent cards, topology, delegation boundaries, MCP vs A2A-style decisions, context sharing, streaming, traces, recovery, and versioning |
| 2.47 | Agentic Zero Trust | Define non-human identity, JIT credentials, per-action authorization, registry trust, policy enforcement, memory integrity, sandboxing, immutable traces, kill switches, adversarial evals, and incident response |
| 2.5 | Capability and Access | Map required APIs, SDKs, CLIs, MCP servers, browser/computer-use paths, credentials, mocks, and live verification |
| 3 | Plan | Build Plan with architecture, data, product, security, integrations, access, and delivery decisions |
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
│   ├── agentic-opportunity-audit.md   # Gate 2.25 agentic/system opportunity audit
│   ├── intelligence-system-plan.md    # High-level intelligence system architecture
│   ├── intelligence-architecture-selection.md # Gate 2.3 RAG / ADK / structured retrieval selection
│   ├── agent-engineering-skill-stack.md # Gate 2.35 production-agent readiness audit
│   ├── skill-factory.md               # Procedural skill inventory, trust, and generation model
│   ├── agent-os-runtime.md            # Gate 2.4 runtime kernel for production agents
│   ├── agent-network-interop.md       # Gate 2.45 agent-to-agent and inter-OS boundaries
│   ├── agentic-zero-trust.md          # Gate 2.47 zero-trust controls for agentic systems
│   ├── capability-access-readiness.md # Gate 2.5 access and integration readiness
│   ├── tool-surface-routing.md        # CLI / API / MCP / browser / computer-use routing
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
│   ├── session-close-and-context-save.md # Structured session handoff and context health
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
├── skills/                           # Portable global Codex skills extracted from the brain
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

For a reusable new-project prompt, see `START-NEW-PROJECT.md`.

Bootstrap also creates a local project `CODEX.md`, so future sessions can use the shorter trigger:

```text
Use Codex Brain for this project.
```

Useful commands:

```bash
npm run next-action -- --dir /path/to/project
npm run session-brief -- --dir /path/to/project
npm run verify-plan -- /path/to/project/docs/prd/some-prd.md
npm run plan-agentic-system -- --brief "what we are building" --mode full
npm run plan-intelligence-architecture -- --brief "what we are building" --mode full
npm run plan-agent-skills -- --brief "what we are building" --mode full
npm run plan-agent-os-runtime -- --brief "what we are building" --mode full
npm run plan-agent-network -- --brief "what we are building" --mode full
npm run plan-agentic-zero-trust -- --brief "what we are building" --mode full
npm run plan-capabilities -- --brief "what we are building" --mode standard
npm run route-tool -- --task "inspect the last failed GitHub Actions run"
npm run install-global-skills
npm run distill-context -- --dir /path/to/project docs/build-plan.md .codex-brain/research
npm run save-context -- --dir /path/to/project --summary "what happened" --next "next allowed action"
npm run context-health -- --dir /path/to/project
```

## Global Codex Skills

Codex Brain also ships a portable skills pack under `skills/codex-brain/`. These are instruction-only global Codex skills for focused reuse across chats and projects without loading the full project harness.

Install or refresh them with:

```bash
npm run install-global-skills
```

The installer validates each skill and writes it to `~/.codex/skills` by default.

## Non-Negotiables

- No frontend implementation before Design DNA is approved.
- No serious backend implementation before database, auth, security, and privacy assumptions are documented.
- No AI-core or automation-heavy Build Plan before agentic opportunity and intelligence-system shape are audited.
- No AI-core, retrieval-heavy, extraction-heavy, memory-backed, workflow-heavy, or automation-heavy Build Plan before intelligence architecture is selected.
- No L3+ agentic Build Plan before production-agent readiness, model routing, and procedural skills are audited.
- No L3+ agentic, multi-agent, routine-heavy, tool-using, or externally acting Build Plan before the Agent OS runtime kernel is defined.
- No agentic external access before Agentic Zero Trust defines identity, JIT credentials, per-action authorization, trusted registries, policy enforcement, memory integrity, sandboxing, immutable traces, human controls, adversarial evals, and incident response.
- No federated agentic or multi-OS Build Plan before agent cards, delegation boundaries, task contracts, protocol decisions, context sharing, identity, streaming, traces, recovery, and versioning are defined.
- No serious integration-heavy Build Plan before required capabilities, access surfaces, credentials, mocks, and live verification are mapped.
- No multi-tenant product without an isolation model.
- No paid product without billing edge cases.
- No European user data without GDPR analysis.
- No AI-core product without source-of-truth, RAG/structured retrieval/extraction, model routing, tool contracts, evals, observability, fallback, safety, and product trust plans.
- No Full-mode product without test strategy and traceability matrix.
- No major project continuation without project context and session brief.
- No meaningful session ends without a session record and next action.
- No shipping without monitoring and rollback.
- No project ends without lesson capture.

## Philosophy

Better models do not remove the need for methodology. They raise the cost of weak methodology because they can build the wrong thing faster.

Codex Brain uses Codex at full power by giving it a disciplined product, engineering, design, security, compliance, and learning system to operate inside.

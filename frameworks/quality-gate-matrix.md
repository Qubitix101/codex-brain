# Quality Gate Matrix

This matrix defines hard blockers across Light, Standard, and Full projects.

Codex should use this to determine whether it is allowed to proceed.

## Gate Severity

| Severity | Meaning | Action |
| --- | --- | --- |
| P0 | Blocks current phase | Stop and fix before proceeding |
| P1 | Blocks ship or next major phase | Fix before gate exit |
| P2 | Important but deferrable with owner | Document and track |
| P3 | Nice-to-have | Capture if useful |

## Universal P0 Blockers

These block all modes:

- no project classification
- no current phase
- coding before allowed phase
- AI-core or automation-heavy product without agentic opportunity audit
- L3+ agentic or skill-driven product without agent engineering and skill inventory audit
- frontend implementation before required Design DNA approval
- missing acceptance criteria for execution task
- marking task complete without verification
- unresolved destructive command or secret exposure
- critical external capability without known access surface
- no lesson capture considered at project end

## Classification Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Project brief exists | Required | Required | Required | P0 |
| Mode selected | Required | Required | Required | P0 |
| User approval | Optional | Required | Required | P0 |
| Risks of lower mode stated | Optional | Required | Required | P1 |
| Escalation triggers checked | Required | Required | Required | P0 |

## Validation Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Problem statement | Required | Required | Required | P0 |
| Target user | Required | Required | Required | P0 |
| Success criteria | Required | Required | Required | P0 |
| Alternatives | Optional | Required | Required | P1 |
| Market/moat | Optional | Optional | Required | P1 |
| Pre-mortem | Optional | Recommended | Required | P1 |
| Go/no-go decision | Required | Required | Required | P0 |

## Research Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Technical feasibility | Required | Required | Required | P0 |
| User/problem research | Brief | Required | Required | P1 |
| Competitor scan | Optional | Required | Required | P1 |
| Database research if persistent data | Brief | Required | Deep | P0 |
| Security research if public/user data | Brief | Required | Deep | P0 |
| GDPR screen if personal data/EU | Required if relevant | Required if relevant | Deep | P0 |
| Design references if UI | Required | Required | Deep | P0 |
| Billing research if paid | Optional | Required | Deep | P0 |
| AI eval research if AI-core | Optional | Required | Deep | P0 |
| Agentic opportunity if AI/automation/workflow OS | Required if relevant | Required if relevant | Deep | P0 |
| Agent engineering/skill factory if L3+ or skill-driven | Required if relevant | Required if relevant | Deep | P0 |
| Reliability/observability | Optional | Required | Deep | P1 |
| Capability/access research if integrations or external tools exist | Required if relevant | Required | Deep | P0 |
| Evidence ledger | Optional | Recommended | Required | P1 |

## Agentic Opportunity Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Maturity level selected | Required if AI/automation | Required if relevant | Required if relevant | P0 |
| First closed intelligence loop defined | Required if AI/automation | Required if relevant | Required if relevant | P0 |
| Normal app vs AI vs agentic OS tradeoff documented | Recommended | Required if relevant | Required | P1 |
| Memory/sensing/tool/routine/approval/eval/learning map | Required if relevant | Required if relevant | Deep | P0 |
| Overbuild and underbuild risks documented | Recommended | Required | Required | P1 |
| Deferred agentic layers with revisit triggers | Optional | Required if relevant | Required | P1 |

## Agent Engineering and Skill Factory Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Seven-discipline readiness scored | Required if L3+ | Required if relevant | Required if relevant | P0 |
| Model/provider routing policy | Required if multi-model | Required if multi-model | Required if AI-core | P0 |
| Tool-contract requirements | Required if tools | Required if tools | Required | P0 |
| Retrieval design and eval requirements | Required if RAG | Required if RAG | Required if RAG | P0 |
| Reliability controls for routines/tools | Required if automation | Required if automation | Required | P0 |
| Security/safety and approval boundaries | Required if external action | Required if external action | Required | P0 |
| Evals/observability plan | Required if AI-core | Required if AI-core | Required | P0 |
| Product trust UX surfaces | Required if user-facing AI | Required if user-facing AI | Required | P1 |
| Skill inventory with trust levels | Required if skill-driven | Required if relevant | Required if relevant | P0 |
| T2-T4 skill review controls | Required if relevant | Required if relevant | Required | P0 |

## Capability and Access Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Capability inventory | Required if external tool | Required | Required | P0 |
| Product runtime surface selected | Required if external tool | Required | Required | P0 |
| Agent implementation surface selected | Required if external tool | Required | Required | P1 |
| Credentials/scopes/accounts/webhooks listed | Required if external tool | Required | Required | P0 |
| Mock strategy | Required if live access deferred | Required | Required | P1 |
| First live verification path | Required if external tool | Required | Required | P0 |
| Destructive/external/paid action boundaries | Required if relevant | Required if relevant | Required | P0 |
| User action checklist | Required if blocked | Required | Required | P0 |

## Build Plan Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Product scope | Required | Required | Required | P0 |
| User flows | Required if UI | Required | Required | P0 |
| Architecture | Brief | Required | Deep | P0 |
| Database/data model | Required if data | Required if data | Deep | P0 |
| Auth model | Required if auth | Required if auth | Deep | P0 |
| Authorization model | Required if user data | Required | Deep | P0 |
| API/module contracts | Basic | Required | Deep | P1 |
| Security plan | Basic | Required | Deep | P0 |
| Privacy/GDPR plan | Required if relevant | Required if relevant | Deep | P0 |
| Agentic/intelligence-system plan linked | Required if AI/automation | Required if AI/automation | Required if AI/automation | P0 |
| Agent-engineering/skill inventory linked | Required if L3+ or skill-driven | Required if relevant | Required if relevant | P0 |
| Capability/access map linked | Required if external tool | Required if integrations | Required | P0 |
| Design DNA linked | Required if UI | Required if UI | Required if UI | P0 |
| Billing spec | Required if paid | Required if paid | Deep | P0 |
| AI orchestration/evals | Required if AI-core | Required if AI-core | Deep | P0 |
| Observability/ship plan | Basic | Required | Deep | P1 |
| Testing plan | Basic | Required | Deep | P0 |

## Design DNA Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| References collected | 3-5 | By page type | By workflow + competitors | P0 |
| User taste approved | Required | Required | Required | P0 |
| Tokens approved | Basic | Required | Required | P0 |
| Motion direction | Optional | Required | Required | P1 |
| Accessibility baseline | Required | Required | Deep | P0 |
| Do-not-use list | Recommended | Required | Required | P1 |
| Prototype/key screen | Optional | Recommended | Required | P1 |

## Decomposition Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| PRDs exist | Checklist ok | Required | Required | P0 |
| Atomic tasks | Required | Required | Required | P0 |
| Dependencies | Basic | Required | Required | P0 |
| Acceptance criteria | Required | Required | Required | P0 |
| Verification commands | Required | Required | Required | P0 |
| Allowed scopes | Optional | Recommended | Required | P1 |
| Narrative promise audit | Optional | Recommended | Required | P1 |

## Execution Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| One task at a time | Required | Required | Required | P0 |
| Dirty worktree checked | Required | Required | Required | P0 |
| Scope respected | Required | Required | Required | P0 |
| Tests/checks run | Required | Required | Required | P0 |
| Task record written | Recommended | Required | Required | P1 |
| Lessons considered | Required | Required | Required | P1 |
| Parallel task claiming | Required if parallel | Required if parallel | Required if parallel | P0 |

## Review Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Code review | Basic | Required | Required | P0 |
| Security review | Basic | Required | Deep | P0 |
| Privacy review | If relevant | Required if data | Deep | P0 |
| Accessibility review | If UI | Required if UI | Deep | P0 |
| Performance review | Basic | Required | Deep | P1 |
| Architecture review | Optional | Required | Deep | P1 |
| Database isolation review | If relevant | Required if multi-tenant | Deep | P0 |
| AI eval review | If AI-core | Required if AI-core | Deep | P0 |

## Ship Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Build passes | Required | Required | Required | P0 |
| Tests pass | Required | Required | Required | P0 |
| Smoke tests | Basic | Required | Required | P0 |
| Monitoring | Optional | Required | Deep | P1 |
| Rollback plan | Optional | Required | Required | P1 |
| Critical/high findings resolved | Required | Required | Required | P0 |
| User approval | Recommended | Required | Required | P0 |
| Lesson capture | Required | Required | Required | P1 |

## Full-Mode Special Blockers

These are P0/P1 for Full mode:

- Multi-tenant product without tenant isolation tests.
- Paid product without billing edge cases.
- AI-core product without evals and fallback behavior.
- AI-core or automation-heavy product without agentic maturity decision, first closed loop, approval boundaries, and eval model.
- L3+ agentic product without production-agent readiness audit, model routing, skill inventory, trust levels, and trace/eval plan.
- EU personal data without GDPR data inventory and deletion/export plan.
- Enterprise product without trust/security communication.
- User-facing product without Design DNA.
- High-scale product without database scale model.
- Product launch without monitoring and rollback.
- Critical external capability without access surface, credentials, mock plan, and live verification trigger.
- Major architecture choice without ADR.
- Promises in narrative that do not map to specification.

## Model Behavior

When Codex finds a P0:

1. Stop.
2. State the blocker.
3. Explain why it matters.
4. Create or update the missing artifact.
5. Do not proceed until the gate is satisfied.

When Codex finds a P1:

1. State the risk.
2. Ask whether to fix now or defer if user approval is required.
3. If deferred, write owner, deadline, and consequence.

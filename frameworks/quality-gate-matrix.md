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
- AI-core, retrieval-heavy, extraction-heavy, memory-backed, workflow-heavy, or automation-heavy product without intelligence architecture decision
- L3+ agentic or skill-driven product without agent engineering and skill inventory audit
- L3+ agentic, multi-agent, memory-writing, routine-heavy, tool-using, or externally acting product without Agent OS runtime plan
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
| Intelligence architecture if RAG/structured retrieval/extraction/memory/workflow/action/routine is relevant | Required if relevant | Required if relevant | Deep | P0 |
| Agent engineering/skill factory if L3+ or skill-driven | Required if relevant | Required if relevant | Deep | P0 |
| Agent OS runtime if L3+/multi-agent/memory/tool/action/routine behavior is relevant | Required if relevant | Required if relevant | Deep | P0 |
| Agent network/interoperability if agents or domain operating systems collaborate across boundaries | Required if relevant | Required if relevant | Deep | P0 |
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

## Intelligence Architecture Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Source of truth explicit per loop | Required if AI-core | Required if relevant | Required | P0 |
| Semantic RAG vs structured retrieval decision | Required if retrieval | Required if retrieval | Required if retrieval | P0 |
| Extraction schema/provenance/confidence/correction path | Required if extraction | Required if extraction | Required if extraction | P0 |
| ADK/workflow graph and state model | Required if workflow | Required if workflow | Required if workflow | P0 |
| Memory/knowledge graph read/write/delete/export policy | Required if memory | Required if memory | Required if memory | P0 |
| External action preview/approval/audit/rollback | Required if action | Required if action | Required if action | P0 |
| Routine trigger/job state/failure recovery | Required if routine | Required if routine | Required if routine | P0 |
| Eval and trace per selected substrate | Required if AI-core | Required if AI-core | Required | P0 |

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

## Agent OS Runtime Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Scheduler/orchestrator priority and queue model | Required if routines/tools | Required if relevant | Required if relevant | P0 |
| Memory manager read/write/review/delete/export policy | Required if memory | Required if memory | Required if memory | P0 |
| Tool manager and sandbox policy | Required if tools | Required if tools | Required if tools | P0 |
| Identity and delegation attribution | Required if external action | Required if external action | Required if external action | P0 |
| Observability and trace schema | Required if AI-core | Required if AI-core | Required | P0 |
| Guardrails and governance enforcement | Required if AI-core | Required if AI-core | Required | P0 |
| Recovery, idempotency, and resumability | Required if routines/actions | Required if routines/actions | Required | P0 |
| Budget and quota limits | Required if paid/autonomous | Required if paid/autonomous | Required if AI-core | P0 |
| Agent registry and role model | Required if multi-agent | Required if multi-agent | Required if multi-agent | P0 |
| Human control surface | Required if user-facing AI | Required if user-facing AI | Required | P0 |

## Agent Network and Interoperability Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Internal versus external agent/OS roster | Required if cross-agent | Required if relevant | Required if relevant | P0 |
| Agent cards for exposed and consumed capabilities | Required if exposed/consumed | Required if relevant | Required if relevant | P0 |
| Collaboration topology and orchestrator owner | Required if cross-agent | Required if relevant | Required if relevant | P0 |
| Delegation boundaries and approval thresholds | Required if delegation | Required if delegation | Required | P0 |
| Request/response/artifact/refusal schemas | Required if delegation | Required if delegation | Required | P0 |
| MCP vs A2A-style vs API/internal/event decision | Required if multiple surfaces | Required if relevant | Required | P0 |
| Memory/context sharing and redaction policy | Required if context crosses boundary | Required if context crosses boundary | Required | P0 |
| Identity/auth/trust and audit attribution | Required if remote agent | Required if remote agent | Required | P0 |
| Streaming/progress model | Required if long-running | Required if long-running | Required if long-running | P1 |
| Cross-agent observability and correlation IDs | Required if cross-agent | Required if cross-agent | Required | P0 |
| Failure/retry/timeout/fallback/escalation behavior | Required if delegation | Required if delegation | Required | P0 |
| Versioning and compatibility policy | Required if exposed/consumed | Required if exposed/consumed | Required | P1 |

## Agentic Zero Trust Gate

| Check | Light | Standard | Full | Severity |
| --- | --- | --- | --- | --- |
| Non-human identity and actor chain | Required if agentic action | Required if relevant | Required if relevant | P0 |
| JIT credentials, vaulting, rotation, and revocation | Required if credentials | Required if credentials | Required | P0 |
| Per-action authorization and approval thresholds | Required if sensitive action | Required if relevant | Required | P0 |
| Trusted registry for tools, MCP, skills, models, prompts, policies, evals, and agent cards | Required if privileged tools | Required if relevant | Required | P0 |
| AI gateway/firewall and policy enforcement | Required if tool/action flow | Required if relevant | Required | P0 |
| Memory/retrieval/model integrity | Required if memory/RAG | Required if relevant | Required | P0 |
| Sandbox, segmentation, egress, and tenant boundaries | Required if tool execution | Required if relevant | Required | P0 |
| Immutable trace and forensic replay | Required if external action | Required if relevant | Required | P0 |
| Human control, kill switch, throttles, canaries, and rollback | Required if autonomous/action | Required if relevant | Required | P0 |
| Adversarial eval suite | Required if AI action | Required if relevant | Required | P0 |
| Incident response and blast-radius plan | Required if external action | Required if relevant | Required | P0 |

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
| Intelligence-architecture decision linked | Required if AI architecture matters | Required if AI architecture matters | Required if AI architecture matters | P0 |
| Agent-engineering/skill inventory linked | Required if L3+ or skill-driven | Required if relevant | Required if relevant | P0 |
| Agent OS runtime linked | Required if L3+ | Required if relevant | Required if relevant | P0 |
| Agent network/interoperability linked | Required if cross-agent | Required if relevant | Required if relevant | P0 |
| Agentic Zero Trust linked | Required if agentic action | Required if relevant | Required if relevant | P0 |
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
- L3+ agentic product without scheduler, memory manager, tool sandbox, identity, trace, governance, recovery, budget, agent registry, and human-control plan.
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

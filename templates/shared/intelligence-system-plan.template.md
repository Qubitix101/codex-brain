# [Project Name] - Intelligence System Plan

This plan defines the high-level architecture for the product's intelligence system.

## 1. Thesis

- Intelligence system thesis:
- Target maturity now:
- Target maturity later:
- Why this deserves an intelligence system:
- What would be overbuilt:

## 2. First Closed Loop

```text
capture input -> update memory/context -> generate or propose output -> review/approve -> record outcome -> learn
```

- First loop name:
- User value proven:
- Inputs:
- Memory touched:
- Output:
- Approval:
- Verification:
- Learning captured:

## 3. Domain Model

| Entity | Purpose | Source | Owner | Notes |
| --- | --- | --- | --- | --- |
| | | | | |

## 4. Memory Model

| Memory Store | Contains | Source | Update Trigger | Review Required? | Retention |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## 5. Sensing Layer

| Input Source | Surface | Frequency | Access Needed | Risk |
| --- | --- | --- | --- | --- |
| Manual capture | UI / upload / form | | | |
| Connected apps | API / MCP / webhook | | | |
| Browser/web | Browser automation / fetch | | | |
| Media | Image / audio / video processing | | | |

## 6. Reasoning Layer

| Reasoning Task | Input | Output | Model/Skill | Eval |
| --- | --- | --- | --- | --- |
| Classify | | | | |
| Prioritize | | | | |
| Plan | | | | |
| Generate | | | | |
| Critique | | | | |
| Route | | | | |

## 7. Skill Layer

The detailed skill inventory belongs in `docs/skill-inventory.md`.

The architecture substrate decision belongs in `docs/intelligence-architecture-decision.md`.

| Skill | Purpose | Inputs | Outputs | Quality Gate |
| --- | --- | --- | --- | --- |
| | | | | |

## 8. Intelligence Architecture Requirements

| Loop | Source Of Truth | Substrate | RAG? | Structured Retrieval? | Extraction? | Memory? | Workflow/Action/Routine? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |

## 9. Agent Engineering Requirements

The production-agent audit belongs in `docs/agent-engineering-audit.md`.

| Discipline | Required? | Notes |
| --- | --- | --- |
| System design | | |
| Tool contracts | | |
| Retrieval engineering | | |
| Reliability engineering | | |
| Security and safety | | |
| Evaluation and observability | | |
| Product trust UX | | |
| Model routing | | |

## 10. Agent OS Runtime Requirements

The detailed runtime kernel belongs in `docs/agent-os-runtime-plan.md`.

| Kernel Component | Required? | First-Slice Scope | Notes |
| --- | --- | --- | --- |
| Scheduler/orchestrator | | | |
| Memory manager | | | |
| Tool manager/sandbox | | | |
| Identity/delegation | | | |
| Observability/trace | | | |
| Guardrails/governance | | | |
| Recovery/resumability | | | |
| Budget/quota manager | | | |
| Agent registry | | | |
| Human control surface | | | |

## 11. Tool and Harness Layer

Final access choices are resolved in `docs/capability-access-map.md`.

| Capability | Likely Surface | Purpose | Approval Boundary |
| --- | --- | --- | --- |
| Official API/SDK | | | |
| Official CLI | | | |
| MCP/connector | | | |
| Generated CLI harness | | | |
| Browser automation | | | |
| Computer Use | | | |

## 12. Routine Layer

| Routine | Trigger | Schedule | Inputs | Output | Approval | Recovery |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

## 13. Approval and Control Layer

| Action | Default | Approval Required | Rollback / Revoke |
| --- | --- | --- | --- |
| Update memory | Proposed | | |
| Generate draft | Allowed | | |
| Send/publish/write externally | Blocked until approved | | |
| Spend money/use quota | Blocked until approved | | |
| Delete/change durable external state | Blocked until approved | | |

## 14. Evaluation Layer

| Eval | Purpose | Dataset / Examples | Frequency | Blocks Release? |
| --- | --- | --- | --- | --- |
| | | | | |

## 15. Learning Layer

- User corrections:
- Accepted/rejected proposals:
- Outcome analytics:
- Memory updates:
- Skill/routine updates:
- Promotion into Codex Brain lessons:

## 16. Risk Boundaries

| Risk | Boundary | Mitigation |
| --- | --- | --- |
| Hallucination | | |
| Tool misuse | | |
| Privacy leak | | |
| Public/externally visible mistake | | |
| Cost runaway | | |
| Automation drift | | |

## 17. Build Sequence

| Slice | Goal | Intelligence Loop | Required Access | Verification |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

## 18. Deferred OS Layers

| Layer | Why Deferred | Revisit Trigger |
| --- | --- | --- |
| | | |

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

| Skill | Purpose | Inputs | Outputs | Quality Gate |
| --- | --- | --- | --- | --- |
| | | | | |

## 8. Tool and Harness Layer

Final access choices are resolved in `docs/capability-access-map.md`.

| Capability | Likely Surface | Purpose | Approval Boundary |
| --- | --- | --- | --- |
| Official API/SDK | | | |
| Official CLI | | | |
| MCP/connector | | | |
| Generated CLI harness | | | |
| Browser automation | | | |
| Computer Use | | | |

## 9. Routine Layer

| Routine | Trigger | Schedule | Inputs | Output | Approval | Recovery |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

## 10. Approval and Control Layer

| Action | Default | Approval Required | Rollback / Revoke |
| --- | --- | --- | --- |
| Update memory | Proposed | | |
| Generate draft | Allowed | | |
| Send/publish/write externally | Blocked until approved | | |
| Spend money/use quota | Blocked until approved | | |
| Delete/change durable external state | Blocked until approved | | |

## 11. Evaluation Layer

| Eval | Purpose | Dataset / Examples | Frequency | Blocks Release? |
| --- | --- | --- | --- | --- |
| | | | | |

## 12. Learning Layer

- User corrections:
- Accepted/rejected proposals:
- Outcome analytics:
- Memory updates:
- Skill/routine updates:
- Promotion into Codex Brain lessons:

## 13. Risk Boundaries

| Risk | Boundary | Mitigation |
| --- | --- | --- |
| Hallucination | | |
| Tool misuse | | |
| Privacy leak | | |
| Public/externally visible mistake | | |
| Cost runaway | | |
| Automation drift | | |

## 14. Build Sequence

| Slice | Goal | Intelligence Loop | Required Access | Verification |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

## 15. Deferred OS Layers

| Layer | Why Deferred | Revisit Trigger |
| --- | --- | --- |
| | | |

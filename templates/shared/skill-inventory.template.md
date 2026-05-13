# Skill Inventory

## 1. Metadata

- Project:
- Date:
- Owner:
- Related intelligence system plan:
- Related agent engineering audit:
- Related capability/access map:

## 2. Skill Strategy

Explain how procedural memory will make the system more reliable, repeatable, and defensible.

## 3. Existing Skills To Reuse

| Skill | Source | Why Reuse | Trust Level | Gaps |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 4. Required New Skill Candidates

| Skill | Trigger Description | User Outcome | Trust Level | Inputs | Outputs | Tools | Memory | Approval | Evals | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |  |

## 5. Deferred Skills

| Skill | Why Deferred | Revisit Trigger |
| --- | --- | --- |
|  |  |  |

## 6. Skill Trust Review

Trust levels:

- T0: spec only
- T1: instructions only
- T2: read-only scripted
- T3: controlled external tooling
- T4: public, paid, destructive, or autonomous

For every T2-T4 skill:

- Script reviewed:
- Secret access:
- Network access:
- External write access:
- Approval gate:
- Audit log:
- Test fixture:
- Rollback path:

## 7. Progressive Disclosure Design

For each skill, confirm:

- Metadata is concise enough for startup loading.
- `SKILL.md` body contains only actionable procedure.
- Large docs are moved to `references/`.
- Scripts are isolated under `scripts/`.
- Static templates/fixtures are under `assets/`.

## 8. Candidate Install Plan

| Skill | Install Now? | Target Path | Owner | Review Required Before Install |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 9. Skill Eval Plan

| Skill | Happy Path | Bad Input | Missing Context | Tool Failure | Approval Denied | Quality Metric |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## 10. Gate Decision

- Status: blocked / conditional / approved / not applicable
- Skills required before first slice:
- Skills required before production:
- Skills that must not be generated yet:

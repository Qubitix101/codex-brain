# Learning Loop Framework

The brain improves when each project teaches the next project.

Markdown notes are useful for humans. JSON lessons are useful for enforcement.

## Lesson Capture Triggers

Capture a structured lesson when:

- the user corrects Codex
- a phase gate catches a real gap
- a review finds a repeated issue
- a project fails or almost fails
- an implementation decision was non-obvious
- a security/privacy/database/design lesson emerges
- a tool or workflow breaks
- a CLI/API/MCP/browser/computer-use routing choice causes waste, risk, or rework
- a shortcut causes rework
- a quality checklist should be updated

## Lesson Lifecycle

```text
Observed -> Captured -> Reinforced -> Promoted -> Enforced
```

### Observed

A useful lesson appears in a session.

### Captured

Write a JSON lesson to `.codex-brain/lessons/`.

### Reinforced

The same lesson appears again or proves useful.

### Promoted

Update one or more of:

- framework
- schema
- template
- script
- review checklist
- agent prompt

### Enforced

The lesson becomes a gate or validator.

## Lesson JSON

Use `schemas/lesson.schema.json`.

Minimum fields:

- id
- date
- source_project
- category
- severity
- trigger
- lesson
- rule
- applies_to
- confidence
- promote_to
- evidence

## Confidence

| Confidence | Meaning |
| --- | --- |
| 0.2-0.4 | Weak signal, note only |
| 0.5-0.7 | Useful pattern, apply when relevant |
| 0.8-0.9 | Strong rule, recommend strongly |
| 0.95 | Proven, enforce as hard gate |

## Promotion Examples

If three projects reveal missing tenant isolation:

- update `frameworks/database-scale.md`
- add classification trigger for multi-tenancy
- add Build Plan required section
- add PRD gate check
- add review agent prompt item

If frontend keeps feeling generic:

- update `frameworks/design-dna.md`
- require references by page type for Standard/Full
- add visual QA checklist

If GDPR is repeatedly missed:

- update `frameworks/security-gdpr.md`
- add validator that blocks Standard/Full projects with personal data and no privacy plan

If tool surface selection repeatedly causes waste or blockers:

- update `frameworks/tool-surface-routing.md`
- add or revise rules in `catalogs/tool-surface-routing-matrix.json`
- update `frameworks/capability-access-readiness.md`
- add capability entries to `catalogs/capability-access-catalog.json`

## Rule

A serious project is not complete until lessons are captured.

---
name: skill-factory
description: Use when converting a repeatable workflow into a portable skill with clear triggers, progressive disclosure, trust level, resources, examples, validation, and calibration.
version: 0.1.0
---

# Skill Factory

Turn repeatable procedures into portable agent skills. Use this skill to design, audit, or generate a skill specification before installing executable or instruction-only capabilities.

## When to Use

- The user asks to create, design, improve, audit, or package a skill.
- A repeated workflow is trapped in chat, docs, PRDs, or project-specific instructions.
- A project needs procedural memory for agents.
- A proposed skill needs trust review, resource design, validation, or calibration.

## Do Not Use

- The user only needs normal documentation.
- The procedure is one-off and unlikely to repeat.
- The workflow requires unsafe external action and no approval policy exists.

## Skill Anatomy

Use this structure:

```text
skill-name/
  SKILL.md
  references/   optional deep docs loaded only when needed
  assets/       optional templates, fixtures, examples, prompts
  scripts/      optional reviewed executable helpers
```

`SKILL.md` must contain YAML frontmatter with `name` and `description`. The description is the trigger condition. It must say when the skill should be used, not just what the skill is called.

## Core Workflow

1. **Understand.** Collect at least five trigger examples, expected inputs, expected outputs, and non-trigger examples.
2. **Design.** Pick the skill category: workflow, domain, integration, research, content, analysis, or hybrid. Plan progressive disclosure.
3. **Specify.** Define trigger, outcome, inputs, outputs, preconditions, steps, tools, memory reads or writes, approval gates, evals, failure modes, and trust level.
4. **Implement.** Create `SKILL.md` first. Add references, assets, or scripts only when they reduce context, repetition, or risk.
5. **Validate.** Check frontmatter, directory/name match, specific description, no placeholder text, resource references, examples, and token budget.
6. **Calibrate.** Test triggers, non-triggers, workflow execution, output quality, and failure handling.
7. **Package.** Record version, owner, trust level, install path, and review date.

## Trust Levels

- **T0 - Spec only:** candidate not installed.
- **T1 - Instructions only:** no executable scripts.
- **T2 - Read-only scripted:** scripts read files, validate artifacts, or create local reports.
- **T3 - Controlled external tooling:** calls APIs, CLIs, MCPs, browser flows, or Computer Use inside strict boundaries.
- **T4 - Public, paid, destructive, or autonomous:** can publish, send, delete, spend, change production data, or run unattended routines.

Do not generate or install T4 skills casually. Require explicit approval, rollback, audit logs, evals, and an owner.

## Quality Bar

A skill is ready when a future agent can answer:

- When should this trigger?
- What should it not handle?
- What inputs are required?
- What exact steps should run?
- What tools are allowed?
- What output should be produced?
- What errors require stopping?
- How is quality measured?

## Output Contract

Return:

- proposed skill name
- trigger description
- use cases and non-use cases
- inputs and outputs
- workflow steps
- resource plan
- trust level
- approval gates
- validation tests
- calibration tests
- install recommendation

## Examples

### Example: Instruction-Only Reviewer

```text
Skill: agent-engineering-reviewer
Trust: T1
Reason: performs audit and produces findings, no scripts or external calls required.
```

### Example: API Publishing Skill

```text
Skill: social-publisher
Trust: T4
Reason: public external writes. Requires approval queue, audit log, rollback plan, provider scopes, and eval gate before installation.
```

## Trust Level

T1 - Instructions only. This skill designs skills and does not write or install files by itself.

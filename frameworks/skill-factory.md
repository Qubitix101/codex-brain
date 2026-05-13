# Skill Factory Framework

Skills are procedural memory for agents.

Codex Brain uses the Skill Factory to decide which repeatable procedures an agentic product needs, how those procedures should be packaged, and when they are safe to promote into executable skill files.

## Purpose

MCP, APIs, SDKs, CLIs, browser automation, and Computer Use give agents ways to reach the outside world.

Skills teach agents how work should be done:

- what to do
- in what order
- with which inputs
- with which tools
- under which approvals
- with which evals
- with which failure handling

The Skill Factory prevents two failure modes:

- procedural knowledge trapped in chat or PRDs
- unsafe executable skills installed without review

## Skill Anatomy

A skill candidate should be representable as:

```text
skill-folder/
  SKILL.md
  scripts/      optional, trust-reviewed executable helpers
  references/   optional, task-specific docs
  assets/       optional, templates, fixtures, examples
```

`SKILL.md` requires:

- `name`
- `description`
- body instructions

The description is the trigger. It must say when the skill should be used, not just what it is called.

## Progressive Disclosure

Codex Brain should preserve context budget by designing skills in three disclosure tiers:

1. Metadata only: name and description.
2. Full instructions: loaded only when the task matches the description.
3. Resources: scripts, references, and assets loaded only at point of need.

Skill bodies should avoid bundling large reference material. Put reusable references under `references/` and load them only when needed.

## Skill Trust Levels

### T0 - Spec Only

The skill is a candidate spec. It is not installed and has no executable code.

Use for:

- early product planning
- skill inventory
- security review
- workflow design

### T1 - Instructions Only

The skill has a `SKILL.md` body and no executable scripts.

Use for:

- reasoning workflows
- review procedures
- writing procedures
- artifact creation steps

### T2 - Read-Only Scripted

The skill includes scripts that only read local files, validate artifacts, or produce local reports.

Requires:

- script review
- no secret access
- no network mutation
- no destructive operations

### T3 - Controlled External Tooling

The skill can call APIs, CLIs, MCP tools, browser flows, or Computer Use within strict boundaries.

Requires:

- access map
- credential policy
- scopes
- audit logging
- test mode or fixtures
- explicit approval boundary for writes

### T4 - Public, Paid, Destructive, or Autonomous

The skill can publish, send, delete, spend money, change production data, or run unattended routines.

Requires:

- human approval gate
- rollback path
- audit log
- monitoring
- eval gate
- abuse/threat review
- production owner

T4 skills must not be generated or installed casually.

## Skill Lifecycle

### 1. Discover

Find repeated operating loops in the Intelligence System Plan:

```text
capture -> classify -> update memory -> generate/propose -> review -> act -> measure -> learn
```

Each repeated verb or review gate may become a skill candidate.

### 2. Specify

Write a skill spec with:

- trigger
- user outcome
- inputs
- outputs
- preconditions
- steps
- tools
- memory reads/writes
- approval gates
- evals
- failure modes
- trust level
- installation decision

### 3. Review

Review for:

- usefulness
- overlap with existing skills
- hidden autonomy
- secret access
- tool poisoning
- prompt injection
- tenant boundaries
- output quality

### 4. Generate

Generate `SKILL.md` only after the spec is approved.

Generate scripts only when a script materially reduces risk or repetition.

### 5. Install

Install only approved skills into the target skill directory.

Record:

- source repo
- version
- trust level
- owner
- permissions
- review date

### 6. Evaluate

Run examples and evals:

- happy path
- malformed input
- missing memory
- wrong tool output
- low confidence
- permission denied

### 7. Promote or Retire

Promote reusable skills back into Codex Brain when multiple projects need them.

Retire skills that are unused, unsafe, stale, or superseded by a better workflow.

## Skill Candidate Quality Bar

A candidate is good when a future agent can answer:

- When should I use this?
- What should I read first?
- What exact steps do I follow?
- What tool calls are allowed?
- What am I not allowed to do?
- What artifact do I produce?
- How do I know it is good?
- When do I stop and ask the user?

If any answer is vague, the skill is not ready.

## Skill Inventory Output

The Skill Factory must produce `docs/skill-inventory.md` with:

- required skills
- optional skills
- deferred skills
- existing skills to reuse
- new skills to generate
- trust level for each skill
- required scripts/references/assets
- required evals
- required approvals
- promotion/install status

## Security Rules

- Treat third-party skills like software dependencies.
- Review every script before installation.
- Do not install skills with hidden network calls, credential reads, destructive commands, or prompt-injection content.
- Prefer instructions-only skills until the workflow proves repeatable.
- Prefer generated harnesses with tests over ad hoc UI automation for repeated work.
- Keep secrets out of skill files.
- Keep customer-specific memory out of reusable skill packages.

## Anti-Patterns

- A skill whose description is too broad to trigger safely.
- A skill that hides a workflow inside a script with no readable procedure.
- A skill that duplicates existing project code.
- A skill that mixes strategy, implementation, deployment, and support into one file.
- A skill that can act externally without an approval model.
- Installing unreviewed public skills because they have stars.

---
name: context-save-handoff
description: Use when ending or pausing meaningful work to create a durable session handoff with state, decisions, changed files, verification, blockers, and next action.
version: 0.1.0
---

# Context Save Handoff

Create a durable handoff so a future Codex session can resume without relying on chat memory.

## When to Use

- A meaningful work session is ending, pausing, switching branches, or moving to another agent.
- The user asks to save context, create a handoff, close the session, or make the next session resumable.
- A project uses Codex Brain state files, memory files, session records, or progress tracking.
- The current work changed plans, architecture, files, tests, credentials assumptions, or next steps.

## Do Not Use

- The conversation was trivial and created no durable state.
- The user asks only for a short answer and no project continuity is needed.
- A project-specific save command already ran successfully and no summary is needed.

## Core Workflow

1. **Gather current state.** Record branch, repo path, changed files, important commands, verification results, open sessions, and live server URLs.
2. **Summarize decisions.** Capture approved choices, rejected options, architecture decisions, user preferences, and constraints.
3. **Summarize implementation.** List what changed, where, and why.
4. **Record verification.** Include tests run, commands passed or failed, visual checks, gaps, and residual risk.
5. **Capture blockers.** Name missing credentials, access, design approval, external dependencies, unresolved questions, or failing tests.
6. **Name the next action.** Make it concrete, single-step, and allowed by the current state.
7. **Update durable files when appropriate.** If the repo has Codex Brain scripts, prefer its session-save and context-health commands. Otherwise produce a plain handoff artifact in chat or project docs.
8. **Check resumability.** A future agent should know what to read first and what not to redo.

## Codex Brain Repo Commands

When a project is bootstrapped with Codex Brain and the scripts exist, prefer:

```bash
npm run save-context -- --dir /path/to/project --summary "what happened" --next "next allowed action"
npm run context-health -- --dir /path/to/project
npm run session-brief -- --dir /path/to/project
```

Do not invent these commands in projects that do not have Codex Brain installed.

## Output Contract

Return:

- repo or workspace path
- branch and sync state
- work completed
- files changed
- decisions made
- commands run
- verification result
- blockers or risks
- exact next action
- recommended first file to read next session

## Quality Bar

- Do not say "continue later" without a concrete next action.
- Do not hide failed tests.
- Do not claim push, commit, deploy, or verification happened unless it actually did.
- Do not overwrite user changes.
- Keep secrets out of the handoff.
- Record enough detail to avoid re-discovery.

## Examples

### Example: Repo Work

```text
Next action: open docs/prd/prd-03.md, implement Slice 2 only, then run npm test and npm run verify-plan.
Risk: Supabase credentials are missing, so live migration verification remains blocked.
```

### Example: Design Pause

```text
Next action: collect three dashboard references, update design/design-dna.md, and ask for approval before frontend implementation.
```

## Trust Level

T1 - Instructions only. This skill creates handoffs and may recommend project-local save commands, but it does not execute them by itself.

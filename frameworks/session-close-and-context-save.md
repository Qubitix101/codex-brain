# Session Close and Context Save Framework

Codex Brain must not depend on chat memory.

Every meaningful project session should end with a context save so the next Codex session can restart from durable project state instead of reconstructing history from conversation.

## Purpose

Session close solves the practical context problem:

- what changed
- what decisions were made
- what checks ran
- what is blocked
- what should happen next
- what context files were updated
- whether any reusable lessons should be promoted

The session record is a project-local handoff between AI sessions.

## Core Principle

Save ordinary session history as session records.

Save reusable cross-project learning as lessons.

Do not mix them.

## Required Artifacts

Every bootstrapped project should have:

- `.codex-brain/sessions/`
- `.codex-brain/memory/active-context.md`
- `.codex-brain/memory/progress.md`
- `.codex-brain/state.json`

Every meaningful session should create:

- `.codex-brain/sessions/session-[timestamp].json`

Optional when useful:

- `.codex-brain/lessons/*.json`
- `.codex-brain/distillates/execution-distillate.md`
- `.codex-brain/task-records/*.json`

## What Counts as a Meaningful Session

Save context when the session includes any of:

- code changes
- new or changed requirements
- new design direction
- architecture/database/security/privacy decision
- Build Plan or PRD work
- failed or passing verification
- user correction that changes future behavior
- blocker discovered
- phase or gate change
- lesson worth preserving

Tiny Q&A can skip session close if no project state changed.

## Session Record Contents

A session record must include:

- session id
- timestamp
- project
- mode
- phase
- summary
- completed items
- decisions
- files changed
- artifacts updated
- checks run
- blockers
- risks
- next action
- lessons captured or suggested
- context health
- git status when available

## Save Flow

1. Read `.codex-brain/state.json`.
2. Read current memory files.
3. Capture session summary.
4. Capture completed work, decisions, blockers, checks, and next action.
5. Inspect git status when available.
6. Write a session JSON record.
7. Update `.codex-brain/memory/active-context.md`.
8. Update `.codex-brain/memory/progress.md`.
9. Update `state.context.last_session_*`.
10. If reusable lessons exist, capture them as lesson JSON.
11. Report the saved path and next action.

Use `scripts/save-context.mjs` when available.

## Context Health

Context health checks:

- required state exists
- local project `CODEX.md` exists
- project context exists
- active context exists
- progress memory exists
- sessions directory exists
- latest session exists after meaningful work
- next action is populated

Use `scripts/context-health.mjs` when available.

## Closeout Prompt

At the end of meaningful work, Codex should ask itself:

- Did I change project state?
- Did I update the next action?
- Did I record decisions?
- Did I record blockers?
- Did checks pass or fail?
- Is there a reusable lesson?
- Would a new Codex session know where to resume?

If not, save context before ending.

## Anti-Patterns

- Relying on chat history as project memory.
- Capturing every progress note as a reusable lesson.
- Updating `progress.md` but not the JSON session record.
- Writing vague next actions like "continue work."
- Hiding blockers in prose without a structured blocker field.
- Ending a significant session without session close.


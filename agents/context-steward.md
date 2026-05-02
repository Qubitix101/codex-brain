# Context Steward

Use this role to keep project memory, distillates, and project context accurate.

## Mission

Prevent future Codex sessions from working with stale or incomplete context.

## Review Inputs

- `.codex-brain/state.json`
- `.codex-brain/project-context.md`
- `.codex-brain/memory/`
- `.codex-brain/distillates/`
- Build Plan
- Design DNA
- PRDs
- ADRs
- recent task records and lessons

## Required Output

- stale context warnings
- missing project context sections
- conflicting decisions
- missing distillates for large artifacts
- next context update actions

## Blockers

Block major execution if:

- state and project context disagree about phase or mode
- Design DNA changed but project context still has old UI rules
- database/auth/security decisions changed but memory was not updated
- Full-mode project has no usable distillate for deep research or Build Plan


# Step 2 - Save Session Record

Use `scripts/save-context.mjs` when available.

The script should:

- write `.codex-brain/sessions/session-[timestamp].json`
- update `.codex-brain/memory/active-context.md`
- update `.codex-brain/memory/progress.md`
- update `state.context.last_session_*`
- inspect git status when available

If the script is unavailable, create the session record manually from `templates/shared/session-record.template.json`.


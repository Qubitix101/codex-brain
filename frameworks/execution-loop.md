# Execution Loop Framework

Execution is deliberately narrow.

One task. One focused change. One verification pass. One state update.

## Protocol

1. Read current state.
2. Read current PRD.
3. Select next unblocked task.
4. Select the execution surface: CLI, API/SDK, MCP, generated harness, browser, or Computer Use.
5. Confirm allowed files and forbidden files.
6. Check Git branch and working tree.
7. Create or recommend a `codex/...` branch for meaningful work unless already on an appropriate task branch.
8. Recommend a separate worktree when the task is risky, experimental, long-running, or the current tree has unrelated user changes.
9. Implement only that task.
10. Run relevant checks.
11. Review the diff.
12. Run local Codex review with `/review` when available before PR handoff.
13. Update task state.
14. Capture lessons.
15. Stop.

## Task Requirements

A task must have:

- id
- title
- scope
- acceptance criteria
- dependencies
- verification commands
- allowed files or modules when possible

## Completion Requirements

A task is complete only when:

- acceptance criteria are satisfied
- tests/checks pass or failures are documented with reason
- no unrelated files changed
- Git branch/worktree choice was appropriate for the risk
- execution surface was appropriate for the task and permission boundary
- local review was run or intentionally skipped with reason
- state is updated
- lesson capture was considered

## Forbidden

- starting a second task in the same loop
- modifying unrelated modules
- ignoring dirty worktree context
- doing meaningful feature work directly on `main` without explicit user approval
- merging or pushing directly to `main` without explicit user approval
- marking a task complete because code was written but not verified
- loading entire huge specs when task references are enough
- using a heavyweight MCP/tool surface when a deterministic CLI/API path is sufficient
- using raw CLI/browser automation when auth, governance, or rendered state requires a better surface

## Parallel Execution

Parallel execution requires task claiming.

Agents must not all pick the first unchecked task. A parallel system must:

- partition tasks before launch, or
- use a lock/claim mechanism in state, or
- assign explicit task ids

No parallel execution without disjoint write scopes.

# Execution Loop Framework

Execution is deliberately narrow.

One task. One focused change. One verification pass. One state update.

## Protocol

1. Read current state.
2. Read current PRD.
3. Select next unblocked task.
4. Confirm allowed files and forbidden files.
5. Implement only that task.
6. Run relevant checks.
7. Review the diff.
8. Update task state.
9. Capture lessons.
10. Stop.

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
- state is updated
- lesson capture was considered

## Forbidden

- starting a second task in the same loop
- modifying unrelated modules
- ignoring dirty worktree context
- marking a task complete because code was written but not verified
- loading entire huge specs when task references are enough

## Parallel Execution

Parallel execution requires task claiming.

Agents must not all pick the first unchecked task. A parallel system must:

- partition tasks before launch, or
- use a lock/claim mechanism in state, or
- assign explicit task ids

No parallel execution without disjoint write scopes.


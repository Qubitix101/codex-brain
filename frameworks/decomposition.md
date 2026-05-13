# Decomposition Framework

Decomposition turns the Build Plan into executable PRDs.

## PRD Requirements

Each PRD includes:

- goal
- prerequisites
- references
- tasks
- acceptance criteria
- dependencies
- verification commands
- completion criteria

For agentic products, each PRD also includes:

- intelligence loop touched
- required skills
- model/tool routes
- approval boundaries
- evals/traces proving the agent behavior
- skill trust level changes if any

## Atomic Task Shape

Good:

```markdown
- [ ] P2-014: Add tenant-aware project query helper
  - Create `src/db/projects.ts`
  - Ensure every query filters by `tenant_id`
  - Add isolation test
  - Depends on: P2-006
  - Verify: `npm test -- tenant`
  - Acceptance: cross-tenant access test fails closed
```

Bad:

```markdown
- [ ] Build dashboard
```

## Rule

If a task cannot be verified in one focused loop, split it.

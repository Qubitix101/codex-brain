# Agentic Opportunity - Step 02 - Intelligence System Plan

## Read

- `docs/agentic-opportunity-audit.md`
- `frameworks/intelligence-system-plan.md`
- `catalogs/agentic-system-patterns.json`

## Decide

- What is the first closed loop?
- What memory does the system need?
- What sensing inputs are required?
- What skills and reasoning tasks are needed?
- What routines should exist?
- Where are approval and control boundaries?
- What evals prove quality?
- How does the product learn over time?

## Write

Create or update:

- `docs/intelligence-system-plan.md`

Use:

- `templates/shared/intelligence-system-plan.template.md`

## Stop If

- the plan lists tools but no operating loop
- the plan includes memory without an update/review policy
- the plan includes automation without approval, rollback, or failure behavior
- the plan includes generation without evals

## State Update

Keep the `agentic_opportunity` gate `in-progress` until both audit and plan are ready.

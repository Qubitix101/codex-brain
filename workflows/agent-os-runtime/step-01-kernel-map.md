# Step 1 - Kernel Map

Create the initial Agent OS runtime kernel map.

## Inputs

- `docs/agentic-opportunity-audit.md`
- `docs/intelligence-system-plan.md`
- `docs/intelligence-architecture-decision.md`
- `docs/agent-engineering-audit.md`
- `docs/skill-inventory.md`
- project brief and first closed intelligence loop

## Procedure

1. List every agent, routine, tool-using loop, external action, and memory-writing loop.
2. Decide whether the product needs each kernel component:
   - scheduler/orchestrator
   - memory manager
   - tool manager/sandbox
   - identity/delegation manager
   - observability/trace layer
   - guardrails/governance
   - recovery/resumability
   - budget/quota manager
   - agent registry
   - human control surface
3. Mark each component required, deferred, or not applicable.
4. Identify P0 runtime blockers before access mapping.

## Output

Draft the component map in `docs/agent-os-runtime-plan.md`.

# Step 3 - Execution Readiness

Before execution:

- PRDs are split into vertical slices
- every task has acceptance criteria
- every checkbox has verification
- Design DNA blocks are resolved
- agentic maturity, first closed loop, approval boundaries, and evals are explicit for AI/automation-heavy tasks
- required access blockers are resolved, mocked, or explicitly deferred
- execution surface is known for each integration-heavy task
- security/privacy/database tasks are explicit
- test traceability covers P0/P1 requirements
- current task is selected and scoped

Run `scripts/verify-plan.mjs` against the active PRD or plan.

Execution starts only after readiness passes.

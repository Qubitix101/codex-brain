# Step 3 - Execution Readiness

Before execution:

- PRDs are split into vertical slices
- every task has acceptance criteria
- every checkbox has verification
- Design DNA blocks are resolved
- agentic maturity, first closed loop, approval boundaries, and evals are explicit for AI/automation-heavy tasks
- intelligence architecture substrates, source of truth, retrieval/extraction/memory/workflow/action/routine choices, and eval traces are explicit for AI-core tasks
- agent-engineering discipline gaps, model routes, required skills, trust levels, and skill evals are explicit for L3+ agentic tasks
- Agent OS runtime boundaries are explicit for L3+ agentic tasks: scheduler, memory manager, tool sandbox, identity, traces, governance, recovery, budgets, agent registry, and human control
- agent network/interoperability boundaries are explicit for federated tasks: agent cards, topology, delegation, task contracts, protocol choices, context sharing, streaming, cross-agent traces, recovery, and versioning
- required access blockers are resolved, mocked, or explicitly deferred
- execution surface is known for each integration-heavy task
- security/privacy/database tasks are explicit
- test traceability covers P0/P1 requirements
- current task is selected and scoped

Run `scripts/verify-plan.mjs` against the active PRD or plan.

Execution starts only after readiness passes.

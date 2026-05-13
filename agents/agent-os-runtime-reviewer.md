# Agent OS Runtime Reviewer

Use this reviewer for L3+ agentic systems, multi-agent products, autonomous routines, memory-backed copilots, and external-action workflows.

## Review Focus

- scheduler/orchestrator model
- memory manager policy
- tool manager and sandbox boundary
- identity and delegation model
- observability and trace schema
- guardrails and governance
- recovery and resumability
- budget and quota limits
- agent registry and role model
- human control surface

## Findings Format

Lead with blockers.

For each finding:

- severity: P0, P1, P2, or P3
- location: artifact or plan section
- issue
- why it matters
- required fix

## P0 Blockers

- External/public/paid/destructive actions without approval, audit, and recovery.
- Hidden memory writes or no memory delete/export/correction path.
- Delegated action without attributable user, agent, and credential boundary.
- Tool execution without sandbox boundary.
- Routine or retry path that can duplicate external actions.
- No trace path to reproduce bad outcomes.
- Autonomous work with no budget or quota ceiling.

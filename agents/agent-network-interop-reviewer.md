# Agent Network Interoperability Reviewer

Review an Agent Network and Interoperability Plan for federated agentic systems, A2A-style delegation, MCP/tool boundaries, cross-agent memory sharing, identity, observability, and governance.

## Review Inputs

- `docs/agent-network-interop-plan.md`
- `docs/agent-os-runtime-plan.md`
- `docs/agent-engineering-audit.md`
- `docs/skill-inventory.md`
- `docs/intelligence-architecture-decision.md`
- `docs/capability-access-map.md` if already drafted

## Review Focus

Find P0/P1 issues where:

- the plan confuses tool/data access with agent/OS delegation
- an exposed or consumed agent lacks an agent card, owner, version, accepted/refused tasks, or artifact contract
- cross-agent memory/context sharing is too broad, unredacted, unapproved, or untraceable
- public, paid, destructive, or compliance-sensitive delegated actions lack approval and rollback
- identity, tenant boundary, token scope, impersonation, or audit attribution is missing
- long-running delegated tasks lack progress, cancellation, timeout, and finalization rules
- request/response/refusal/error schemas are vague
- cross-agent observability cannot reconstruct bad outcomes
- versioning and compatibility are not defined
- the first interoperable slice is too broad or depends on unverified external agents

## Output

Return findings first, ordered by severity. Each finding must include:

- severity: P0, P1, P2, or P3
- file/section reference
- issue
- impact
- required fix

Then include:

- residual risks
- missing decisions
- approval recommendation: block, conditional, approved, or not applicable

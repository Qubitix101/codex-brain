# Agentic Zero Trust - Step 03 - Readiness Gate

Approve, conditionally approve, block, or mark Agentic Zero Trust as not applicable.

## P0 Checks

- Does every agentic action preserve user, tenant, agent, sub-agent, credential, and authorization attribution?
- Are credentials short-lived, scoped, vaulted or brokered, rotated, and revocable?
- Are public, paid, destructive, compliance-sensitive, and externally visible actions protected by per-action authorization and human approval where needed?
- Are tools, MCP servers, connectors, skills, generated harnesses, models, prompts, policies, and agent cards registered, versioned, owned, and reviewable?
- Are prompt injection and indirect prompt injection handled at input, retrieval, memory, tool, output, and delegation boundaries?
- Are memory, RAG, embeddings, policies, preferences, eval sets, and model artifacts protected from poisoning, tampering, and stale trust?
- Are each agent's file, network, database, tenant, browser, desktop, and production-write scopes sandboxed?
- Can forensic traces reconstruct prompts, context, retrieval, memory, model routes, policy decisions, credential checkouts, tool calls, agent delegations, approvals, failures, and external actions?
- Do humans have kill switch, pause, revoke, throttle, canary, rollback, and incident controls?
- Do adversarial evals cover prompt injection, tool poisoning, credential misuse, exfiltration, memory poisoning, excessive agency, sub-agent escalation, A2A spoofing, and cost runaway?
- Is the first secure autonomous slice small enough to verify before wider autonomy?

## Decision

Use one:

- `approved`: the zero-trust plan is sufficient for the current build scope.
- `conditional`: the first slice may proceed, but named controls must close before launch or wider autonomy.
- `blocked`: Capability and Access and Build Plan cannot proceed.
- `not applicable`: the product has no agentic action, tool use, memory/retrieval trust boundary, autonomous routine, MCP/A2A boundary, sensitive data, or AI-controlled external action in the current slice.

## Output

Record the decision in `docs/agentic-zero-trust-plan.md`.

If approved or conditional, move next to Capability and Access so surface choices inherit the zero-trust controls.

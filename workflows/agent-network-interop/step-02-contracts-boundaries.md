# Step 2 - Contracts and Boundaries

Convert the network map into concrete inter-agent contracts.

## Procedure

For each active interop boundary, define:

- agent card owner and version
- accepted tasks and refused tasks
- request, response, artifact, and refusal schemas
- modality and artifact formats
- memory and context-sharing policy
- identity, auth, token, scope, and tenant boundary
- streaming/progress behavior
- approval and governance rules
- cross-agent traces and correlation IDs
- timeout, retry, idempotency, fallback, and escalation behavior
- first-slice scope and deferred hardening

## Required Contracts

- Agent card and discovery contract.
- Collaboration topology contract.
- Delegation boundary contract.
- Task/message contract.
- Protocol decision contract for MCP versus A2A versus API/internal/event surfaces.
- Memory and context boundary contract.
- Identity/auth/trust contract.
- Streaming/progress contract.
- Cross-agent observability contract.
- Versioning/compatibility contract.
- Reuse/commercialization contract when a capability may become a platform surface.

## Output

Complete the contracts in `docs/agent-network-interop-plan.md`.

# Step 1 - Agent Network Map

Create the initial Agent Network and Interoperability map.

## Inputs

- `docs/agentic-opportunity-audit.md`
- `docs/intelligence-system-plan.md`
- `docs/intelligence-architecture-decision.md`
- `docs/agent-engineering-audit.md`
- `docs/skill-inventory.md`
- `docs/agent-os-runtime-plan.md`
- project brief and first closed intelligence loop

## Procedure

1. List every internal agent, external agent, domain operating system, remote specialist, and reusable capability that may participate.
2. Mark each participant as:
   - internal component in this runtime
   - internal agent exposed through a card
   - external agent or external domain OS consumed by this product
   - deterministic external service or tool
   - deferred ecosystem layer
3. Decide whether each boundary is an internal workflow, API/SDK, MCP/tool access, A2A-style agent delegation, event bus/webhook/queue, browser automation, or Computer Use exception.
4. Identify P0 interop blockers before Agentic Zero Trust and capability/access mapping.

## Output

Draft the topology, roster, and protocol boundary map in `docs/agent-network-interop-plan.md`.

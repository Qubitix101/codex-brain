# Capability Access - Step 01 - Inventory

## Read

- `.codex-brain/state.json`
- `.codex-brain/classification.json`
- `.codex-brain/validation.md`
- `.codex-brain/research/`
- `docs/agentic-opportunity-audit.md` if relevant
- `docs/intelligence-system-plan.md` if relevant
- `docs/intelligence-architecture-decision.md` if relevant
- `docs/agent-engineering-audit.md` if relevant
- `docs/skill-inventory.md` if relevant
- `docs/agent-os-runtime-plan.md` if relevant
- `docs/agent-network-interop-plan.md` if relevant
- `docs/agentic-zero-trust-plan.md` if relevant
- `frameworks/capability-access-readiness.md`
- `catalogs/capability-access-catalog.json`

## Decide

- Which product capabilities require outside systems?
- Which capabilities are required by the selected intelligence architecture: RAG, structured retrieval, extraction, memory, workflow, action, or routine automation?
- Which capabilities are required by the first closed intelligence loop?
- Which capabilities are required by approved T2-T4 skill candidates?
- Which capabilities are required by the Agent OS runtime: scheduler, memory manager, tool sandbox, identity, observability, governance, recovery, budgets, agent registry, or human control?
- Which capabilities are required by the agent network: agent cards, remote agent calls, A2A-style delegation, MCP/tool access, streaming, cross-agent traces, or version compatibility?
- Which capabilities are required by Agentic Zero Trust: identity provider, vault/broker, policy engine, AI gateway/firewall, immutable logs, kill switches, throttles, adversarial eval tooling, or incident response?
- Which are required now, mockable, deferred, or not applicable?
- Which capabilities are production runtime dependencies versus agent implementation aids?

## Write

Create or update:

- `docs/capability-access-map.md`

Use:

- `templates/shared/capability-access-map.template.md`

Optional starter:

```bash
npm run plan-capabilities -- --brief "[project brief]" --mode [light|standard|full]
npm run plan-intelligence-architecture -- --brief "[project brief]" --mode [light|standard|full]
npm run plan-agent-skills -- --brief "[project brief]" --mode [light|standard|full]
npm run plan-agent-os-runtime -- --brief "[project brief]" --mode [light|standard|full]
npm run plan-agent-network -- --brief "[project brief]" --mode [light|standard|full]
npm run plan-agentic-zero-trust -- --brief "[project brief]" --mode [light|standard|full]
```

## Stop If

- the product depends on an external system and no official API/SDK/CLI/MCP/browser path is known
- the user must create an account, API key, OAuth app, webhook, billing setup, or sandbox before planning can be honest

## State Update

Set the `capability_access` gate to `in-progress` until the access surface map exists and blockers are explicit.

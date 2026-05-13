# Agentic Zero Trust - Step 01 - Threat Model

## Read

- `.codex-brain/state.json`
- `.codex-brain/classification.json`
- `.codex-brain/research/`
- `docs/agentic-opportunity-audit.md` if relevant
- `docs/intelligence-system-plan.md` if relevant
- `docs/intelligence-architecture-decision.md` if relevant
- `docs/agent-engineering-audit.md` if relevant
- `docs/skill-inventory.md` if relevant
- `docs/agent-os-runtime-plan.md` if relevant
- `docs/agent-network-interop-plan.md` if relevant
- `frameworks/agentic-zero-trust.md`
- `catalogs/agentic-zero-trust-catalog.json`

## Decide

- What agents, sub-agents, routines, tools, MCP servers, skills, models, memories, retrieval sources, credentials, and external actions exist?
- What assets are sensitive, regulated, customer-specific, public-facing, paid, destructive, or compliance-sensitive?
- What trust boundaries exist between users, agents, memory, retrieval, models, tools, downstream agents, and external systems?
- Which attacker paths apply: prompt injection, indirect prompt injection, tool poisoning, MCP compromise, credential theft, exfiltration, memory poisoning, data/model poisoning, excessive agency, sub-agent escalation, A2A spoofing, or unbounded consumption?

## Write

Create or update:

- `docs/agentic-zero-trust-plan.md`

Use:

- `templates/shared/agentic-zero-trust-plan.template.md`

Optional starter:

```bash
npm run plan-agentic-zero-trust -- --brief "[project brief]" --mode [light|standard|full] --markdown
```

## Stop If

- agentic actions cannot be attributed to user, tenant, agent, and credential
- sensitive assets or trust boundaries are unknown
- launch-critical attacker paths are not listed

## State Update

Set the `agentic_zero_trust` gate to `in-progress` until the threat model, controls, and readiness decision are complete.

# Step 01 - Intelligence Substrate Selection

## Read

- `docs/agentic-opportunity-audit.md`
- `docs/intelligence-system-plan.md`
- `frameworks/intelligence-architecture-selection.md`
- `catalogs/intelligence-architecture-catalog.json`
- `.codex-brain/research/` if available

## Goal

Decide which intelligence substrate each important product loop needs before agent engineering or capability/access mapping.

## Procedure

1. List the core product loops from the Intelligence System Plan.
2. For each loop, identify whether it must answer, decide, transform, extract, remember, coordinate, act, or run repeatedly.
3. Identify the source of truth for each loop.
4. Choose one or more substrates:
   - model-only reasoning
   - ADK-style workflow or agent
   - semantic RAG
   - deterministic structured retrieval
   - LLM extraction into structured fields
   - durable memory or knowledge graph
   - external action
   - routine automation
5. Record rejected alternatives and why.

## Helper

```bash
npm run plan-intelligence-architecture -- --brief "[project brief]" --mode [light|standard|full] --markdown
```

## Output

Create or update:

- `docs/intelligence-architecture-decision.md`

Use:

- `templates/shared/intelligence-architecture-decision.template.md`

## State Update

- set `phase`: `intelligence-architecture`
- set `gates.intelligence_architecture.status`: `in-progress`
- set `gates.intelligence_architecture.missing`: include `docs/intelligence-architecture-decision.md` until complete
- set `distillates.intelligence_architecture`: concise substrate decision summary when available

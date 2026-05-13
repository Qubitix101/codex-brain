# Agentic Opportunity - Step 01 - Audit

## Read

- `.codex-brain/state.json`
- `.codex-brain/classification.json`
- `.codex-brain/validation.md`
- `.codex-brain/research/`
- `frameworks/agentic-opportunity-audit.md`
- `catalogs/agentic-system-patterns.json`

## Decide

- Is this a normal app, AI-assisted workflow, memory-backed copilot, workflow agent, bounded autonomous operator, or domain operating system?
- What maturity level should be built now?
- What maturity level is plausible later?
- What should be explicitly deferred?

## Write

Create or update:

- `docs/agentic-opportunity-audit.md`

Use:

- `templates/shared/agentic-opportunity-audit.template.md`

Optional starter:

```bash
npm run plan-agentic-system -- --brief "[project brief]" --mode [light|standard|full] --markdown
```

## Stop If

- the product is AI-core but no maturity level is selected
- the product implies memory, routines, tools, or automation but the audit does not say whether they are required now or deferred

## State Update

Set the `agentic_opportunity` gate to `in-progress` until the audit exists and the maturity decision is explicit.

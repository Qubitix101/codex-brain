# Capability Access - Step 01 - Inventory

## Read

- `.codex-brain/state.json`
- `.codex-brain/classification.json`
- `.codex-brain/validation.md`
- `.codex-brain/research/`
- `frameworks/capability-access-readiness.md`
- `catalogs/capability-access-catalog.json`

## Decide

- Which product capabilities require outside systems?
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
```

## Stop If

- the product depends on an external system and no official API/SDK/CLI/MCP/browser path is known
- the user must create an account, API key, OAuth app, webhook, billing setup, or sandbox before planning can be honest

## State Update

Set the `capability_access` gate to `in-progress` until the access surface map exists and blockers are explicit.

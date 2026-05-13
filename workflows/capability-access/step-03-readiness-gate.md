# Capability Access - Step 03 - Readiness Gate

## Read

- `docs/capability-access-map.md`
- `.codex-brain/state.json`
- `frameworks/capability-access-readiness.md`

## Gate Questions

- Are all critical external capabilities listed?
- Is each capability marked required, mockable, deferred, or not applicable?
- Is the agent implementation surface separate from the production runtime surface?
- Are official APIs, SDKs, CLIs, MCP servers, generated harnesses, Browser, and Computer Use considered where relevant?
- Are required credentials, scopes, OAuth apps, webhooks, billing setup, and sandbox accounts listed?
- Are secret handling, audit, cost, rate limit, and destructive-action boundaries explicit?
- Is there a safe mock plan for anything not live yet?
- Are user-provided blockers listed plainly?

## Pass Criteria

The gate can pass when:

- `docs/capability-access-map.md` exists
- no required-now critical capability has an unknown access path
- Build Plan can honestly state what is live, mocked, deferred, or blocked
- the user action checklist is concrete

## State Update

If pass:

- set `.codex-brain/state.json#gates.capability_access.status` to `complete`
- clear missing artifacts for `capability_access`
- set `approved` according to user/project policy
- next workflow: `build-plan`

If blocked:

- set status to `blocked`
- keep the first blocking user action in `missing`
- next allowed action is to obtain the missing access or explicitly mock/defer it

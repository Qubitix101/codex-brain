# QUB-6 Slack Event Activation Receipt

Recorded: `2026-07-24T13:08:23Z`

## Scope

Activate the reviewed, hosted Slack Events API boundary for the single
`Qubitix101/codex-brain` dry-run pilot. This receipt does not authorize or
claim a merge-capable path.

## Repository proof

- PR #3 merged at
  `4c3e5f9cc35dd3b0307002d74d7dbabf8ad89a1b`.
- Post-merge `main` verification:
  GitHub Actions run `30092198339`, success.
- Canonical local verification after the proof-PR change:
  `npm run verify:loop` — 46 tests passed.
- Whitespace verification: `git diff --check` — passed.

## Supabase proof

- Project: `jass-loop-pilot` / `afximcslmhbkidmtlitr`.
- Applied reviewed migrations:
  `jass_loop_private_schema` and `jass_loop_dry_run_bridge`.
- SQL verification:
  - private tables: `3`
  - public Slack tables: `0`
  - public security-definer RPCs: `0`
  - public security-invoker RPCs: `5`
  - public RPC execute grants: `0`
- Advisor output contained only expected informational findings for fresh,
  private, empty tables and indexes.

## Credential boundary

- GitHub token:
  - name: `Jass Loop Pilot Dry Run`
  - repository: only `Qubitix101/codex-brain`
  - permissions: read-only administration, metadata, and pull requests
  - expiry: `2026-08-23`
  - direct PR, branch-protection, and check-runs reads returned `200`
- Slack signing secret and bot token are encrypted Vercel variables.
- Supabase service-role key is an encrypted Vercel variable.
- Secret values were never written to this repository or receipt.
- Hidden trailing newlines were removed from all single-line pilot settings.

## Hosting proof

- Stable receiver:
  `https://jass-loop-pilot.vercel.app/api/slack-events`
- Production deployment:
  `dpl_8hi3JywQ1GyDfnsNT9uMYdcLn8a2`
- Vercel state: `Ready`
- Built function: `api/slack-events`
- A correctly signed synthetic Slack URL-verification request returned
  `200` with the exact challenge.
- A current unauthenticated GET returned the expected
  `405 METHOD_NOT_ALLOWED`, proving the POST-only boundary is reachable.

## Slack proof

- App: `Jass Loop Pilot` / `A0BKG3GDW4E`
- Workspace: `T0BK00B99LP`
- Channel: `C0BKE20NC0N`
- Socket Mode: off
- Request URL: verified
- Bot events: only `reaction_added`
- Required scopes: `chat:write` and `reactions:read`
- Delayed Events: off

## Safety state

- `JASS_LOOP_ENABLED=false`
- `JASS_LOOP_MODE=dry-run`
- `JASS_LOOP_LIVE_MERGE_ENABLED=false`
- GitHub credential has no write or merge permission.
- No scheduler, polling worker, daemon, or recurring automation exists.

## Mobile proof candidate

- PR:
  `https://github.com/Qubitix101/codex-brain/pull/4`
- Exact head:
  `bb2a24e22d54a4e1d39911c0384b75fba3a36d51`
- Required check:
  GitHub Actions run `30095571190`, success
- Risk label: `risk:low`
- State at receipt time: open, mergeable, unmerged

## Not yet proven

- Independent exact-SHA owner review of PR #4.
- `loop-approved` label for PR #4.
- Durable Slack message/PR/SHA binding.
- Real mobile `🚀` delivery, `dry_run_ready` record, and Slack reply.
- Deployed GitHub-token read through the receiver.

## Next safe action

The repository owner reviews PR #4 at exact SHA
`bb2a24e22d54a4e1d39911c0384b75fba3a36d51` and explicitly approves or
requests changes. Do not enable the processing kill switch before that review.

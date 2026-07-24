# QUB-6 Resource Activation and Hardening Receipt

Recorded: `2026-07-24T06:55:21Z`
Owner: Qubitix101 repository owner
Mode: hosted dry-run only; no merge-capable credential or adapter

## Exact approved external actions

- PR #2 was marked ready and squash-merged only after exact-head required CI
  passed.
- The owner confirmed the isolated Supabase price of `USD 10/month`.
- The owner approved the Phase 2 operating contract and the custom Slack app
  setup for the single pilot workspace, channel, user, and repository.

## Proven results

### GitHub

- PR: `https://github.com/Qubitix101/codex-brain/pull/2`
- Reviewed and merged head:
  `2949117dfa23e4a6b3d542eb67a316a4ccb19146`
- Squash merge commit:
  `b039de113139494ba442489173012659d0c0bd5e`
- Post-merge workflow:
  `https://github.com/Qubitix101/codex-brain/actions/runs/30073055116`
- Result: required `verify` passed.

### Supabase

- Organization: `Qubitix101's Org` / `jnwgfixzykncdhdngjfm`
- Project: `jass-loop-pilot` / `afximcslmhbkidmtlitr`
- Region: `eu-central-1`
- Observed status: `ACTIVE_HEALTHY`
- Schema state: not applied. Migration waits for review of the private-schema
  hardening.

### Slack

- Workspace: Qubitix / `T0BK00B99LP`
- App: `Jass Loop Pilot` / `A0BKG3GDW4E`
- Pilot channel: private `#loop-codex-brain` / `C0BKE20NC0N`
- Installed bot user: `U0BKL1V6D09`
- Granted scopes: `chat:write`, `reactions:read`
- Removed scope: `channels:history`
- Channel membership: bot invite succeeded.
- Signing-secret safety: an accidentally displayed value was immediately
  regenerated; only the rotated value is configured. The invalidated value is
  not recorded here.

### Hosting

- Vercel project: `jass-loop-pilot`
- Encrypted production variables currently configured:
  - secrets: `SLACK_SIGNING_SECRET`, `SLACK_BOT_TOKEN`;
  - project endpoint: `SUPABASE_URL`;
  - exact workspace, channel, user, repository, base branch, trusted check
    name, and trusted check App ID allowlists;
  - locks: `JASS_LOOP_MODE=dry-run`,
    `JASS_LOOP_LIVE_MERGE_ENABLED=false`, and
    `JASS_LOOP_ENABLED=false`.
- Still absent: `GITHUB_READ_TOKEN` and `SUPABASE_SERVICE_ROLE_KEY`.
- Deployment state: none.

### Activation hardening

- Branch: `agent/qub-6-activation-hardening`
- Change:
  - signed Slack URL verification needs only `SLACK_SIGNING_SECRET`;
  - durable tables use non-exposed `jass_loop_private`;
  - public RPCs use `security invoker`;
  - only `service_role` receives RPC execution and private table access.
- Command: `npm run verify:loop`
- Result: repository structure and Jass Loop contracts passed; `46` approval
  tests passed, `0` failed.
- Command: `vercel build --yes` in `apps/slack-approval`
- Result: Vercel output build completed successfully using Node.js 22.
- Command: `npm audit --omit=dev`
- Result: `0` vulnerabilities.
- Checks: secret-pattern scan and `SECURITY DEFINER` scan
- Result: clean.
- Command: `git diff --check`
- Result: passed.

## Still unproven

- The activation-hardening exact SHA has not passed protected PR CI or human
  review.
- No Supabase migration has been applied.
- No production receiver is deployed and Slack Event Subscriptions are not
  enabled.
- No repository-scoped GitHub runtime credential or distinct reviewer check
  exists.
- No real mobile `🚀` round trip has occurred.
- No merge occurred from Slack, and live merge remains impossible by design.

## Next safe action

Publish the activation-hardening branch as a draft PR, run protected CI, and
obtain human review before applying SQL or deploying the receiver.

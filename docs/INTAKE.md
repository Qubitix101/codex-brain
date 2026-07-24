# Project Intake

Complete this before enabling an agent queue.

## Identity

- Project name: Codex Brain Loop Pilot
- Business owner: Qubitix101 repository owner
- Technical owner: Qubitix101 repository owner
- Repository: `https://github.com/Qubitix101/codex-brain`
- Default branch: `main`
- Linear workspace: Qubitix
- Linear team: `Qubitix`
- Slack workspace and pilot channel: Qubitix / private
  `#loop-codex-brain` (`C0BKE20NC0N`)

## Outcome and users

- Primary user: repository owner working from desktop or mobile.
- Problem: project work lacks one durable, end-to-end approval and proof route
  across Linear, Codex, GitHub, and Slack.
- Desired outcome: one bounded issue can be specified, built, independently
  reviewed, announced, and approved from Slack with a trustworthy dry-run
  receipt.
- Success measure: every exit condition in `docs/GOAL.md` is proven.
- Deadline: review on `2026-07-31`.

## Repository proof

- Install command: none; the verification path uses Node.js standard-library
  code only.
- Development command: not applicable; this repository has no runtime server.
- Test command: `npm run verify:loop`
- Typecheck command: not configured.
- Lint command: not configured.
- Build command: not configured.
- Real-interface verification path: open a pilot PR, observe required GitHub
  Actions, post its exact-SHA merge-ready package to the private Slack channel,
  and process a `🚀` event in dry-run mode.
- Existing `AGENTS.md` or runbook constraints: `CODEX.md`, `AGENTS.md`, and
  `runbooks/LOOPS.md`.

## Integration inventory

| Surface | Purpose | Account or workspace | Access verified | Write authority |
| --- | --- | --- | --- | --- |
| GitHub | Code, PRs, CI | `Qubitix101/codex-brain` | `yes, 2026-07-24` | branch/PR writes; human merge only |
| Linear | Scope and queue | `Qubitix` / `Codex Brain Loop Pilot` | `yes, 2026-07-24` | project and explicitly approved issue writes |
| Slack | Mobile steering | Qubitix / `#loop-codex-brain` | `yes, 2026-07-24` | scoped pilot messages; no merge authority |
| Hosting | Event receiver | Vercel personal team | `yes, 2026-07-24` | one isolated dry-run project |
| Database | Idempotency and approval receipts | Supabase / `Qubitix101's Org` | `yes, 2026-07-24` | isolated project only after repeated USD 10 cost confirmation |

Never place tokens or secrets in this file.

## Risk boundaries

- Sensitive paths: `.github/workflows/`, `scripts/install-global-skills.mjs`,
  `schemas/`, `skills/`, `templates/`, `apps/slack-approval/`.
- Production systems: none in the pilot.
- Regulated or personal data: none permitted in issues, logs, or receipts.
- Destructive operations: deleting branches, force-pushing, rewriting history,
  removing protections, or deleting integration state.
- Paid operations: Phase 2 ceiling is `USD 10/month`; no paid resource may be
  created until its current price is repeated and confirmed.
- Actions that always need a human: merging, live-merge activation,
  scheduling, scope expansion, and credentials or permissions broader than the
  exact Phase 2 contract.

## Phase 2 event-driven operating contract

- Owner: Jassim / Qubitix101 repository owner
- Scope: only `Qubitix101/codex-brain`
- Trigger: a `🚀` reaction on the exact bound merge-ready message
- Runtime: cloud event receiver; no polling, scheduler, daemon, or awake Mac
- Slack boundary: Qubitix workspace and private `#loop-codex-brain` only
- Mode: dry-run; record and report the decision, never merge
- Budget ceiling: `USD 10/month`
- Failure policy: fail closed, at most three deliveries, post a concise Slack
  failure reply, and never merge when state is uncertain
- Stop condition: `JASS_LOOP_ENABLED=false`
- Live merge lock: `JASS_LOOP_LIVE_MERGE_ENABLED=false`
- Approved by and date: repository owner in Codex on `2026-07-24`

## Queue policy

- Linear ready label: `agent-ready`
- Linear blocked label: `blocked`
- GitHub review labels: `loop-approved`, `loop-changes-requested`,
  `needs-human-review`
- GitHub rocket-pilot label: `risk:low` (never sufficient by itself)
- Maximum issue size: one independently verifiable agent-day or less.
- Builder concurrency for `Qubitix`: `1`
- Reviewer separation: reviewer must not be the builder context and must bind
  its result to the current PR head SHA.

## Recurring-work proposal

Leave this section unset unless the user explicitly asks for unattended work.
Approval requires every field.

- Owner: `UNSET`
- Scope: `UNSET`
- Schedule: `UNSET`
- Budget or cost ceiling: `UNSET`
- Failure and notification policy: `UNSET`
- Stop condition: `UNSET`
- Approved by and date: `UNSET`

# Project Agent Operating Contract

These instructions apply to every agent working in this repository. More
specific `AGENTS.md` files may add stricter rules for their subtrees.

## Durable source of truth

Read these files before changing the project:

1. `AGENTS.md`
2. `STATUS.md`
3. `docs/GOAL.md`
4. `docs/INTAKE.md`
5. `docs/HANDOFF.md`
6. `docs/DECISIONS.md`
7. `runbooks/LOOPS.md`
8. `docs/MERGE_READY_MESSAGE.md` for any PR or Slack approval package
9. the relevant Linear issue on team `Qubitix`

Linear is the source of truth for approved work scope and queue state. Repository
files are the source of truth for implementation, verification, decisions, and
handoff. Chat is not durable project memory.

## One bounded pass

Every invocation performs one bounded unit of work and then stops with a
receipt, a precise blocker, or an empty-queue report. Do not silently turn an
invocation into a recurring job.

Use this loop:

```text
Run -> Drive -> Prove -> Unblock -> repeat until receipt or genuine blocker
```

- Run the smallest relevant build, test, script, or validation.
- Drive changed behavior through the real interface when practical.
- Prove the result with concrete evidence recorded in `receipts/`.
- Unblock only with narrow, in-scope fixes; otherwise state the exact human
  decision required.
- Cross-check green status independently where practical.

## Scope and ownership

- Acceptance criteria and non-goals in the linked Linear issue are binding.
- Canonical verification is `npm run verify:loop`; the repository-level
  structural check is `npm run check`.
- This repository has no application build, runtime server, or deployment
  target. Do not invent build, typecheck, lint, or deployment claims.
- Do not invent work, expand scope, or perform opportunistic refactors.
- Require a clean working tree before claiming builder work. Never hide,
  overwrite, reset, or commit unrelated user changes.
- Only one builder may operate on team `Qubitix` at a time. A Linear
  assignee is a cooperative lock, not an atomic lock.
- Prefer a separate worktree or chat for each independent implementation unit.
- A reviewer must inspect the exact PR head SHA it reports on.

## Authority gates

- Humans merge by default. `loop-approved` is evidence, not authorization.
- Never merge, enable auto-merge, deploy, publish, send, delete, spend, rotate
  credentials, or change production data unless a project rule and the user
  explicitly authorize that exact action.
- Never create a scheduled or recurring job without an explicitly approved
  owner, scope, schedule, budget or cost ceiling, failure policy, and stop
  condition.
- Treat changes to authentication, authorization, billing, schemas,
  provisioning, deployment, secrets, and destructive data paths as
  human-review work.
- Treat `.github/workflows/`, `scripts/install-global-skills.mjs`,
  `schemas/`, `skills/`, `templates/`, and `apps/slack-approval/` as sensitive
  paths requiring explicit human review.
- The Slack approval service is dry-run-only. Do not change
  `liveMergeEnabled` to true, deploy a receiver, provision credentials, or
  grant merge permissions without a new explicit owner decision and receipt.

## End-of-pass contract

Before ending a pass:

1. Re-read the diff and working-tree status.
2. Record commands and outcomes in a timestamped receipt.
3. Update `STATUS.md` and `docs/HANDOFF.md` when project state changed.
4. Record durable tradeoffs in `docs/DECISIONS.md`.
5. Report what is proven, what is not, and the single next safe action.

# Loop Engineering Runbook

## Choose the right control primitive

| Need | Use | Exit |
| --- | --- | --- |
| One measurable outcome | Goal | Exit condition is proven |
| One repeatable improvement cycle | Bounded loop | Iteration receipt or limit |
| Independent units with dependencies | Workflow or work graph | All nodes proven |
| Repeated known method | Skill | Skill output contract |
| Persistent scripts, fixtures, and history | Workspace or harness | Durable artifacts |

A loop is a feedback cycle, not a promise of infinite execution. A goal holds a
measurable end condition. A workflow coordinates multiple bounded roles.

## Project startup

1. Complete `docs/INTAKE.md`.
2. Define the outcome, exit tests, budgets, and stop conditions in
   `docs/GOAL.md`.
3. Run `$loop-engineering-bootstrap` to audit the repository and propose the
   smallest proof-first work graph.
4. With the user present, run `$finn-spec` for each buildable slice.
5. The user reviews each Linear issue and applies `agent-ready`.
6. Run one `$finn-build` pass.
7. Run one independent `$finn-review` pass.
8. A human merges by default.
9. Record the receipt, status, decisions, and handoff.

## Pass contract

Every build or review pass has this boundary:

```text
Input contract -> one unit -> verification -> receipt -> stop
```

Do not create a hidden polling loop. Re-invocation may be manual, a separately
approved scheduler, or a cloud event, but each invocation still does one unit.

## State machine

```text
idea
  -> spec draft
  -> user-confirmed Linear issue
  -> agent-ready
  -> claimed/in progress
  -> PR opened
  -> exact-SHA review
  -> loop-approved | loop-changes-requested | needs-human-review
  -> human merge
  -> verified outcome receipt
```

- `blocked` excludes an issue from the build queue until a human answers.
- New commits invalidate any prior exact-SHA verdict.
- Missing required CI never becomes `loop-approved`.
- Merge is not deployment; prove deployment separately.

## Codex Brain pilot binding

- Repository: `Qubitix101/codex-brain`
- Base branch: `main`
- Linear project: `Codex Brain Loop Pilot`
- Slack channel: private `#loop-codex-brain` (`C0BKE20NC0N`)
- Builder concurrency: `1`
- Reviewer concurrency: `1`
- Retry ceiling: `3` verification attempts per bounded pass
- No-progress threshold: two attempts without new evidence
- Failure notification: post a concise blocker in the pilot Slack channel
  only after a real pilot PR exists
- Stop/kill path: stop the current Codex task; no scheduler or daemon exists
- Merge mode: human only
- Rocket mode: dry-run decision receipt only

## Verification loop

Use:

```text
Run -> Drive -> Prove -> Unblock -> repeat until receipt or blocker
```

For each acceptance criterion, record:

- the command or interaction used;
- the observed result;
- the artifact, log, screenshot, CI run, or value receipt;
- an independent check where practical;
- any remaining limits.

## Status checks

Run `$loop-status` for a read-only snapshot. It must distinguish:

- configured from connected;
- scheduled from continuously running;
- worker-reported done from independently proven green;
- merged from deployed;
- blocked work from an empty queue.

## Recurring and unattended execution

Do not create or enable a scheduler, cron job, automation, monitor, daemon, or
recurring cloud task until the user explicitly approves:

1. owner;
2. scope;
3. schedule;
4. budget or cost ceiling;
5. failure and notification policy;
6. stop condition.

Record the approved values in `docs/INTAKE.md` and the activation evidence in a
receipt. Local schedules depend on the host being awake and the relevant app or
session running; describe that constraint plainly.

## Recovery

- Dirty checkout: report paths and stop; never stash or reset user work.
- Lost ownership: re-fetch Linear before editing; do not assume the old claim.
- Stale review: discard it and review the new head SHA.
- Failed CI: record the failing check; builder handles only in-scope fixes.
- Product ambiguity: add `blocked`, ask one precise question, unassign, stop.
- External outage: preserve the partial receipt, next retry condition, and
  whether any external write may have succeeded.

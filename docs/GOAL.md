# Goal Contract

Goal ID: `GOAL-001`
Owner: `Qubitix101 repository owner`
Status: `active`
Started: `2026-07-24`
Deadline or review date: `2026-07-31`

## Outcome

Prove one safe, mobile-visible Linear -> Codex -> GitHub -> Slack workflow for
`Qubitix101/codex-brain` without enabling automated merging.

## Measurable exit condition

The goal is complete only when all of these are true:

- [ ] `EXIT-1` — a low-risk Linear issue produces a focused pull request whose
  required CI passes.
- [ ] `EXIT-2` — an independent exact-SHA review produces a merge-ready Slack
  message in `#loop-codex-brain`.
- [ ] `EXIT-3` — the repository owner reacts with `🚀`, the dry-run service
  records an approval decision, and no GitHub merge occurs.
- [ ] `EXIT-4` — a timestamped repository receipt links the Linear issue, PR,
  reviewed SHA, CI run, Slack message, reaction decision, and human next step.

## Verification

- Primary proof: GitHub Actions `Loop validation` plus a durable dry-run
  approval record.
- Independent cross-check: exact-SHA `$jass-loop-review` from a context separate
  from the builder.
- Receipt path: `receipts/YYYY-MM-DDTHH-MM-SSZ-QUB-NNN-*.md`
- Human acceptance needed: yes; the owner decides whether to merge manually
  and whether a later live-merge phase may be designed.

## Constraints

- Security and privacy: no credentials in Git, exact-SHA binding, allowlisted
  repository/channel/user, fail-closed checks, no sensitive PR classification
  as low risk.
- Compatibility: Node.js 18 or newer; GitHub Actions uses Node.js 22.
- Scope boundaries: repository `Qubitix101/codex-brain`, base branch `main`,
  Linear team `Qubitix`, private Slack channel `#loop-codex-brain`.
- Non-goals: polling or scheduled workers, live merge, a merge-capable GitHub
  credential, application deployment, or rollout to another repository.

## Resources and budget

- Human owner: `Qubitix101 repository owner`
- Compute or token budget: one bounded builder pass and one bounded reviewer
  pass per issue; stop after three failed verification attempts.
- External spend ceiling: `USD 10/month` for the isolated Phase 2 receipt
  store; current price must be repeated and confirmed before creation.
- Timebox: one week, reviewed by `2026-07-31`.
- Concurrency limit: one builder and one separate reviewer.

## Stop conditions

Stop and request direction when:

- the outcome or exit test becomes ambiguous;
- work would cross an explicit non-goal;
- the next step requires new external authority;
- the cost or timebox would be exceeded;
- the same genuine blocker remains after safe alternatives are exhausted.

## Work graph

List small, independently verifiable Linear issues. Use blocker relations rather
than relying on prose order.

| Issue | Outcome | Blocked by | Receipt |
| --- | --- | --- | --- |
| `QUB-NNN` | Prove one dry-run mobile approval round trip | `None` | `receipts/...` |

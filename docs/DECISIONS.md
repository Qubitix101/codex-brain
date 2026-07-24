# Decision Log

Record decisions that future agents must not rediscover. Do not rewrite old
entries; append a superseding decision.

## DEC-001 — Human merge is the default

- Date: `2026-07-24`
- Status: Accepted
- Owner: Project owner
- Context: Agent review labels and emoji reactions can communicate evidence,
  but mutable labels or chat reactions alone do not prove that a PR is still
  the reviewed commit.
- Decision: Agents may prepare and review PRs, but a human makes the merge
  decision unless a separately approved exact-SHA merge policy is installed.
- Consequences: `loop-approved` is evidence only. Every review records the
  exact PR head SHA. Any new commit invalidates the prior verdict.
- Supersedes: None

## DEC-002 — Pilot on codex-brain

- Date: `2026-07-24`
- Status: Accepted
- Owner: Qubitix101 repository owner
- Context: The GitHub account has multiple production-like repositories. The
  first integration needs low blast radius and direct relevance to every new
  project.
- Options considered: `codex-brain`, `skill-library`, `forqe`,
  `nordiceducation-v2`, and a new repository.
- Decision: Use `Qubitix101/codex-brain` as the single pilot repository.
- Consequences: GitHub App permissions, CI, labels, Slack routing, and all
  approval bindings remain repository-scoped until this goal is complete.
- Evidence: owner approval in the Codex task on `2026-07-24`.
- Supersedes: None

## DEC-003 — Rocket is dry-run authorization evidence

- Date: `2026-07-24`
- Status: Accepted
- Owner: Qubitix101 repository owner
- Context: A mutable Slack reaction cannot by itself prove current CI,
  mergeability, reviewer identity, or exact commit SHA.
- Options considered: immediate reaction-to-merge, notification-only, and
  exact-SHA dry-run authorization.
- Decision: `🚀` may authorize one dry-run attempt bound to one repository,
  PR, message, and reviewed SHA. It must not merge.
- Consequences: `✅` is reserved for a durable completed outcome; live mode
  requires a new explicit decision after the dry-run receipt is independently
  verified.
- Evidence: `apps/slack-approval/` policy tests and `docs/GOAL.md`.
- Supersedes: None

## Decision template

### DEC-NNN — Short title

- Date:
- Status: Proposed | Accepted | Superseded
- Owner:
- Context:
- Options considered:
- Decision:
- Consequences:
- Evidence:
- Supersedes:

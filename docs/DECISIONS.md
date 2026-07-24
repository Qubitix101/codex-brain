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

## DEC-004 — Phase 2 is an event-driven, non-mergeable bridge

- Date: `2026-07-24`
- Status: Accepted
- Owner: Qubitix101 repository owner
- Context: Mobile approval must work while the owner's Mac is asleep without
  giving an unproven reaction bridge merge authority.
- Options considered: local polling, hosted polling, and a signed cloud event
  receiver.
- Decision: Host one signed Slack Events API receiver for
  `Qubitix101/codex-brain`. It records an atomic durable dry-run decision,
  reads GitHub through repository-scoped credentials, and replies in Slack.
  The runtime rejects live mode and its GitHub adapter has no merge request.
- Consequences: The pilot can prove a real mobile `🚀` round trip. A separate
  explicit decision is still required before any merge-capable code or
  permission exists. The kill switch is `JASS_LOOP_ENABLED=false`.
- Evidence: owner approval in Codex and Linear issue `QUB-6`.
- Supersedes: the Phase 1 zero-hosting and zero-spend boundary only; DEC-001
  and DEC-003 remain active.

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

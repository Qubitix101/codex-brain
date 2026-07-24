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

## DEC-005 — Bootstrap verification and persistence stay least-privileged

- Date: `2026-07-24`
- Status: Proposed
- Owner: proposed by the QUB-6 builder for repository-owner review
- Context: Slack must verify the receiver URL before all runtime adapters are
  provisioned, and Supabase warns against privileged `security definer`
  functions in an exposed schema.
- Options considered: require every credential during URL verification; keep
  public privileged functions; or separate signed bootstrap verification and
  private persistence.
- Decision: Slack URL verification loads only the signing secret. Durable
  tables live in non-exposed `jass_loop_private`; callable public RPCs use
  `security invoker` and are granted only to `service_role`.
- Consequences: Request signing remains mandatory, URL setup no longer depends
  on unrelated credentials, and browser/anonymous roles cannot reach the
  durable tables or RPCs.
- Evidence: activation-hardening tests and
  `receipts/2026-07-24T06-55-21Z-QUB-6-resource-activation.md`.
- Supersedes: None

## DEC-006 — Adopt the reviewed HTTP event activation boundary

- Date: `2026-07-24`
- Status: Accepted
- Owner: Qubitix101 repository owner
- Context: PR #3 implemented the proposed private persistence and
  signing-secret-only URL verification boundary. The owner approved PR #3 and
  the exact reviewed change was merged before migration and deployment.
- Options considered: keep the receiver inactive; deploy with public
  persistence; or adopt the reviewed private-schema HTTP event design.
- Decision: Adopt the PR #3 design, apply only its reviewed migrations, and
  subscribe the Slack app only to `reaction_added` at the verified HTTPS
  receiver. Keep processing and live merge disabled until the bounded mobile
  proof package is independently reviewed.
- Consequences: Slack can deliver reactions while the Mac is asleep, but no
  event is processed until `JASS_LOOP_ENABLED=true`, and no merge path exists.
- Evidence: PR #3, GitHub Actions runs `30092198339` and `30095571190`,
  Vercel deployment `dpl_8hi3JywQ1GyDfnsNT9uMYdcLn8a2`, and
  `receipts/2026-07-24T13-08-23Z-QUB-6-slack-event-activation.md`.
- Supersedes: DEC-005 proposed status

## DEC-007 — Only an attached reaction is an approval event

- Date: `2026-07-24`
- Status: Accepted
- Owner: Qubitix101 repository owner
- Context: Slack mobile lets a user either send an emoji in the message box or
  attach an emoji to an existing message. Only the attached reaction produces
  the exact `reaction_added` event bound to the reviewed PR card.
- Options considered: treat a standalone rocket message as approval, infer the
  nearest review card, or require an attached reaction on the exact card.
- Decision: Only a `🚀` attached with Slack **Add reaction** to the exact bound
  merge-ready message counts. A standalone `🚀` message is never approval.
- Consequences: The user should long-press or open the message menu and choose
  **Add reaction**. The system stays fail-closed when the emoji is sent in the
  message box.
- Evidence:
  `receipts/2026-07-24T14-24-57Z-QUB-6-rocket-dry-run.md`.
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

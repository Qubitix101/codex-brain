# Vertical Slice Planning Framework

Codex Brain should decompose work into demoable vertical slices wherever possible.

This borrows the strongest execution lesson from TracerKit: AI coding agents do better with small, complete, verifiable slices than with giant layer-based tasks.

## Definition

A vertical slice is a thin implementation path through every needed layer:

```text
data/schema -> service/domain logic -> API/command -> UI or integration -> tests -> verification
```

The slice should produce a user-visible, operator-visible, or test-visible outcome.

## Why It Matters

Layer-by-layer plans hide integration risk until late.

Vertical slices:

- reveal architecture mistakes early
- create demoable progress
- keep PRDs reviewable
- make testing concrete
- reduce giant final integration failures
- help Codex stay inside one focused execution loop

## When To Use

Use vertical slices for:

- user-facing features
- SaaS workflows
- dashboards
- integrations
- AI-core features
- multi-step product flows
- anything with database plus backend plus frontend

Layer-first work is allowed only when:

- a foundational migration is required before any slice can run
- a shared API contract must exist before parallel implementation
- infrastructure setup is the slice

Even then, the foundation must have concrete verification.

## Plan Shape

Each slice must include:

- slice title based on demo outcome
- user story or operator story
- layers touched
- tasks
- acceptance criteria
- verification commands
- expected artifact changes
- risk notes

Good slice title:

- Phase 1 - User can create a workspace and see it listed
- Phase 2 - Admin can invite a team member and revoke access
- Phase 3 - Billing entitlement blocks premium action after downgrade

Bad slice title:

- Database work
- Backend implementation
- Frontend polish

## Done-When Rules

Every checkbox must be verifiable by at least one of:

- file exists
- test exists
- test passes
- command passes
- UI state is visible
- API returns expected contract
- database constraint exists
- log/metric/alert exists
- documentation section exists

Do not use prose-only checkboxes.

Bad:

```markdown
- [ ] Improve security
```

Good:

```markdown
- [ ] Add tenant isolation test for project reads. Verify: `npm test -- tenant-isolation`
```

## Slice Size

Prefer:

- 2 to 5 slices per PRD
- 3 to 8 tasks per slice
- one slice per Codex execution session when risk is moderate

Split when:

- more than 10 files are likely to change
- more than one independent user outcome exists
- multiple teams/agents would touch the same files
- acceptance criteria cannot be verified in one pass

## Full-Mode Requirements

For Full mode, every vertical slice should map to:

- Build Plan section
- PRD requirement
- risk register item if relevant
- test strategy row
- privacy/security/database/design gate when relevant
- launch or observability consideration when user-impacting

This mapping is required for traceability and enterprise-quality review.

## Verification

Use `scripts/verify-plan.mjs` against PRDs and plan files.

The script should flag:

- unchecked tasks
- checkboxes without verification hints
- slices without acceptance criteria
- plans with too many unscoped tasks
- "build everything" style tasks

Human judgment still matters, but the script catches common planning defects.

## Anti-Patterns

- Planning by technical layer without a demo outcome.
- Creating a slice that cannot be tested.
- Hiding security, privacy, or database work in generic implementation tasks.
- Marking a slice complete because code exists but behavior is not verified.


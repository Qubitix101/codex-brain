# Quick Flow Framework

Quick Flow is Codex Brain's fast path for low-risk work.

It is inspired by BMAD Quick Dev and TracerKit's small PRD-plan-build-check loop, but adapted to Codex Brain's gate system.

## Purpose

Quick Flow exists because not every request deserves Full-mode ceremony.

It must still prevent blind building.

Quick Flow is allowed when the work is:

- low risk
- small enough for one focused implementation loop or a few vertical slices
- not regulated
- not multi-tenant
- not payment-critical
- not security-critical
- not a major architecture decision
- not a frontend build without Design DNA

## Quick Flow Is Not Allowed When

Escalate out of Quick Flow if any trigger appears:

- user accounts or user data are involved and no auth/privacy baseline exists
- multi-tenancy or tenant isolation is involved
- payments, billing, refunds, taxes, or entitlements are involved
- EU personal data is involved and GDPR analysis is missing
- AI behavior materially affects users
- product is enterprise-facing
- user asks for world-class, top-ten, unicorn, no-corners-cut, or maximum quality
- change touches more than one major product surface without a plan
- change needs a database migration without an ADR or data model

## Required Artifacts

Quick Flow produces:

- `.codex-brain/quick-spec.md` or `docs/prd/quick-spec-[slug].md`
- acceptance criteria
- verification commands
- changed-file summary
- lesson candidate if something reusable is learned

## Steps

### 1. Clarify Intent

Codex identifies:

- user goal
- target user
- visible outcome
- non-goals
- risk triggers
- whether UI exists
- whether Design DNA is required

If the intent is ambiguous, ask one focused question.

### 2. Write Quick Spec

The Quick Spec must include:

- goal
- mode and why Quick Flow is allowed
- scope
- out of scope
- implementation notes
- tasks
- acceptance criteria
- verification commands

### 3. Implement One Slice

Implement the smallest complete slice that proves the goal.

Prefer:

- schema/service/API/UI/tests in one slice when applicable
- one visible outcome
- one reviewable diff

Avoid:

- broad refactors
- unrelated cleanup
- hidden architecture rewrites

### 4. Verify

Run the relevant checks:

- build
- tests
- lint/typecheck
- UI screenshot or visual check if frontend exists
- targeted manual verification notes when automation is unavailable

### 5. Update State and Learn

Update:

- task record
- memory progress
- lesson if a reusable rule emerged

## Quick Spec Quality Bar

A Quick Spec is valid only if:

- every task can be verified
- every acceptance criterion is observable
- risks are explicitly low
- escalation triggers were checked
- frontend work has Design DNA approval when UI matters

## Anti-Patterns

- Using Quick Flow because the user is impatient on a high-risk product.
- Building multiple unrelated goals in one quick spec.
- Marking work complete without verification.
- Using Quick Flow for a feature that should become a PRD and vertical-slice plan.


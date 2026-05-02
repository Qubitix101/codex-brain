# Test Architecture Framework

Testing is a product architecture concern, not a final clean-up activity.

This framework adds BMAD TEA-style thinking to Codex Brain and adapts it for Full-mode product quality.

## Purpose

The goal is to prove that the product behaves correctly, fails safely, and remains changeable.

Testing must cover:

- requirements
- user journeys
- edge cases
- security boundaries
- privacy obligations
- database constraints
- accessibility
- performance and reliability
- AI behavior and evals when applicable
- billing and entitlement logic when applicable

## Test Strategy By Mode

### Light

Minimum:

- smoke test or targeted command
- unit test for non-trivial logic
- manual verification note if no test harness exists

### Standard

Minimum:

- unit tests for domain logic
- integration tests for APIs/services
- E2E tests for critical user flows
- auth and authorization tests if user data exists
- accessibility checks for UI
- build/type/lint checks where applicable

### Full

Minimum:

- requirements traceability matrix
- risk-ranked test plan
- unit, integration, E2E, accessibility, security, privacy, and performance coverage
- database migration and rollback tests
- multi-tenant isolation tests
- billing edge-case tests if paid
- AI evals and safety/fallback tests if AI-core
- release gate with pass/fail evidence

## Requirements Traceability

Every important requirement should map to:

- source artifact
- PRD id
- vertical slice
- test type
- test file or verification command
- risk priority
- status

P0/P1 requirements cannot ship without verification or explicit user-accepted risk.

## Risk Priority

Use:

- P0: blocks build, security, privacy, data isolation, money movement, or critical user journey
- P1: high user or business impact
- P2: normal product behavior
- P3: polish or low-risk edge

Full-mode review must focus first on P0/P1.

## AI-Core Test Requirements

If AI is central to the product:

- define eval cases before implementation
- include expected good outputs
- include unacceptable outputs
- test prompt injection resistance if tools or private data are involved
- test fallback behavior
- test cost/rate-limit behavior
- test human escalation or user correction path

## Security and Privacy Tests

Required when user data exists:

- authorization matrix tests
- unauthenticated access tests
- tenant isolation tests
- input validation tests
- secret exposure review
- personal data export/delete verification when applicable
- logging redaction tests for sensitive fields

## Frontend and Accessibility Tests

Required when UI exists:

- critical journey E2E tests
- loading, empty, and error states
- keyboard navigation
- focus states
- semantic labels
- contrast review
- responsive screenshots or visual checks for major screens

## Release Gate

Before ship, Codex should report:

- checks run
- pass/fail status
- untested P0/P1 requirements
- known residual risks
- rollback readiness
- monitoring readiness

## Anti-Patterns

- Adding tests only after the product is built.
- Testing happy paths while ignoring auth, tenant, billing, and privacy failures.
- Treating AI demos as evals.
- Shipping Full-mode product without traceability.
- Marking acceptance criteria complete without test or verification evidence.


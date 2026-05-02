# Test Architect

Use this role for Standard and Full projects when test strategy, requirements traceability, release gates, or risk-based test prioritization matter.

## Mission

Find the places where the product could appear finished while still being unproven.

## Review Inputs

- PRD
- Build Plan
- vertical-slice plan
- traceability matrix
- existing tests
- CI/check output
- security/privacy/database requirements
- Design DNA and frontend states if UI exists

## Required Output

- P0/P1 untested requirements
- missing test types
- weak assertions
- brittle tests
- missing tenant/security/privacy/billing/AI eval coverage
- release gate recommendation

## Blockers

Block ship if:

- P0 requirement has no verification
- tenant isolation is untested in multi-tenant product
- auth/authorization is untested for user data
- paid product lacks entitlement and billing edge-case tests
- AI-core product lacks eval and fallback tests
- critical UI journey lacks E2E or manual verification evidence


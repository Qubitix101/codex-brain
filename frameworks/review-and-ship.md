# Review and Ship Framework

Review is a gate, not a vibe check.

## Review Axes

All modes:

- correctness
- build/test status
- user-facing behavior
- obvious security issues

Standard:

- code quality
- architecture
- auth/authorization
- privacy
- accessibility for UI
- performance
- deployment readiness

Full:

- adversarial product review
- security threat review
- GDPR/privacy review
- database isolation review
- scale/performance review
- reliability/SLO review
- billing edge-case review if paid
- AI eval/safety review if AI-core
- accessibility review
- trust/communication review

## Ship Gate

Before production:

- tests pass
- build passes
- migrations safe
- secrets configured
- monitoring installed
- health check exists
- rollback plan exists
- smoke tests defined
- critical/high findings resolved
- user approval recorded

## Launch Learning

After launch:

- capture metrics
- log incidents
- record user feedback
- update lessons
- create follow-up PRDs


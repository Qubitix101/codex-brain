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

- work was completed on a non-`main` branch unless the user explicitly approved direct `main` work
- pull request exists for meaningful features, fixes, redesigns, refactors, infrastructure changes, database changes, or experiments
- local Codex review with `/review` was run when available
- GitHub Codex Code Review was requested or ran automatically when the repository integration is available
- P0 and P1 Codex Code Review findings are resolved or explicitly escalated to the user
- the agreed QA/subagent evidence was produced or the skipped evidence is documented with accepted risk
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
- merge into `main` approved by the user

## Launch Learning

After launch:

- capture metrics
- log incidents
- record user feedback
- update lessons
- create follow-up PRDs

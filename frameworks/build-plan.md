# Build Plan Framework

The Build Plan is the source of truth before execution.

## Required Sections

All modes:

- product summary
- target user
- core workflows
- technical approach
- capability and access map reference
- data model
- task phases
- verification plan

Standard:

- architecture
- database choice
- auth model
- API/module contracts
- integration access surface decisions
- security baseline
- privacy baseline
- deployment plan
- Design DNA reference
- testing strategy

Full:

- market and moat context
- alternatives and ADRs
- database scale model
- multi-tenancy plan
- security threat model
- GDPR/data processing plan
- billing edge cases
- reliability/SLO plan
- observability
- AI orchestration and eval plan if applicable
- capability/access blockers and mock/live verification plan
- narrative promise list
- launch plan

## Quality Test

An engineer who has never heard of the project should be able to build the correct product from the Build Plan and PRDs.

If that is not true, planning is not done.

# Build Plan Framework

The Build Plan is the source of truth before execution.

## Required Sections

All modes:

- product summary
- target user
- core workflows
- technical approach
- agentic opportunity/intelligence-system reference if AI or automation is relevant
- intelligence-architecture reference if RAG, structured retrieval, extraction, memory, workflow, action, or routine automation is relevant
- agent-engineering/skill-inventory reference if agents, retrieval, model routing, or procedural skills are relevant
- Agent OS runtime reference if L3+, memory-writing, tool-using, routine-heavy, multi-agent, or externally acting behavior is relevant
- agent network/interoperability reference if agents or domain operating systems collaborate across boundaries
- capability and access map reference
- data model
- task phases
- verification plan

Standard:

- architecture
- intelligence-system architecture if applicable
- intelligence-architecture substrate decision if applicable
- agent-engineering discipline and skill plan if applicable
- Agent OS runtime plan if applicable
- agent network/interoperability plan if applicable
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
- agentic maturity, first closed loop, memory/routine/approval/eval model if applicable
- RAG vs structured retrieval vs extraction vs ADK/workflow decision if applicable
- seven-discipline agent-engineering readiness, model routing, skill trust levels, and skill eval plan if applicable
- Agent OS runtime kernel and human control model if applicable
- agent cards, delegation boundaries, MCP versus A2A-style decisions, context sharing, streaming, traces, recovery, and versioning if applicable
- capability/access blockers and mock/live verification plan
- narrative promise list
- launch plan

## Quality Test

An engineer who has never heard of the project should be able to build the correct product from the Build Plan and PRDs.

If that is not true, planning is not done.

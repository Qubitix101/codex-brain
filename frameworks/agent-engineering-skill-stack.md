# Agent Engineering Skill Stack Framework

Codex Brain must treat production agents as engineered systems, not prompt collections.

This framework converts agentic ambition into an enterprise readiness audit. It sits after the Agentic Opportunity Audit, Intelligence System Plan, and Intelligence Architecture Decision, and before Capability and Access Readiness.

## Purpose

Agentic products fail when teams confuse a good model response with a working operating system.

The production bar is higher:

- the system must be architected
- tools must have strict contracts
- retrieval must return signal, not noise
- external failures must be handled
- permissions and safety must be bounded
- traces and evals must prove improvement
- the user experience must build trust

The Agent Engineering Skill Stack makes those requirements explicit before Build Plan approval.

## Gate 2.35

Agent Engineering sits after Intelligence Architecture and before Capability and Access.

```text
Classify -> Validate -> Research -> Agentic Opportunity -> Intelligence Architecture -> Agent Engineering -> Capability and Access -> Plan -> Design DNA -> Decompose -> Execute -> Review -> Ship -> Learn
```

Required artifacts for AI-core, agentic, automation-heavy, tool-using, retrieval-heavy, multi-model, or skill-driven products:

- `docs/agent-engineering-audit.md`
- `docs/skill-inventory.md`

Required input when AI architecture matters:

- `docs/intelligence-architecture-decision.md`

Projects may mark this gate not applicable only when the Agentic Opportunity Audit concludes L0 or simple L1 and the user accepts that the system will not include durable memory, tool use, retrieval, autonomous routines, or generated skills.

## The Seven Disciplines

### 1. System Design

The agent is an orchestra, not a prompt.

Audit:

- LLM/model boundary
- database/state ownership
- memory ownership
- retrieval path
- tool execution path
- sub-agent/model routing
- queues, jobs, and routines
- approval surfaces
- logs and traces
- failure boundaries

Blocking signals:

- no system diagram for a multi-tool agent
- no owner for state or memory
- no async/job model for slow tools
- no plan for multi-step coordination

### 2. Tool and Contract Design

Every tool is a contract. Vague contracts invite model guessing.

Audit:

- strict input schemas
- required fields
- examples
- output shape
- id formats
- idempotency
- read/write/destructive classification
- permission scope
- validation errors
- human-readable failure messages

Blocking signals:

- tool inputs described only in prose
- no examples for important parameters
- write tools callable without approval policy
- no output contract for downstream steps

### 3. Retrieval Engineering

Retrieval defines the ceiling of agent quality.

Audit:

- source inventory
- chunking strategy
- embedding model
- metadata filters
- reranking
- citation requirements
- freshness policy
- deletion/export policy
- relevance eval set
- answer-grounding rules

Blocking signals:

- RAG assumed without corpus design
- no source of truth
- no relevance metric
- no stale-data handling
- no citation or provenance rule for high-stakes answers

### 4. Reliability Engineering

Agents are software. APIs fail, tools time out, jobs get stuck, and providers drift.

Audit:

- timeouts
- retries with backoff
- fallback paths
- circuit breakers
- queue/job state
- resumability
- duplicate prevention
- rollback
- rate limits
- cost limits
- degradation mode

Blocking signals:

- unbounded retries
- no timeout model
- no fallback for critical dependency failure
- no job state for slow or expensive work
- no rollback path for external writes

### 5. Security and Safety

The agent is an attack surface.

Audit:

- prompt-injection boundary
- input validation
- output filtering
- least-privilege tools
- tenant isolation
- secret handling
- approval gates
- policy checks
- audit logs
- abuse cases
- destructive/public/paid action controls

Blocking signals:

- agent can access more data than needed
- public/send/delete/spend actions have no approval
- tool outputs are trusted blindly
- no prompt-injection strategy for untrusted content
- no tenant or user boundary for memory/retrieval

### 6. Evaluation and Observability

Vibes are not a deployment criterion.

Audit:

- trace timeline
- tool-call log
- retrieved-context log
- model-routing log
- eval sets
- golden examples
- regression tests
- success rate
- latency
- cost per task
- quality metrics
- drift detection

Blocking signals:

- no way to reproduce a bad answer
- no eval set for core workflows
- no cost or latency budget
- no trace of tool inputs/outputs
- no quality gate before external action

### 7. Product Trust and UX

Users need to understand what the agent can do, what it knows, what it is unsure about, and what needs approval.

Audit:

- confidence and uncertainty states
- evidence trail
- memory visibility
- pending approvals
- human escalation
- graceful errors
- undo/rollback affordance
- capability boundaries
- onboarding expectations
- review queues

Blocking signals:

- user cannot inspect why the agent answered or acted
- agent hides memory changes
- external actions feel automatic without consent
- errors expose raw system internals
- no escalation path when confidence is low

## Required Output

The audit must produce:

- discipline-by-discipline readiness score
- P0 blockers
- required architecture decisions
- tool-contract requirements
- retrieval requirements
- structured retrieval and extraction requirements
- reliability controls
- security and approval boundaries
- observability and eval plan
- product trust surfaces
- model-routing policy
- skill inventory
- skill trust levels
- skills that must be generated now
- skills that are deferred

## Model Routing Principle

Do not hardcode one model as the whole brain.

Use a router:

- latest facts or web-grounded research -> research/search provider or browser workflow
- code, refactor, test, repo work -> coding model/toolchain
- long reasoning, planning, critique -> strongest available reasoning model
- domain facts -> project retrieval/memory
- structured records -> database/API
- messy raw inputs that must become durable facts -> extraction pipeline with schema, provenance, confidence, and review
- governed SaaS actions -> MCP/connector
- deterministic local work -> CLI
- rendered visual state -> browser automation
- desktop-only workflows -> Computer Use or generated harness

Every route must document:

- trigger
- input contract
- output contract
- fallback
- eval
- cost and latency expectation
- permission boundary

## Skill Factory Principle

Generate procedural skills from repeated operating loops, not from vague ideas.

Good skill candidates are:

- repeatable
- bounded
- artifact-producing
- triggerable by a clear description
- dependent on known inputs
- verifiable by known outputs
- safe under documented permissions
- useful across more than one session

Bad skill candidates are:

- broad job titles
- vague reasoning instructions
- one-off implementation tasks
- hidden autonomy
- scripts that touch secrets or external systems without review

## Anti-Patterns

- Calling prompt polish "agent engineering."
- Building tool access before contracts and approvals exist.
- Adding RAG without retrieval evals.
- Using RAG where deterministic structured retrieval or extraction would be more correct.
- Adding autonomous routines without observability.
- Generating executable skills before trust review.
- Building a chat UI where the real product needs evidence, memory, approvals, and traceability.

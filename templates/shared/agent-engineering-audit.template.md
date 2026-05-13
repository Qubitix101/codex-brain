# Agent Engineering Audit

## 1. Metadata

- Project:
- Date:
- Owner:
- Related agentic audit:
- Related intelligence system plan:
- Related intelligence architecture decision:
- Related skill inventory:
- Related Agent OS runtime plan:
- Related agent network/interoperability plan:
- Related capability/access map:
- Target maturity now:
- Target maturity later:

## 2. Agent Engineering Thesis

State why this product requires production-agent engineering beyond prompt design.

## 3. Model and Orchestration Policy

| Work Type | Primary Route | Fallback | Freshness Need | Cost/Latency Guardrail | Approval Needed |
| --- | --- | --- | --- | --- | --- |
| Latest research |  |  |  |  |  |
| Coding/build work |  |  |  |  |  |
| Long reasoning/planning |  |  |  |  |  |
| Domain retrieval |  |  |  |  |  |
| Database/API reads |  |  |  |  |  |
| External writes |  |  |  |  |  |
| Visual verification |  |  |  |  |  |
| Desktop-only workflow |  |  |  |  |  |

## 4. Seven-Discipline Readiness Audit

### 4.1 System Design

- Component map:
- Data-flow map:
- State and memory owner:
- Async/job model:
- Model/sub-agent routing:
- Failure boundaries:
- P0 blockers:
- Decisions required before Build Plan:

### 4.2 Tool and Contract Design

- Tool inventory:
- Strict schema requirements:
- Input examples needed:
- Output contracts:
- Read/write/destructive classification:
- Approval policy:
- P0 blockers:

### 4.3 Retrieval Engineering

- Source inventory:
- Chunking/ranking approach:
- Citation/provenance policy:
- Freshness policy:
- Retrieval eval set:
- Deletion/export requirements:
- P0 blockers:

### 4.4 Reliability Engineering

- Timeout policy:
- Retry/backoff policy:
- Fallbacks:
- Circuit breakers:
- Job state/resumability:
- Idempotency:
- Rollback:
- Rate/cost limits:
- P0 blockers:

### 4.5 Security and Safety

- Threat model summary:
- Prompt-injection controls:
- Input validation:
- Output filtering:
- Permission matrix:
- Tenant/user boundaries:
- Secret handling:
- Approval gates:
- Audit logs:
- P0 blockers:

### 4.6 Evaluation and Observability

- Trace schema:
- Tool-call logging:
- Retrieved-context logging:
- Golden examples:
- Eval suite:
- Success metrics:
- Latency/cost metrics:
- Drift detection:
- P0 blockers:

### 4.7 Product Trust and UX

- Evidence trail:
- Confidence/uncertainty states:
- Memory visibility:
- Approval surfaces:
- Human escalation:
- Graceful failure UX:
- Undo/rollback UX:
- P0 blockers:

## 5. Production Readiness Score

| Discipline | Score 0-3 | P0/P1 Gaps | Required Artifact |
| --- | ---: | --- | --- |
| System design |  |  |  |
| Tool contracts |  |  |  |
| Retrieval |  |  |  |
| Reliability |  |  |  |
| Security/safety |  |  |  |
| Evals/observability |  |  |  |
| Product trust/UX |  |  |  |

Scoring:

- 0: missing
- 1: drafted but unsafe or incomplete
- 2: usable for first slice with known limits
- 3: production-ready for current scope

## 6. Build Plan Requirements

List the requirements the Build Plan must include because of this audit.

- Architecture:
- Tool contracts:
- Retrieval:
- Reliability:
- Security:
- Evals/observability:
- Product UX:
- Skills:
- Agent OS runtime requirements:

## 7. Gate Decision

- Status: blocked / conditional / approved / not applicable
- Conditions:
- Deferred agent-engineering layers:
- Revisit trigger:

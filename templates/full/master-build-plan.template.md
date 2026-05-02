# [Project Name] - Full Mode Master Build Plan

This template is intentionally exhaustive. Delete sections only when the deletion is explicitly justified.

## 0. Build Plan Metadata

- Project:
- Mode: Full
- Date:
- Owner:
- Related classification:
- Related research matrix:
- Evidence ledger:
- Design DNA:

## 1. Executive Product Summary

### Product Category

### Target User

### Buyer

### Core Problem

### Product Promise

### Core Workflow

### Success Criteria

### Non-Goals

## 2. Classification and Gate History

| Gate | Status | Evidence | Notes |
| --- | --- | --- | --- |
| Classification | | | |
| Validation | | | |
| Research | | | |
| Design DNA | | | |
| Plan | | | |

## 3. Research Traceability

| Decision | Evidence ID | Research Category | Confidence | Risk |
| --- | --- | --- | --- | --- |

## 4. Personas and Jobs-to-be-Done

### Primary User

### Secondary Users

### Buyer/Admin

### Jobs-to-be-Done

### Trust Objections

### Churn Risks

## 5. Product Scope

### MVP

### V1

### Out of Scope

### Future Roadmap

### Kill Criteria

## 6. Core User Flows

Repeat this block for every core flow.

### Flow: [Name]

- Actor:
- Entry point:
- Preconditions:
- Success path:
- Error paths:
- Empty state:
- Loading state:
- Permissions:
- Analytics events:
- Support concerns:
- Acceptance criteria:

## 7. Information Architecture

### Routes / Screens

| Route | Purpose | Auth | Primary Components | States |
| --- | --- | --- | --- | --- |

### Navigation

### Settings

### Admin

### Error Pages

## 8. Design DNA Integration

- Design DNA status:
- References:
- Color palette:
- Typography:
- Density:
- Components:
- Motion:
- Accessibility:
- Do-not-use list:

Frontend implementation is blocked until this section is approved.

## 9. System Architecture

### Overview

### Frontend

### Backend

### Data Layer

### Background Jobs

### File Storage

### Cache

### Search / Vector

### Realtime

### Integrations

## 10. Technology Stack Decisions

| Area | Selected | Alternatives | Why | Risk | Exit Strategy | ADR |
| --- | --- | --- | --- | --- | --- | --- |
| Web framework | | | | | | |
| Database | | | | | | |
| Auth | | | | | | |
| Hosting | | | | | | |
| Payments | | | | | | |
| AI provider | | | | | | |
| Analytics | | | | | | |
| Observability | | | | | | |

## 11. Database and Data Model

### Database Choice ADR Summary

### Entity List

| Entity | Purpose | Owner | Tenant Bound? | PII? | Retention |
| --- | --- | --- | --- | --- | --- |

### Entity Specification

Repeat for each entity.

#### Entity: [Name]

- Purpose:
- Fields:
- Relationships:
- Constraints:
- Indexes:
- Access rules:
- Retention:
- Export/delete behavior:
- Audit needs:

### Scale Model

| Metric | Launch | 12 Months | 36 Months | Stress Case |
| --- | --- | --- | --- | --- |
| Users | | | | |
| Tenants | | | | |
| Records | | | | |
| Reads/day | | | | |
| Writes/day | | | | |
| Storage | | | | |

### Hot Queries

### Migration Strategy

### Backup / Restore

### Data Export / Deletion

## 12. Multi-Tenancy and Authorization

### Tenant Model

### Membership Model

### Roles

### Authorization Matrix

| Resource | Owner | Admin | Member | Viewer | Anonymous |
| --- | --- | --- | --- | --- | --- |

### Isolation Tests

### Background Job Tenant Context

### Admin Impersonation Policy

## 13. Authentication

- Signup:
- Login:
- Logout:
- Password reset:
- OAuth:
- MFA:
- Email verification:
- Session duration:
- Invite flow:
- Account deletion:

## 14. API and Module Contracts

Repeat for each endpoint/module.

### Contract: [Name]

- Method/function:
- Path/name:
- Auth:
- Input:
- Output:
- Errors:
- Rate limits:
- Side effects:
- Events:
- Tests:

## 15. Security Architecture

### Assets

### Trust Boundaries

### OWASP Mapping

### STRIDE Mapping

### Abuse Cases

### Input Validation

### Rate Limiting

### Secret Handling

### Logging Policy

### Audit Logs

### Incident Response

## 16. Privacy, GDPR, and Compliance

### Data Inventory

| Data | PII? | Purpose | Lawful Basis | Retention | Processor |
| --- | --- | --- | --- | --- | --- |

### Export

### Deletion

### Retention

### Subprocessors

### Cookies / Tracking

### DPA

### Breach Response

### Trust Page Requirements

## 17. AI Orchestration

Use only if AI is applicable.

### AI Use Cases

### Model Routing

### Prompt Architecture

### Context / RAG

### Tools and Permissions

### Eval Set

### Failure Modes

### Fallbacks

### Cost Controls

### Safety and Prompt Injection

## 18. Billing and Subscription

Use only if paid.

### Plans

### Entitlements

### Upgrade

### Downgrade

### Cancellation

### Failed Payment / Dunning

### Refunds

### Chargebacks

### Tax / VAT

### Webhooks

### Data Access After Cancellation

## 19. Reliability and Observability

### Critical Journeys

### Health Checks

### Logs

### Metrics

### Traces

### Alerts

### Dashboards

### SLOs

### Rollback

### Incident Runbook

## 20. Analytics and Product Learning

### North-Star Metric

### Event Taxonomy

| Event | Trigger | Properties | Privacy Notes |
| --- | --- | --- | --- |

### Funnels

### Dashboards

### Experimentation

### Lesson Capture

## 21. Accessibility and Internationalization

### WCAG Target

### Keyboard

### Screen Reader

### Contrast

### Focus States

### Reduced Motion

### Locales

### Dates / Times / Currency

## 22. Performance

### Frontend Budget

### API Latency

### Database Query Budget

### Caching

### Images / Media

### Load Testing

## 23. Testing Strategy

| Test Type | Scope | Tool | Required Before |
| --- | --- | --- | --- |
| Unit | | | |
| Integration | | | |
| E2E | | | |
| Accessibility | | | |
| Security | | | |
| Performance | | | |
| Tenant isolation | | | |
| AI evals | | | |
| Smoke | | | |

## 24. Deployment and Infrastructure

### Environments

### CI/CD

### Environment Variables

### Secrets

### Migrations

### Preview Environments

### Production Deploy

### Rollback

## 25. Admin, Support, and Operations

### Admin Dashboard

### Support Tools

### Audit Trails

### Manual Remediation

### Customer Support Flows

## 26. Legal and Trust Communication

### Terms

### Privacy

### Security Page

### Trust Page

### Cookie Notice

### Compliance Claims

### AI Disclosure

## 27. Narrative Promises

| Promise | Spec Section | Status | Gap |
| --- | --- | --- | --- |

## 28. Phase Breakdown

| PRD | Goal | Dependencies | Risk | Verification |
| --- | --- | --- | --- | --- |

## 29. Risk Register

| Risk | Severity | Likelihood | Owner | Mitigation | Trigger |
| --- | --- | --- | --- | --- | --- |

## 30. Open Questions and Deferred Decisions

| Question | Owner | Deadline | Blocks? | Fallback |
| --- | --- | --- | --- | --- |

## 31. Test Architecture and Traceability

### Test Strategy

- 

### Traceability Matrix

| Requirement | PRD | Slice | Risk | Test/Command | Status |
| --- | --- | --- | --- | --- | --- |

### Release Gate Evidence

- 

## 32. Context Continuity and Distillation

### Project Context

- 

### Memory Files

- 

### Distillates

| Distillate | Source | Consumer | Status |
| --- | --- | --- | --- |

### Stale Context Risks

- 

## 33. Workflow Routing and Governance

### Next Allowed Action

- 

### Blocked Actions

- 

### Approval Points

- 

### Downgrade Risk Process

- 

## Completion Gate

- [ ] All applicable sections complete. Verify: every section has content or an explicit not-applicable justification.
- [ ] Non-applicable sections justified. Verify: each N/A section states why it does not apply.
- [ ] Research traceability complete. Verify: evidence ledger links to key decisions.
- [ ] Design DNA approved. Verify: `design/design-dna.md` is approved when UI exists.
- [ ] Database and security plans complete. Verify: database ADR and threat model exist when applicable.
- [ ] GDPR complete if relevant. Verify: lawful basis, subprocessors, retention, export, and deletion are documented.
- [ ] AI evals complete if relevant. Verify: eval cases, unacceptable outputs, and fallback behavior are documented.
- [ ] Billing complete if relevant. Verify: plans, entitlements, dunning, refunds, tax/VAT, and webhooks are documented.
- [ ] Phase breakdown ready for PRDs. Verify: every phase has goal, dependencies, risk, and verification.
- [ ] Test strategy and traceability matrix ready. Verify: `docs/test/test-strategy.md` and `docs/test/traceability-matrix.md` exist.
- [ ] Project context and distillation plan ready. Verify: `.codex-brain/project-context.md` and distillate targets are documented.
- [ ] Workflow routing and blocked actions clear. Verify: next allowed action and blocked actions are listed.
- [ ] No P0/P1 open gaps. Verify: risk register contains no unresolved P0/P1 blocker.

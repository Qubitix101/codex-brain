# [Project Name] - Capability and Access Map

This artifact must be completed before Build Plan approval when the project depends on external systems, APIs, MCP servers, CLIs, generated harnesses, browser automation, desktop apps, paid vendors, or authenticated SaaS workflows.

## 1. Project Capability Summary

- Project:
- Mode:
- Date:
- Owner:
- Related research:
- Related agentic audit:
- Related intelligence system plan:
- Related intelligence architecture decision:
- Related agent engineering audit:
- Related skill inventory:
- Related Agent OS runtime plan:
- Related agent network/interoperability plan:
- Related Build Plan:

## 2. Capability Inventory

| Capability | Required For | Criticality | Status | Owner | Notes |
| --- | --- | --- | --- | --- | --- |
| Source control / issue tracking | | Required / Optional / Deferred | Not started | | |
| Auth / identity | | Required / Optional / Deferred | Not started | | |
| Database / storage | | Required / Optional / Deferred | Not started | | |
| Payments / billing | | Required / Optional / Deferred | Not applicable? | | |
| Email / notifications | | Required / Optional / Deferred | Not applicable? | | |
| Calendar / scheduling | | Required / Optional / Deferred | Not applicable? | | |
| File/document processing | | Required / Optional / Deferred | Not applicable? | | |
| Image generation | | Required / Optional / Deferred | Not applicable? | | |
| Video generation | | Required / Optional / Deferred | Not applicable? | | |
| Voice/audio generation | | Required / Optional / Deferred | Not applicable? | | |
| AI model/tool use | | Required / Optional / Deferred | Not applicable? | | |
| Search/vector/retrieval | | Required / Optional / Deferred | Not applicable? | | |
| Analytics | | Required / Optional / Deferred | Not applicable? | | |
| Observability | | Required / Optional / Deferred | Not applicable? | | |
| Deployment/environments | | Required / Optional / Deferred | Not started | | |
| Browser automation/web fetch | | Required / Optional / Deferred | Not applicable? | | |
| Desktop app automation | | Required / Optional / Deferred | Not applicable? | | |

## 3. Access Surface Decisions

Repeat this block for each required capability.

### Capability: [Name]

- Product runtime surface:
- Agent implementation surface:
- Setup/testing surface:
- Official API/SDK:
- Official CLI:
- MCP/connector:
- Generated CLI harness:
- Browser automation:
- Computer Use:
- Selected path:
- Why selected:
- Why rejected alternatives are weaker:

## 4. Credentials and Accounts

| Capability | Credential / Account Needed | Scope | Sandbox/Test Mode | Production Needed? | Secret Storage Rule | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |

## 5. OAuth, Webhooks, and App Setup

| Capability | OAuth/App Setup | Redirects/Webhooks | Local Test Path | Production Cutover | Status |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## 6. Mock and Live Verification Plan

| Capability | Mock Strategy | First Live Verification | Verification Command/Tool | Required Before |
| --- | --- | --- | --- | --- |
| | | | | |

## 7. Risk and Governance

| Capability | Risk | Severity | Mitigation | Approval Boundary |
| --- | --- | --- | --- | --- |
| Missing credential | | | | |
| Destructive action | | | | |
| Externally visible action | | | | |
| Paid/quota-limited action | | | | |
| Personal data transfer | | | | |
| Vendor outage | | | | |

## 8. User Action Checklist

Codex should ask the user for only what is needed now.

### Required Now

- [ ]

### Can Be Mocked

- [ ]

### Can Wait

- [ ]

### Explicitly Not Needed

- [ ]

## 9. Gate Decision

- Capability and access status: Not ready / Ready with mocks / Ready for Build Plan / Blocked
- Build Plan blocked? Yes / No
- PRD decomposition blocked? Yes / No
- Remaining blockers:
- Accepted risks:
- Next allowed action:

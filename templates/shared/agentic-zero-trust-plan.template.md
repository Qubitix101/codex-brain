# Agentic Zero Trust Plan

## 1. Metadata

- Project:
- Date:
- Owner:
- Related agentic audit:
- Related intelligence system plan:
- Related intelligence architecture decision:
- Related agent engineering audit:
- Related skill inventory:
- Related Agent OS runtime plan:
- Related agent network/interoperability plan:
- Related capability/access map:
- Target maturity now:
- Target maturity later:

## 2. Zero Trust Thesis

- What agentic power is being introduced:
- Why zero trust is required:
- What must be verified every time:
- What must never be trusted implicitly:
- What would be dangerous if left implicit:

## 3. Assets, Identities, and Actor Chain

| Asset / Identity | Type | Owner | Tenant Scope | Sensitivity | Allowed Actions | Revocation Path |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

- Actor chain format:
- Non-human identity registry:
- Service account policy:
- Sub-agent identity policy:
- Impersonation rule:

## 4. Trust Boundaries

| Boundary | Trusted Side | Untrusted Side | Verification Required | Enforcement Point | Evidence |
| --- | --- | --- | --- | --- | --- |
| User input -> model | | | | | |
| Retrieved context -> model | | | | | |
| Model output -> tool | | | | | |
| Agent -> MCP/API/CLI | | | | | |
| Agent -> remote agent/OS | | | | | |
| Memory write -> durable store | | | | | |

## 5. Threat Model

| Threat | Entry Point | Asset at Risk | Likelihood | Impact | Control | Test |
| --- | --- | --- | --- | --- | --- | --- |
| Direct prompt injection | | | | | | |
| Indirect prompt injection | | | | | | |
| Tool poisoning | | | | | | |
| Credential theft | | | | | | |
| Memory poisoning | | | | | | |
| Data/model poisoning | | | | | | |
| Data exfiltration | | | | | | |
| Excessive agency | | | | | | |
| A2A spoofing | | | | | | |
| Unbounded consumption | | | | | | |

## 6. JIT Credentials and Vault

| Credential | Holder | Scope | Issued By | Expiry | Checkout Trigger | Rotation | Revocation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |

- Vault or broker:
- Static credential prohibition:
- Secret scanning:
- Break-glass rule:

## 7. Per-Action Authorization

| Action | Risk Class | Required Intent | Agent Role | Credential Scope | Policy Check | Human Approval | Trace Event |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Read private data | | | | | | | |
| Write memory | | | | | | | |
| Send message | | | | | | | |
| Publish content | | | | | | | |
| Delete data | | | | | | | |
| Spend money | | | | | | | |
| Delegate to agent | | | | | | | |

- Confused-deputy prevention:
- Refusal/denial behavior:
- Approval expiration:

## 8. Trusted Registry

| Capability | Type | Owner | Version | Allowed Operations | Trust Review | Source/Provenance | Quarantine Path |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | API | | | | | | |
| | MCP server | | | | | | |
| | CLI | | | | | | |
| | Skill | | | | | | |
| | Agent card | | | | | | |
| | Model/provider | | | | | | |

- Registry owner:
- Review cadence:
- Pinning/checksum policy:
- Removal policy:

## 9. AI Gateway, Firewall, and Policy Enforcement

| Enforcement Point | Input | Check | Block Condition | Fallback | Logged Evidence |
| --- | --- | --- | --- | --- | --- |
| Prompt/input | | | | | |
| Retrieved context | | | | | |
| Tool arguments | | | | | |
| Model output | | | | | |
| External egress | | | | | |
| Delegated agent payload | | | | | |

- Prompt-injection handling:
- Output DLP:
- Egress allowlist:
- Policy-as-code location:

## 10. Data, Memory, Retrieval, and Model Integrity

| Source | Trust Tier | Provenance | Ingestion Check | Poisoning Control | Correction/Delete/Export | Rebuild/Rollback |
| --- | --- | --- | --- | --- | --- | --- |
| User memory | | | | | | |
| RAG corpus | | | | | | |
| Embeddings/vector index | | | | | | |
| Policies/preferences | | | | | | |
| Eval set | | | | | | |
| Model/fine-tune artifact | | | | | | |

- Quarantine workflow:
- Memory write approval:
- Policy/preference tamper controls:
- Index rebuild policy:

## 11. Sandbox and Segmentation

| Agent / Tool Runner | File Scope | Network Scope | Database Scope | Tenant Scope | Production Write? | Escape Prevention |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

- File allowlist:
- Network/egress allowlist:
- Tenant isolation:
- Browser/Computer Use isolation:
- Production mutation boundary:

## 12. Immutable Trace and Forensic Evidence

| Trace Event | Required Fields | Correlation ID | Tamper Control | Retention | Sensitive Redaction |
| --- | --- | --- | --- | --- | --- |
| User request/intent | | | | | |
| Model route | | | | | |
| Prompt/context/retrieval | | | | | |
| Memory read/write | | | | | |
| Policy decision | | | | | |
| Credential checkout | | | | | |
| Tool/MCP/API call | | | | | |
| Agent delegation | | | | | |
| Approval/refusal | | | | | |
| External action | | | | | |
| Failure/retry/rollback | | | | | |

- Log destination:
- Tamper-evidence strategy:
- Replay/debug path:

## 13. Human Control, Kill Switch, Throttles, and Canaries

| Control | Owner | Scope | Trigger | Effect | User Visible? | Test |
| --- | --- | --- | --- | --- | --- | --- |
| Kill switch | | | | | | |
| Pause/stop agent | | | | | | |
| Revoke credentials | | | | | | |
| Tool disable | | | | | | |
| Rate limit | | | | | | |
| Spend limit | | | | | | |
| Canary rollout | | | | | | |
| Memory rollback | | | | | | |

- Approval queue:
- Throttle thresholds:
- Anomaly thresholds:
- Rollback playbook:

## 14. Continuous Verification and Scanning

| Check | Frequency | Tool/Owner | Scope | Failure Action |
| --- | --- | --- | --- | --- |
| Secret scan | | | | |
| Dependency/tool scan | | | | |
| MCP/connector review | | | | |
| Skill review | | | | |
| Access scope review | | | | |
| Memory/retrieval drift | | | | |
| Policy drift | | | | |
| Trace completeness | | | | |

## 15. Adversarial Eval Suite

| Scenario | Fixture | Expected Outcome | Blocks Release? | Regression Test |
| --- | --- | --- | --- | --- |
| Direct prompt injection | | | | |
| Indirect prompt injection | | | | |
| Tool poisoning/lookalike | | | | |
| MCP compromise | | | | |
| Skill supply-chain attack | | | | |
| Credential misuse | | | | |
| Data exfiltration | | | | |
| Memory poisoning | | | | |
| Data/model poisoning | | | | |
| Excessive agency | | | | |
| Sub-agent escalation | | | | |
| A2A spoofing | | | | |
| Unbounded consumption | | | | |

## 16. Incident Response and Blast Radius

| Incident | Detection | Containment | Credential Action | Memory/Data Action | Customer/User Action | Postmortem |
| --- | --- | --- | --- | --- | --- | --- |
| Prompt injection succeeded | | | | | | |
| Credential leaked | | | | | | |
| Tool compromised | | | | | | |
| Memory poisoned | | | | | | |
| Data exfiltrated | | | | | | |
| Runaway spend/action | | | | | | |

- Incident owner:
- Severity classes:
- Notification triggers:
- Lesson-promotion path:

## 17. First Secure Autonomous Slice

- Slice:
- Agent(s):
- Tools/capabilities:
- Credentials:
- Authorization check:
- Human approval:
- Sandbox:
- Trace events:
- Adversarial tests:
- Kill switch/throttle:
- Failure path:

## 18. P0 Blockers

- [ ] Actor chain missing.
- [ ] JIT credential/vault plan missing.
- [ ] Per-action authorization missing for sensitive actions.
- [ ] Tool/MCP/skill/model/agent registry trust missing.
- [ ] Prompt injection and indirect prompt injection controls missing.
- [ ] Memory/retrieval/model integrity controls missing.
- [ ] Sandbox/segmentation missing.
- [ ] Immutable trace missing.
- [ ] Kill switch/throttles/canary missing.
- [ ] Adversarial eval suite missing.
- [ ] Incident response and blast-radius plan missing.

## 19. Decision

- Status: approved / conditional / blocked / not applicable
- Conditions:
- Owner:
- Date:

# Agentic Zero Trust Framework

Agentic systems multiply power and risk at the same time. A normal application can leak data or perform a bad action; an agentic application can read context, reason over it, call tools, create sub-agents, move data, spend money, publish content, and repeat the mistake at machine speed.

Agentic Zero Trust makes that power governable. It adapts zero trust security to AI agents, tools, MCP servers, A2A-style delegation, memories, model routing, retrieval indexes, credentials, and autonomous routines.

## Purpose

The question is not "do we trust the agent?" The question is:

- what has been verified for this exact request
- which identity is acting for which user and tenant
- what credential is checked out, for how long, and for which action
- what tool, MCP server, API, agent card, model, memory source, or retrieval source has been vetted
- what policy decision authorizes or blocks the action
- what trace proves what happened afterward
- what human control can stop, revoke, throttle, roll back, or investigate the system

This gate exists to beat predictable attacker paths before they become architecture.

## Gate 2.47

Agentic Zero Trust sits after Agent Network and Interoperability and before Capability and Access.

```text
Classify -> Validate -> Research -> Agentic Opportunity -> Intelligence Architecture -> Agent Engineering -> Agent OS Runtime -> Agent Network and Interoperability -> Agentic Zero Trust -> Capability and Access -> Plan -> Design DNA -> Decompose -> Execute -> Review -> Ship -> Learn
```

The position matters. Runtime and network planning define what agents can do and who they can call. Agentic Zero Trust then decides what must be verified, sandboxed, vaulted, logged, throttled, approved, and red-teamed before capability/access mapping chooses concrete APIs, CLIs, MCPs, connectors, browser paths, or Computer Use paths.

Required when any of these are true:

- L3+ agentic maturity
- external tool action, public action, paid action, destructive action, or customer communication
- customer-specific memory, retrieval, embeddings, preference stores, or policy stores
- MCP servers, connectors, plugins, skills, generated harnesses, browser automation, or Computer Use
- A2A-style delegation, remote agents, agent cards, or inter-OS boundaries
- model/provider routing, sub-agent creation, autonomous routines, scheduled jobs, or background workers
- sensitive data, regulated/high-impact decisions, enterprise buyers, or multi-tenancy

Required artifact:

- `docs/agentic-zero-trust-plan.md`

Use:

- `templates/shared/agentic-zero-trust-plan.template.md`
- `catalogs/agentic-zero-trust-catalog.json`
- `frameworks/agent-os-runtime.md`
- `frameworks/agent-network-interop.md`
- `frameworks/capability-access-readiness.md`
- `frameworks/tool-surface-routing.md`
- `frameworks/security-gdpr.md`

Optional helper:

```bash
npm run plan-agentic-zero-trust -- --brief "[what we are building]" --mode full --markdown
```

## Core Principles

### Never Trust, Always Verify

Do not grant trust because a request came from a known user, a known agent, a known MCP server, a familiar skill, a previous memory, or an internal network. Every sensitive action must prove identity, intent, scope, policy, and tool integrity at the moment of use.

### Just in Time, Not Just in Case

Agents should receive credentials only when needed, only for the specific task, and only for the shortest viable duration. Long-lived broad tokens are architectural debt.

### Least Privilege and Least Agency

Limit what the agent can reach, what tools can do, what the model can decide, what the runtime can execute, and what autonomy level is allowed without a human.

### Pervasive Controls

Controls belong at every boundary: user input, retrieved context, memory writes, model output, tool invocation, credential checkout, outbound API call, downstream agent delegation, generated artifact, and public action.

### Assume Breach

Design as if some input, retrieved document, memory record, MCP server, skill, agent card, provider response, credential, model, or downstream agent may already be compromised. The system should reduce blast radius, preserve evidence, and fail closed.

## Control Stack

### 1. Agent and Non-Human Identity Registry

Every agent, sub-agent, service account, tool runner, scheduled routine, and delegated remote agent needs a unique identity. Actions must preserve actor chain:

```text
human user -> tenant/workspace -> orchestrator -> agent -> sub-agent or tool -> external system
```

Required outputs:

- agent identity inventory
- service account inventory
- actor-chain schema
- tenant/workspace boundary
- impersonation rule
- revocation rule

### 2. JIT Credential Broker and Vault

No API key, OAuth token, password, signing secret, webhook secret, or service credential should live in prompts, skill files, repo config, client code, or long-lived agent memory.

Required outputs:

- vault choice or broker design
- credential checkout flow
- scope and expiry matrix
- rotation and revocation policy
- secret scanning policy
- break-glass process

### 3. Per-Action Authorization and Intent Verification

For every sensitive action, check the user intent, agent role, current task scope, data classification, risk class, credential scope, policy rule, and approval threshold.

Required outputs:

- action authorization matrix
- public/paid/destructive/compliance-sensitive thresholds
- policy-as-code owner
- confused-deputy controls
- approval event schema
- denial/refusal behavior

### 4. Tool, MCP, Skill, Agent Card, and Model Registry

Treat every tool surface as supply chain. Register and vet APIs, SDKs, CLIs, MCP servers, connectors, browser automations, Computer Use workflows, skills, generated harnesses, agent cards, models, prompts, and policy bundles before use.

Required outputs:

- approved tool/MCP/skill/model registry
- owner and version for each capability
- allowed operations
- checksum, pinning, or provenance where practical
- review cadence
- removal/quarantine path

### 5. AI Gateway, Firewall, and Policy Enforcement

The model should not be the only policy enforcer. Add deterministic checks around model input, retrieved context, tool input, model output, external egress, and delegated agent payloads. In high-risk systems, this may include an AI gateway and AI firewall pattern.

Required outputs:

- prompt-injection and indirect-injection controls
- tool input validation
- output DLP and sensitive-data filters
- egress allowlist
- policy decision point and enforcement point
- unsafe action refusal path

### 6. Data, Memory, Retrieval, and Model Integrity

Protect the knowledge that shapes decisions. Training data, fine-tuning data, RAG indexes, embeddings, memory, preferences, policies, eval sets, and retrieved artifacts can be poisoned or stale. Treat data poisoning, memory poisoning, and model poisoning as integrity failures that can redirect the agent later.

Required outputs:

- source provenance model
- ingestion trust tiers
- quarantine and review workflow
- memory correction/delete/export propagation
- embedding/index rebuild policy
- policy/preference tamper controls
- eval-set integrity checks

### 7. Micro-Sandboxing and Segmentation

Agents should not inherit a broad environment by default. Constrain file paths, network destinations, database scopes, tenant data, tool operations, spawned subprocesses, browser state, and computer-use permissions.

Required outputs:

- per-agent sandbox policy
- file/network/database allowlist
- tenant segmentation rule
- egress filtering
- local execution boundary
- production mutation boundary

### 8. Immutable Observability and Forensic Trace

If an agent does something wrong, the team must be able to replay what happened without trusting mutable runtime memory.

Required trace events:

- request and user intent
- model/provider route
- prompt/context/retrieval references
- memory reads and writes
- policy decisions
- credential checkout
- tool/MCP/API calls
- downstream agent delegation
- approvals/refusals
- external actions
- costs, latency, failures, retries, rollbacks

Logs should be tamper-evident or immutable for high-risk actions.

### 9. Human Control, Kill Switch, Throttles, and Canaries

Autonomy should be staged. Humans need controls to pause, stop, revoke credentials, disable a tool, freeze an agent, roll back memory, cancel jobs, approve high-risk actions, and limit spend or action velocity.

Required outputs:

- kill switch
- pause/stop/revoke controls
- rate/spend/action limits
- approval queue
- canary rollout plan
- anomaly threshold
- rollback playbook

### 10. Continuous Verification and Scanning

Agentic security is not a one-time diagram. Continuously scan secrets, dependencies, MCP servers, skills, tool schemas, model/prompt changes, memory sources, retrieval indexes, policy drift, access scope, logs, and deployed surfaces.

Required outputs:

- scan schedule
- drift checks
- red-team cadence
- model/tool/memory change review
- credential hygiene checks
- incident review trigger

### 11. Adversarial Evaluation and Attack Simulation

Every serious agentic product should test common attacker paths before launch.

Minimum scenarios:

- direct prompt injection
- indirect prompt injection through files, web pages, messages, tickets, email, or RAG documents
- tool poisoning or tool lookalike
- MCP server compromise
- skill or script supply-chain attack
- credential theft or overbroad scope
- confused deputy
- data exfiltration through model output, tool call, image URL, webhook, or delegated agent
- memory poisoning
- data/model poisoning
- vector and embedding weakness
- system prompt or policy leakage
- excessive agency through excessive functionality, permissions, or autonomy
- sub-agent escalation
- A2A spoofing or agent-card impersonation
- unbounded consumption and cost runaway

### 12. Incident Response and Blast Radius Reduction

Assume something will fail. The plan must say how to contain, revoke, investigate, repair, and learn.

Required outputs:

- incident classes
- containment actions
- credential rotation path
- agent/tool freeze path
- memory rollback path
- poisoned-source removal path
- trace replay path
- user/customer notification trigger
- postmortem and lesson-promotion path

## Reference Anchors

Ground this framework in current primary security references:

- NIST SP 800-207 Zero Trust Architecture
- NIST AI Risk Management Framework and Generative AI Profile
- OWASP Top 10 for LLM Applications 2025
- OWASP Agentic AI Threats and Mitigations

Reference URLs:

- https://www.nist.gov/publications/zero-trust-architecture-0
- https://www.nist.gov/itl/ai-risk-management-framework
- https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/
- https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/

Do not treat these as compliance theater. Use them as control vocabulary, then make the product-specific plan concrete enough to block unsafe execution.

## Output Contract

An Agentic Zero Trust Plan must include:

- zero-trust thesis
- asset, identity, and actor-chain inventory
- trust boundaries
- threat model
- non-human identity model
- JIT vault and credential plan
- per-action authorization matrix
- tool/MCP/skill/agent/model registry trust plan
- AI gateway/firewall and policy enforcement plan
- data, memory, retrieval, and model integrity plan
- sandbox and segmentation plan
- immutable trace and forensic evidence plan
- human control, kill switch, throttles, and canary plan
- continuous verification and scanning plan
- adversarial eval suite
- incident response and blast-radius plan
- first secure autonomous slice
- P0 blockers

## P0 Blockers

Block Capability and Access and Build Plan when:

- agentic action lacks actor-chain attribution
- credentials are long-lived, broad, embedded, or unmanaged
- public, paid, destructive, or compliance-sensitive actions lack per-action authorization and approval policy
- tools, MCP servers, skills, models, or agent cards can be used without registry trust controls
- retrieved context, memory, policies, preferences, or embeddings can be poisoned without provenance or quarantine
- tool execution lacks sandbox, egress, tenant, or production mutation boundaries
- traces cannot reconstruct prompt, context, retrieval, memory, policy, credential, tool, approval, and external action events
- no kill switch, throttle, pause, revoke, or rollback path exists
- prompt injection, indirect prompt injection, excessive agency, data exfiltration, and memory poisoning have not been evaluated for launch-critical flows

# Agent Network and Interoperability Framework

Serious agentic products should not be designed as isolated prompt boxes. A domain operating system can become more valuable when it can collaborate with other domain operating systems through explicit contracts.

Agent Network and Interoperability defines the network plane between autonomous agents, vertical operating systems, and specialized agent services. It sits above single-product runtime governance and before capability/access mapping.

## Purpose

The core question is not only "what tools can this agent reach?" It is also:

- which other agents or operating systems should this product delegate to
- which capabilities this product should expose to other agents
- what context can cross the boundary
- what must remain private inside the domain OS
- which protocol surface fits each boundary: internal workflow, API/SDK, MCP, A2A-style agent protocol, event bus, browser, or Computer Use
- how inter-agent work is authenticated, traced, versioned, streamed, approved, and recovered

Without this layer, teams tend to overbuild one giant agent, duplicate capabilities across products, over-permission tools, leak context between domains, or treat every integration as MCP when the target is actually another agentic system.

## Gate 2.45

Agent Network and Interoperability sits after Agent OS Runtime and before Capability and Access.

```text
Classify -> Validate -> Research -> Agentic Opportunity -> Intelligence Architecture -> Agent Engineering -> Agent OS Runtime -> Agent Network and Interoperability -> Capability and Access -> Plan -> Design DNA -> Decompose -> Execute -> Review -> Ship -> Learn
```

Required when any of these are true:

- the product is intended to become a domain operating system
- multiple agents are separately owned, separately deployed, or vendor/framework independent
- one domain OS may call another, such as a stock intelligence OS asking a social content OS for approved distribution material
- a product should expose capabilities as reusable agent services
- cross-agent memory, artifacts, identity, approvals, or progress streaming matter
- the project mentions A2A, agent cards, agent marketplace, remote agents, delegated specialists, multi-OS orchestration, or federated agent systems

Required artifact:

- `docs/agent-network-interop-plan.md`

Use:

- `templates/shared/agent-network-interop-plan.template.md`
- `catalogs/agent-network-interop-catalog.json`
- `frameworks/agent-os-runtime.md`
- `frameworks/capability-access-readiness.md`
- `frameworks/tool-surface-routing.md`

Optional helper:

```bash
npm run plan-agent-network -- --brief "[what we are building]" --mode full --markdown
```

## Four Planes

### 1. Skills Plane

Procedural memory. Skills define how work gets done: steps, rules, examples, trust levels, and reusable workflows.

Use skills when the problem is repeatable procedure, such as "create a compliant investor brief" or "turn source research into a weekly synthesis."

### 2. Tool and Data Plane

Capability access. MCP, APIs, SDKs, CLIs, browser automation, and Computer Use let an agent reach files, databases, SaaS systems, websites, apps, and execution surfaces.

Use MCP or connectors when managed auth, user scoping, structured remote objects, auditability, or high-level service abstraction justifies the tool schema cost.

### 3. Runtime Control Plane

Agent OS Runtime. The scheduler, memory manager, tool sandbox, identity, observability, governance, recovery, budgets, agent registry, and human control surface supervise one product's internal agents.

Use the runtime plan before this network gate so a product knows its own authority before exposing or delegating authority externally.

### 4. Agent Network Plane

Inter-agent interoperability. A2A-style protocols, agent cards, structured task contracts, artifact contracts, and streaming progress let one autonomous agent or OS ask another autonomous agent or OS to perform specialized work.

Use the network plane when the target is another agentic actor, not a raw tool or data source.

## Protocol Decision Matrix

| Target | Preferred Surface | Use When | Avoid When |
| --- | --- | --- | --- |
| Internal module in same runtime | Function, service call, workflow, queue | Same product, same deployment, deterministic behavior | You need vendor/framework independence or separate agent identity |
| External data, file, SaaS, or tool | API/SDK, MCP, CLI, browser, Computer Use | The agent needs resources or tool actions | The target is an autonomous agent or OS |
| Remote autonomous agent or vertical OS | A2A-style agent protocol | Delegation, negotiation, task handoff, artifact exchange, streaming progress, independent ownership | A simple deterministic API call is enough |
| Product runtime integration | Official API/SDK, webhook, queue | Customer-facing behavior must be deterministic, testable, and stable | Agent negotiation would add risk without value |
| High-volume async system event | Queue, event bus, webhook | Deterministic event-driven workflows | The receiving system needs agentic judgment or negotiated task execution |

## Agent Card Requirements

Every exposed agent or domain OS should define an agent card before other agents depend on it.

Minimum fields:

- name and owner
- capability summary
- tasks accepted
- tasks refused
- input contract
- output/artifact contract
- supported modalities
- identity and auth model
- memory access policy
- approval requirements
- risk class
- latency/SLA expectation
- streaming/progress behavior
- version and compatibility policy
- observability requirements
- escalation contact

Agent cards are not marketing pages. They are executable architecture contracts for intelligent services.

## Boundary Rules

- Do not share raw domain memory when a distilled, permissioned task payload is enough.
- Do not let a downstream agent query upstream private tools unless explicit delegation, scopes, and audit exist.
- Do not use A2A for internal function calls inside one runtime.
- Do not use MCP to model another agent's judgment when the right abstraction is agent delegation.
- Do not expose an agent card without identity, memory, approval, trace, and versioning policy.
- Do not approve Build Plan when cross-agent actions are untraceable or cross-domain context can leak.

## Example: Stock Intelligence OS and Social Content OS

The Stock Intelligence OS owns market data, filings, portfolio memory, thesis generation, risk policy, and investment workflows.

The Social Content OS owns voice, positioning, platform formatting, content calendar, analytics, and publishing approvals.

Correct boundary:

```text
Stock Intelligence OS -> approved insight package -> Social Content OS -> draft content package -> human approval -> scheduled/published content
```

The stock OS should not directly inherit all social posting tools. The social OS should not freely query private portfolio data. The contract should pass only the distilled insight payload needed for the content task.

## Output Contract

An Agent Network and Interoperability Plan must include:

- network thesis
- internal versus external agent/OS roster
- agent cards to expose
- external agent cards to consume
- collaboration topology
- delegation boundaries
- task/message contracts
- modality and artifact contracts
- protocol decision matrix
- MCP versus A2A versus API decisions
- memory and context-sharing policy
- identity, auth, and trust model
- streaming/progress model
- approval and governance policy
- cross-agent observability and trace model
- failure, timeout, retry, compensation, and escalation behavior
- versioning and compatibility policy
- reusable capability and commercialization opportunities
- first interoperable slice
- P0 blockers

## P0 Blockers

Block Capability and Access and Build Plan when:

- separate agents or operating systems need to collaborate but no topology exists
- another agent can receive private context without a sharing policy
- an agent can call another agent without identity, auth, or authorization rules
- the system cannot distinguish MCP/tool access from A2A/agent delegation
- task contracts lack typed inputs, outputs, artifacts, or refusal behavior
- cross-agent progress, failure, retry, timeout, or escalation is undefined
- exposed agent capabilities have no agent card, version, owner, or trace contract
- public, paid, destructive, or compliance-sensitive delegated work lacks human approval

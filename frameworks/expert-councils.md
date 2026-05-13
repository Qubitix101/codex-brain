# Expert Councils Framework

Expert councils are structured review lenses for high-stakes decisions.

They are inspired by multi-agent council patterns, but Codex Brain uses them only when they improve decisions.

## Purpose

Complex products fail when one perspective dominates.

Expert councils force disagreement across:

- product value
- architecture
- database scale
- security
- privacy/GDPR
- design quality
- accessibility
- reliability
- AI safety
- agent engineering and procedural skills
- launch readiness

## Council Types

### Product Council

Use for validation, positioning, pricing, and scope.

Roles:

- product strategist
- adversary
- market reviewer

Output:

- strongest product argument
- weakest product assumption
- no-go or conditional-go risks

### Architecture Council

Use before major technical decisions.

Roles:

- architecture strategist
- database scaler
- performance/reliability reviewer

Output:

- recommended architecture
- rejected alternatives
- scale and failure concerns
- ADR candidates

### Security and GDPR Council

Use for products with user data, EU users, regulated domains, or enterprise buyers.

Roles:

- security/GDPR reviewer
- adversary
- database scaler

Output:

- threat model gaps
- lawful basis and data inventory gaps
- authorization and tenant isolation risks

### Design Council

Use before frontend implementation and during visual QA.

Roles:

- design director
- accessibility reviewer
- product strategist

Output:

- Design DNA approval concerns
- aesthetic risks
- accessibility blockers
- state and responsive gaps

### Launch Council

Use before production launch.

Roles:

- performance/reliability reviewer
- security/GDPR reviewer
- product strategist
- adversary

Output:

- ship/no-ship recommendation
- unresolved P0/P1 risks
- monitoring and rollback gaps

### Intelligence Architecture Council

Use before Agent Engineering for AI-core, retrieval-heavy, extraction-heavy, memory-backed, workflow-heavy, or automation-heavy products.

Roles:

- intelligence architecture reviewer
- AI orchestration reviewer
- architecture strategist
- data/retrieval reviewer
- security/GDPR reviewer
- product strategist

Output:

- RAG vs structured retrieval vs extraction findings
- source-of-truth gaps
- memory/knowledge graph risks
- workflow/action/routine boundary gaps
- missing eval/trace requirements
- first-slice architecture recommendation

### Agent Engineering Council

Use before Agent OS runtime, capability/access, and Build Plan approval for L3+ agentic, retrieval-heavy, multi-model, tool-using, or skill-driven products.

Roles:

- agent engineering reviewer
- AI orchestration reviewer
- architecture strategist
- security/GDPR reviewer
- performance/reliability reviewer
- product strategist

Output:

- seven-discipline readiness findings
- tool-contract and retrieval gaps
- model-routing and fallback gaps
- unsafe skill trust levels
- missing eval/trace requirements
- product trust UX blockers

### Agent OS Runtime Council

Use before agent network, capability/access, and Build Plan approval for L3+ agentic, multi-agent, memory-writing, routine-heavy, tool-using, or externally acting products.

Roles:

- agent OS runtime reviewer
- security/GDPR reviewer
- performance/reliability reviewer
- architecture strategist
- product strategist

Output:

- scheduler/orchestrator gaps
- memory manager gaps
- tool sandbox gaps
- identity/delegation gaps
- observability/trace gaps
- guardrails/governance gaps
- recovery/resumability gaps
- budget/quota gaps
- agent registry and human-control blockers

### Agent Network and Interoperability Council

Use before capability/access and Build Plan approval for federated agentic products, remote-agent delegation, agent-card exposure, or multi-OS collaboration.

Roles:

- agent network interoperability reviewer
- architecture strategist
- security/GDPR reviewer
- performance/reliability reviewer
- product strategist

Output:

- agent card and discovery gaps
- topology and delegation-boundary gaps
- MCP versus A2A-style protocol confusion
- memory/context-sharing and tenant-boundary risks
- identity/auth/trust and audit gaps
- streaming/progress and cancellation gaps
- cross-agent trace and replay gaps
- failure/recovery/versioning gaps

## Council Protocol

1. Define the decision under review.
2. Load only relevant artifacts.
3. Each role gives concerns, not generic praise.
4. Identify contradictions.
5. Produce decision options.
6. Record accepted risks.
7. Update Build Plan, ADR, gate, or PRD if needed.

## When To Use

Required in Full mode for:

- validation go/no-go
- major architecture/database decision
- security/privacy plan
- Design DNA approval
- intelligence architecture selection for AI-core products
- agent-engineering readiness for L3+ AI products
- Agent OS runtime readiness for L3+ AI products
- Agent Network and Interoperability readiness for federated agentic products
- launch readiness

Optional in Standard mode.

Avoid in Light mode unless the user explicitly asks or the risk escalates.

## Anti-Patterns

- Roleplay without findings.
- Using councils to avoid making a decision.
- Producing long generic commentary.
- Letting councils override evidence.
- Skipping artifact updates after a council finds a real gap.

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
- launch readiness

Optional in Standard mode.

Avoid in Light mode unless the user explicitly asks or the risk escalates.

## Anti-Patterns

- Roleplay without findings.
- Using councils to avoid making a decision.
- Producing long generic commentary.
- Letting councils override evidence.
- Skipping artifact updates after a council finds a real gap.


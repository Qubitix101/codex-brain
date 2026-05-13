# Step 2 - Runtime Contracts

Convert the kernel map into concrete runtime contracts.

## Procedure

For each required component, define:

- owner
- runtime boundary
- data/state owned
- approvals needed
- traces required
- failure behavior
- first-slice scope
- deferred production hardening

## Required Contracts

- Scheduler priority and queue contract.
- Memory read/write/review/delete/export contract.
- Tool sandbox and action classification contract.
- Identity and delegation contract.
- Trace schema and audit retention contract.
- Governance and human-in-the-loop contract.
- Recovery, idempotency, and resume contract.
- Budget and quota contract.
- Agent roster and role contract.
- User control surface contract.

## Output

Complete the runtime contracts in `docs/agent-os-runtime-plan.md`.

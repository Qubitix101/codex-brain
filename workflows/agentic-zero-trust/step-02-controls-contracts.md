# Agentic Zero Trust - Step 02 - Controls and Contracts

## Read

- `docs/agentic-zero-trust-plan.md`
- `frameworks/agentic-zero-trust.md`
- `catalogs/agentic-zero-trust-catalog.json`

## Decide

- Which non-human identities must exist?
- Which credentials must be brokered just in time from a vault?
- Which actions need per-action authorization, human approval, denial behavior, throttles, or canary rollout?
- Which tools, MCP servers, skills, generated harnesses, models, prompts, policies, and agent cards must enter a trusted registry?
- Where should AI gateway, firewall, DLP, egress, and policy enforcement checks run?
- How are memory, RAG, embeddings, policies, preferences, and eval sets protected from poisoning?
- What sandbox and segmentation policies constrain each agent and tool runner?
- What immutable traces prove prompt, context, retrieval, memory, policy, credential, tool, approval, and external action events?

## Write

Update these sections in `docs/agentic-zero-trust-plan.md`:

- Assets, Identities, and Actor Chain
- Trust Boundaries
- JIT Credentials and Vault
- Per-Action Authorization
- Trusted Registry
- AI Gateway, Firewall, and Policy Enforcement
- Data, Memory, Retrieval, and Model Integrity
- Sandbox and Segmentation
- Immutable Trace and Forensic Evidence
- Human Control, Kill Switch, Throttles, and Canaries
- Continuous Verification and Scanning
- Adversarial Eval Suite
- Incident Response and Blast Radius

## Stop If

- a public, paid, destructive, compliance-sensitive, or externally visible action lacks explicit authorization, approval, trace, and rollback
- credentials are static, overbroad, or embedded
- tools or MCP servers can be used without registry trust review
- the product cannot freeze, throttle, revoke, or roll back autonomous behavior

## State Update

Keep `gates.agentic_zero_trust.status` as `in-progress` until all P0 blockers are resolved or explicitly accepted as launch blockers.

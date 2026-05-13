# Step 02 - Skill Gap Map

## Read

- `docs/intelligence-system-plan.md`
- `docs/intelligence-architecture-decision.md`
- `docs/agent-engineering-audit.md`
- `frameworks/skill-factory.md`
- `catalogs/agent-engineering-catalog.json`
- existing local skills if the project already has them

## Decide

Map repeatable operating loops and selected intelligence substrates into skill candidates.

For each candidate decide:

- trigger description
- user outcome
- inputs and outputs
- required tools
- memory reads and writes
- approval gates
- evals
- trust level
- whether to reuse, generate, defer, or reject

Prefer T0/T1 skill specs early. Only propose T2-T4 when scripts, external access, or autonomous behavior materially improves the product and the trust controls are clear.

## Write

Create or update:

- `docs/skill-inventory.md`

Use:

- `templates/shared/skill-inventory.template.md`
- `templates/shared/skill-spec.template.md` for any high-priority candidate that needs a separate spec

## Blockers

Stop before Agent OS Runtime, Agent Network and Interoperability, and Capability and Access if:

- skill candidates require external tools but those tools are not named
- a T3/T4 skill lacks approval, logging, or rollback requirements
- a skill writes durable memory without a review policy
- a skill is too broad to trigger safely
- public skills are proposed without dependency-style review

## State

Update `.codex-brain/state.json`:

- `gates.agent_engineering.missing`: remove `docs/skill-inventory.md` when created
- `distillates.skill_inventory`: concise list of required skills, trust levels, and deferred skills

## Next

Proceed to Step 03 to decide whether this gate can be approved.

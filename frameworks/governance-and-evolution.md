# Governance and Evolution Framework

Codex Brain should improve over time without becoming chaotic.

This framework defines when to update the brain, how to promote lessons, and how to prevent weak changes from degrading the methodology.

## Governance Principle

The brain is allowed to evolve only when the change improves future project outcomes.

Do not add process because it sounds impressive. Add process because it prevents a real miss, improves quality, or creates better execution.

## Change Types

### Framework Change

Update `frameworks/*.md` when:

- a new recurring risk is discovered
- a methodology step is unclear
- a phase gate missed something important
- a category needs deeper guidance

### Schema Change

Update `schemas/*.json` when:

- future Codex sessions need structured access
- a lesson should become machine-checkable
- state needs a new required field

### Template Change

Update `templates/**` when:

- a repeated artifact should be easier to create
- a checklist missed a common item
- a project repeatedly creates the same structure manually

### Script Change

Update `scripts/**` when:

- a manual check can be automated
- a gate can be validated locally
- a repeatable workflow should be made safer

### Agent Prompt Change

Update `agents/**` when:

- a review role misses a class of issue
- an expert lens should be made reusable
- review output needs more structure

## Lesson Promotion

A lesson moves through:

```text
captured -> reinforced -> promoted -> enforced
```

Promotion criteria:

- `captured`: one useful signal
- `reinforced`: seen again or validated by user/review
- `promoted`: added to framework/template/schema/script/agent
- `enforced`: added to validator or P0/P1 gate

## Promotion Decision Table

| Lesson Type | Promote To |
| --- | --- |
| Missed research category | research framework + matrix |
| Missed Build Plan section | build-plan framework + checklist |
| Missed frontend taste issue | Design DNA + visual QA |
| Missed security issue | security framework + review role + gate |
| Missed GDPR issue | GDPR framework + state/schema/gate |
| Missed database scale issue | database framework + ADR template |
| Repeated execution failure | execution loop + PRD template + script |
| Repeated review failure | agent prompt + quality matrix |
| Repeated underbuilt/overbuilt AI product | agentic opportunity framework + intelligence system plan template + agentic patterns catalog |
| Repeated tool/access failure | capability-access framework + tool routing matrix + capability catalog + workflow gate |

## Versioning

Every meaningful change should be committed with a clear message.

For future major versions:

- `0.x`: evolving system
- `1.0`: stable baseline used across multiple real projects
- `2.0`: major lifecycle or schema change

## Brain Health Checks

Run:

```bash
npm run check
npm run audit-depth
```

Before calling the brain healthy:

- required files exist
- JSON parses
- Full-mode domains are covered
- critical concepts are present

## Anti-Patterns

- Adding huge prose with no operational effect.
- Adding JSON fields no session will use.
- Adding gates that block Light projects unnecessarily.
- Letting Full-mode rigor leak into every tiny project.
- Removing a gate because one project felt slow.
- Downgrading rigor without recording the accepted risk.

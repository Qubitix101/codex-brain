# Intelligence System Plan Framework

An Intelligence System Plan describes the high-level operating architecture for products that should become more than a normal app.

It is the bridge between the Agentic Opportunity Audit and the Capability and Access Map.

## Purpose

The plan turns an idea into a clear intelligence architecture:

- what the system knows
- what it senses
- what it creates
- what it can do
- when it asks permission
- how it evaluates quality
- how it learns
- what tooling and harnesses it will need

## Required Artifact

Use:

- `docs/intelligence-system-plan.md`
- `templates/shared/intelligence-system-plan.template.md`
- `catalogs/agentic-system-patterns.json`

## System Anatomy

A strong intelligence system has these layers.

### 1. Domain Model

The map of the user's world:

- entities
- relationships
- workflows
- desired outcomes
- constraints
- success metrics

### 2. Private Memory

The durable context that makes the system useful:

- profile
- preferences
- voice/style
- proof
- examples
- history
- assets
- decisions
- boundaries
- feedback

### 3. Sensing Layer

How the system gets information:

- manual capture
- file upload
- browser reading
- email/calendar/drive
- social platforms
- APIs and webhooks
- scheduled research
- audio/video/image inputs
- user feedback

### 4. Reasoning Layer

How the system decides:

- classification
- prioritization
- planning
- recommendation
- generation
- critique
- routing
- escalation

### 5. Skill Layer

Reusable domain abilities:

- write
- summarize
- research
- analyze
- score
- transform
- generate media
- inspect UI
- reconcile data
- prepare decisions

Skills should have inputs, outputs, quality criteria, and failure modes.

### 6. Tool and Harness Layer

How the system acts:

- official APIs and SDKs
- official CLIs
- MCP servers and connectors
- generated CLI harnesses
- browser automation
- Computer Use
- queues and jobs
- webhooks

The detailed selection belongs in the Capability and Access Map.

### 7. Routine Layer

What happens repeatedly:

- daily briefing
- weekly review
- monitoring
- draft generation
- renewal/reminder
- analytics review
- cleanup
- follow-up
- learning update

Routines should define trigger, schedule, owner, inputs, output, approval, and failure behavior.

### 8. Approval and Control Layer

Where humans remain in control:

- create proposal
- approve memory update
- approve draft
- approve external write
- approve spend
- approve publish/send/delete
- rollback or revoke

### 9. Evaluation Layer

How quality is proven:

- golden examples
- scorecards
- factuality checks
- style/voice match
- safety review
- privacy checks
- regression tests
- outcome metrics

### 10. Learning Layer

How the system improves:

- user corrections
- performance data
- accepted/rejected proposals
- outcome tracking
- memory updates
- prompt/skill/routine changes
- promoted lessons

## Plan Output

Every plan should include:

- intelligence-system thesis
- target maturity now and later
- key operating loops
- memory model
- sensing inputs
- core skills
- tool/harness needs
- routine map
- approval map
- eval and quality plan
- learning flywheel
- risk boundaries
- first vertical slice
- future OS layers

## First Slice Rule

Do not build the full operating system first.

Pick the smallest closed loop that proves the system:

```text
capture input -> update memory or context -> generate/propose output -> review/approve -> record outcome -> learn
```

For a social content system, the first slice might be:

```text
capture proof/story -> classify into memory -> generate weekly content brief -> approve direction -> draft one LinkedIn post -> score voice/proof/platform fit
```

## Anti-Patterns

- A plan that lists tools but no operating loop.
- A plan with memory but no update policy.
- A plan with automation but no approval or rollback boundary.
- A plan with generation but no evals.
- A plan that starts with every integration instead of the first closed loop.
- A plan that cannot explain how the product gets better over time.

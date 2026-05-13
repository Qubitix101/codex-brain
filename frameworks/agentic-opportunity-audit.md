# Agentic Opportunity Audit Framework

Codex Brain should decide whether an idea deserves a normal app, an AI-assisted workflow, or a real agentic operating system before planning the build.

This framework sits before Capability and Access Readiness. It answers what kind of intelligence system the product should become; the capability/access map answers which APIs, CLIs, MCPs, credentials, and harnesses are required to build it.

## Purpose

Many AI products underbuild the real opportunity. They ship a prompt box when the user needed a memory-backed system with tools, routines, approvals, evaluation, and learning.

Other products overbuild. They add agents, automations, and tool calls where a simple workflow would be cheaper, safer, and easier to trust.

The audit prevents both failures.

## Gate 2.25

Agentic Opportunity sits after Research and before Capability and Access.

```text
Classify -> Validate -> Research -> Agentic Opportunity -> Capability and Access -> Plan -> Design DNA -> Decompose -> Execute -> Review -> Ship -> Learn
```

Required artifacts for AI-core, automation-heavy, workflow-heavy, content, knowledge-work, multi-tool, or customer-operating-system products:

- `docs/agentic-opportunity-audit.md`
- `docs/intelligence-system-plan.md`

Light projects may mark this gate as not applicable only when there is no AI, automation, recurring workflow, memory, external tool, or multi-step user outcome.

## Core Question

Ask:

```text
Is the real product a normal app, or is the product an intelligence system?
```

A normal app stores data and exposes workflows.

An intelligence system senses, remembers, reasons, creates, acts, asks for approval, evaluates outcomes, and improves over time.

## Agentic Maturity Levels

### L0 - Normal App

- no AI core loop
- deterministic CRUD/workflow product
- no model reasoning needed

### L1 - AI Generation

- user asks
- model generates
- user copies or edits
- no durable memory or tool action

### L2 - AI Plus Tools

- model can call tools
- tools provide data or create artifacts
- user still drives each task manually

### L3 - Memory-Backed Copilot

- system remembers user context, preferences, examples, history, and constraints
- suggestions improve with private knowledge
- user approves before external action

### L4 - Workflow Agent With Approvals

- system runs multi-step workflows
- proposes plans and draft outputs
- asks approval at defined gates
- can use tools and schedules inside boundaries

### L5 - Bounded Autonomous Operator

- system can run recurring routines or monitored tasks without being prompted each time
- actions are bounded by policies, budgets, permissions, and audit logs
- human review is reserved for sensitive decisions

### L6 - Domain Operating System

- system becomes the user's operating layer for a domain
- includes memory, tools, skills, routines, permissions, evals, analytics, feedback loops, and continuous learning
- the product gets stronger as the private operating context improves

## Audit Dimensions

Evaluate every serious idea across these dimensions.

### 1. User Job and Outcome

- What job is the user trying to get done?
- Is the outcome one-time, recurring, or continuous?
- Does the user need a result, a workflow, or a domain operating system?

### 2. Sensing and Inputs

- What must the system see, read, hear, watch, ingest, or monitor?
- Are inputs manual, connected, scheduled, event-driven, or external?
- Does the system need eyes through browser/UI, ears through audio, or hands through tools?

### 3. Memory and Knowledge Base

- What should the system remember?
- What examples, proofs, preferences, stories, voice, assets, constraints, or outcomes make future work better?
- What memory is private, tenant-bound, regulated, or deleteable?

### 4. Reasoning and Decisioning

- What decisions can the system make?
- What decisions should it only recommend?
- What decisions require human approval?
- What is the cost of being wrong?

### 5. Creation and Transformation

- What artifacts should the system create?
- Text, image, video, voice, slides, docs, code, data, workflows, tickets, campaigns, or reports?
- What quality bar and evals are required?

### 6. Action and Tool Use

- What external systems should it act inside?
- What APIs, SDKs, CLIs, MCPs, browser flows, desktop tools, or generated harnesses might be required?
- Which actions are read-only, write, paid, destructive, public, or externally visible?

### 7. Routines and Automation

- What should recur daily, weekly, monthly, event-triggered, or continuously?
- What should wake up later?
- What should monitor for changes?
- What should be proposed versus executed automatically?

### 8. Human Approval and Control

- Where must the user approve?
- What should be reviewable before it becomes durable or public?
- What are the stop buttons, rollback paths, and escalation rules?

### 9. Evaluation and Quality Gates

- How do we know outputs are good?
- What is unacceptable?
- What eval sets, scorecards, golden examples, or review rubrics are needed?
- How is drift detected?

### 10. Learning Loop and Moat

- What feedback improves the system?
- What private context compounds?
- What outcome data becomes a defensible advantage?
- What would make this hard to copy?

## Required Output

The audit must produce:

- recommended maturity level now
- highest plausible maturity level later
- normal app version
- AI-assisted version
- agentic OS version
- agentic leverage map
- required memory
- required tools and harness classes
- recurring routines
- approval gates
- evals and quality checks
- automation boundaries
- moat and data flywheel
- recommended build sequence
- deferred agentic layers

## Social Content Example

Weak product:

- user writes prompt
- LLM writes LinkedIn post

Strong intelligence system:

- system learns user voice, proof, stories, expertise, audience, successful examples, boundaries, and goals
- monitors relevant signals and captures ideas
- proposes weekly content direction
- drafts platform-specific posts for LinkedIn, X, Instagram, newsletter, short video, or carousel
- checks claims against proof bank
- asks approval before publishing
- schedules or publishes through connected tools when approved
- learns from performance and updates the authority memory

Agentic components:

- memory: voice profile, proof bank, story bank, niche map, audience map, brand boundaries
- tools: platform APIs, scheduling, analytics, image/video/voice providers, file storage, browser verification
- skills: hooks, post writing, carousel scripts, repurposing, claim checking, platform formatting
- routines: weekly brief, content calendar, idea capture, performance review
- approvals: draft approval, publish approval, sensitive-claim approval
- evals: voice match, factuality, proof support, repetition, platform fit, brand safety

## Blocking Rules

Block Capability and Access planning when:

- the product is AI-core but no maturity level is selected
- the real user job is recurring or continuous but no routine model exists
- the system needs memory but memory requirements are undefined
- tool actions are implied but approval boundaries are missing
- automation is promised but trigger, schedule, and rollback rules are absent
- quality claims are made without evals or review gates

Do not block when:

- the project is clearly L0 or L1 and the user accepts that scope
- agentic layers are explicitly deferred with revisit triggers
- the next PRD only builds a safe mock or prototype of the intelligence loop

## Anti-Patterns

- Treating an LLM text box as a product when the user needs an operating system.
- Adding autonomous agents before memory, permissions, and evals exist.
- Confusing tool access with product intelligence.
- Automating public actions before approval gates are designed.
- Building integrations before knowing which loops create user value.
- Calling something an agentic system when it has no sensing, memory, action, routine, eval, or learning loop.

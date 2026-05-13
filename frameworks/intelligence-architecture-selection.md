# Intelligence Architecture Selection Framework

Codex Brain must decide the intelligence substrate before it designs production agents, skills, Agent OS runtime, or access surfaces.

This framework sits after the Agentic Opportunity Audit and Intelligence System Plan, and before Agent Engineering, Skill Factory, Agent OS Runtime, Agent Network and Interoperability, and Capability Access.

## Purpose

The question is not only "ADK or RAG?"

The real question is:

```text
What kind of intelligence does each product loop need: reasoning, retrieval, extraction, memory, workflow, action, or automation?
```

Many weak AI products fail because they choose a generic architecture:

- "just add RAG" when the source of truth is structured records
- "just build an agent" when the product only needs grounded answers
- "just call tools" when the system needs memory, evals, approvals, and rollback
- "just store embeddings" when the valuable work is extracting durable structured fields

The Intelligence Architecture Selection gate forces the architecture to match the job.

## Gate 2.3

Intelligence Architecture sits after Agentic Opportunity and before Agent Engineering, Agent OS Runtime, Agent Network and Interoperability, and Capability Access.

```text
Classify -> Validate -> Research -> Agentic Opportunity -> Intelligence Architecture -> Agent Engineering -> Agent OS Runtime -> Agent Network and Interoperability -> Capability and Access -> Plan -> Design DNA -> Decompose -> Execute -> Review -> Ship -> Learn
```

Required artifact for AI-core, agentic, retrieval-heavy, knowledge-heavy, workflow-heavy, or automation-heavy products:

- `docs/intelligence-architecture-decision.md`

Projects may mark this gate not applicable only when the Agentic Opportunity Audit concludes L0 or a simple L1 product with no retrieval, durable memory, structured extraction, workflow orchestration, or external action.

## The Architecture Choices

### 1. Model-Only Reasoning

Use when the product needs language transformation, ideation, critique, classification, or drafting using context already provided.

Best for:

- short-form generation
- summarizing provided input
- rewriting
- classification
- critique against a rubric

Avoid when:

- answers depend on private or changing data
- the system must cite sources
- the system must write external systems
- the same facts must persist across sessions

### 2. ADK-Style Workflow or Agent Architecture

Use when the product must act through steps.

Best for:

- multi-step workflows
- tool use
- triage
- approvals
- task coordination
- repeatable operating procedures
- orchestration across models, tools, and jobs

Avoid when:

- the user only needs a direct grounded answer
- there are no actions, branches, or durable state
- the workflow has no evals or failure handling

### 3. Semantic RAG

Use when the user asks flexible questions over unstructured or semi-structured material.

Best for:

- policies
- PDFs
- manuals
- knowledge bases
- long-form research
- documentation support
- broad semantic questions

Avoid when:

- the source of truth is a database row, status, count, permission, or timestamp
- exactness matters more than semantic similarity
- documents are not chunked, cited, fresh, or evaluated

### 4. Deterministic Structured Retrieval

Use when the answer should come from exact records.

Best for:

- SQL queries
- API reads
- CRM/account records
- permissions
- workflow status
- analytics metrics
- dates, IDs, states, totals, filters, and ownership

Avoid when:

- the user asks broad conceptual questions over messy prose
- the data has not been modeled into reliable fields

### 5. LLM Extraction Into Structured Fields

Use when messy inputs must become durable data.

Best for:

- extracting entities, claims, preferences, examples, stories, risks, tasks, deadlines, and proof points
- turning documents, transcripts, emails, audio notes, or posts into a queryable knowledge base
- building private memory from raw user material

Avoid when:

- extracted fields will not be reviewed, validated, or used again
- the schema is unstable and no one owns corrections
- confidence, provenance, and conflict handling are missing

### 6. Durable Memory and Knowledge Graph

Use when the product must compound user-specific or domain-specific context over time.

Best for:

- preferences
- voice/style
- decisions
- histories
- relationships
- examples
- outcome feedback
- entity maps

Avoid when:

- memory changes are hidden from the user
- there is no delete/export/conflict policy
- tenant boundaries are unclear

### 7. External Action Layer

Use when the system changes the world.

Best for:

- publish
- send
- schedule
- update
- delete
- purchase
- deploy
- mutate production data

Required:

- preview
- approval
- audit log
- rollback or compensating action
- permission boundary
- failure handling

### 8. Routine and Automation Layer

Use when the system should operate repeatedly.

Best for:

- daily/weekly/monthly reviews
- monitoring
- reminders
- recurring reports
- scheduled research
- sync jobs
- periodic learning updates

Required:

- trigger
- scope
- budget
- job state
- idempotency
- notification policy
- failure recovery

## Selection Questions

For each product loop, answer:

- Is the loop meant to answer, decide, transform, extract, remember, coordinate, or act?
- What is the source of truth?
- Is the source unstructured text, structured records, live APIs, user memory, or external web data?
- Does the product need semantic recall, exact retrieval, or both?
- Should messy source material be converted into structured fields first?
- Does the loop require durable memory?
- Does it require tool calls, external writes, public actions, paid actions, or autonomy?
- Does the output need citations, evidence trails, confidence, or approval?
- What eval proves the loop works?

## Required Output

`docs/intelligence-architecture-decision.md` must include:

- architecture thesis
- per-loop architecture map
- selected substrates
- rejected substrates and why
- source-of-truth policy
- RAG vs structured retrieval vs extraction decision
- memory and knowledge graph decision
- ADK/workflow decision
- action and routine decision
- eval and trace requirements
- first vertical slice
- open architecture risks
- handoff requirements for Agent Engineering and Skill Factory

## Decision Heuristics

Use semantic RAG when:

- knowledge is mostly documents
- queries vary widely
- semantic similarity is useful
- citations matter

Use deterministic structured retrieval when:

- exact fields exist or should exist
- users ask for status, counts, filters, dates, ownership, permissions, or analytics
- downstream actions depend on correctness

Use extraction into structured fields when:

- raw material is messy
- the same extracted facts will be reused
- memory, personalization, reporting, or automation depends on those facts

Use ADK-style workflow when:

- the system must coordinate steps
- tools or decisions are involved
- approvals, retries, routines, or multiple actors matter

Use hybrid architecture when:

- the system must be both informed and active
- the user expects a domain expert, not a search box
- private memory and external action both matter

## Anti-Patterns

- Saying "RAG" without defining corpus, chunking, metadata, citations, freshness, or evals.
- Saying "agent" without defining workflow, state, tool contracts, approvals, or failure handling.
- Using vector search for exact database questions.
- Using SQL/API reads for broad semantic document questions.
- Extracting data without schema ownership, provenance, validation, or correction flow.
- Creating memory that users cannot inspect, correct, export, or delete.
- Automating external actions without preview, approval, trace, and rollback.

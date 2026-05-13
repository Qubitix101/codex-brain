# Competitive Benchmark Framework

Codex Brain should learn from strong public systems without becoming a clone of them.

This framework records what to borrow, what to avoid, and where Codex Brain must be stronger.

## Benchmark Repositories

### BMAD Method

Source: https://github.com/bmad-code-org/BMAD-METHOD

What BMAD does well:

- installable workflow ecosystem
- skill-based entry points
- help router that tells users what to do next
- named specialist agents
- analysis, planning, architecture, implementation, review, and retrospective workflows
- Quick Dev path for smaller work
- project-context file for implementation consistency
- document sharding and distillation for large-context work
- customization surfaces for teams and individuals
- testing path with quick QA and enterprise test architecture module

What Codex Brain should learn:

- Make the system operational through commands, manifests, scripts, and templates.
- Keep large methodology files, but expose small executable steps for AI sessions.
- Add help/routing so users do not need to remember which gate comes next.
- Use project context as an implementation constitution.
- Treat testing strategy as a first-class workflow, not a late clean-up task.

Where Codex Brain must go further:

- stronger Full-mode product diligence
- stronger database scale, multi-tenancy, GDPR, security, and trust gates
- Design DNA as a blocking frontend gate, not optional UX decoration
- machine-readable state and validators for future Codex sessions
- structured learning that promotes lessons into frameworks, templates, schemas, scripts, and agents
- promise-to-spec audit before building product claims

### TracerKit

Source: https://github.com/helderberto/tracerkit

What TracerKit does well:

- PRD to plan to build to check workflow
- vertical slices instead of disconnected layer-by-layer tasks
- checkboxes tied to verifiable completion
- session brief that shows progress and next focus
- low runtime weight

What Codex Brain should learn:

- Every execution plan should be sliced into demoable increments.
- Every task checkbox should be verifiable by reading files, running commands, or checking tests.
- Plans should have a first incomplete item and a clear next action.

Where Codex Brain must go further:

- add product, compliance, design, security, database, and launch gates around the vertical slices
- treat vertical slicing as the execution shape after strategy and architecture are clear
- add Full-mode evidence and risk tracking before execution starts

### Claude Code Memory Bank

Source: https://github.com/hudrazine/claude-code-memory-bank

What Memory Bank systems do well:

- persistent context across sessions
- human-readable project memory files
- active context and progress tracking
- architecture and technology pattern memory

What Codex Brain should learn:

- Keep a concise memory layer in every project.
- Separate durable project facts from transient task notes.
- Update memory at phase transitions and meaningful implementation milestones.

Where Codex Brain must go further:

- pair Markdown memory with JSON state
- enforce gates from state, not memory alone
- convert repeated lessons into reusable brain upgrades

### GitHub Spec Kit

Source: https://github.com/github/spec-kit

What Spec Kit does well:

- spec-driven development flow
- project constitution/memory
- AI-agent integrations
- plan and task generation before implementation
- community extension ecosystem
- architecture and CI guard extensions

What Codex Brain should learn:

- Keep specifications as executable control surfaces, not throwaway documents.
- Make phase artifacts easy for agents to consume.
- Support multiple agent surfaces without losing one project methodology.

Where Codex Brain must go further:

- add business, design, privacy, security, database, and launch gates before coding
- audit whether the product itself should become an intelligence system
- add production-agent engineering and skill-factory gates
- choose APIs, CLIs, MCPs, browser flows, Computer Use, and generated harnesses from one access map

### Agent Runtime and Observability Frameworks

Sources:

- OpenAI Agents SDK: https://developers.openai.com/api/docs/guides/agents
- Google ADK: https://adk.dev/
- Microsoft Agent Framework: https://learn.microsoft.com/en-us/agent-framework/
- LangGraph/LangSmith: https://www.langchain.com/langgraph
- Langfuse: https://langfuse.com/docs

What they do well:

- agent orchestration
- tools and handoffs
- stateful or graph-based workflows
- human-in-the-loop controls
- tracing, evaluation, and observability
- production runtime options

What Codex Brain should learn:

- Agentic products need runtime architecture, not only planning docs.
- Model routing, tool execution, state, approvals, traces, and evals must be designed before implementation.
- Observability and evaluation are core product requirements for agents.

Where Codex Brain must go further:

- sit one layer earlier than runtime frameworks
- decide whether an agent should exist at all
- translate product ambition into intelligence loops, skills, tool surfaces, PRDs, and quality gates
- remain provider-agnostic across Codex, Claude/Opus, Perplexity, browser automation, MCP, CLI, APIs, and future runtimes

### Agent Skills Ecosystem

Source: https://agentskills.io/

What skill systems do well:

- package procedural knowledge as portable `SKILL.md` folders
- use progressive disclosure to protect context budget
- allow instructions, scripts, references, and assets to travel across agents

What Codex Brain should learn:

- Repeated procedures should become durable skills.
- Skill metadata must be concise and triggerable.
- Executable skill content requires dependency-style review.

Where Codex Brain must go further:

- generate skill candidates from product operating loops
- require trust levels, evals, approvals, and install decisions
- keep customer memory out of reusable skill packages
- connect skill generation to capability/access and Build Plan gates

### CLI-Anything and Generated Harnesses

Source: https://github.com/HKUDS/CLI-Anything

What CLI-Anything does well:

- turns GUI or poorly structured software into agent-usable CLI harnesses
- produces command-like control surfaces that can be versioned and tested
- pairs generated harnesses with `SKILL.md` guidance for agent use
- reduces reliance on fragile repeated UI automation
- expands the set of software an agent can operate without waiting for official MCP support

What Codex Brain should learn:

- Generated harnesses are a real third path, not only a fallback after CLI and MCP.
- Harness generation belongs in capability planning when the product depends on desktop tools, creative apps, or vendor surfaces without strong APIs.
- A generated CLI is only valuable if its commands, JSON outputs, install steps, and smoke tests are explicit.

Where Codex Brain must go further:

- decide before generation whether official API, SDK, CLI, MCP, browser automation, or Computer Use is a better surface
- require trust classification before an agent installs or runs third-party harnesses
- require verification commands, artifact checks, and rollback notes for generated harness workflows
- keep generated harnesses out of production runtime paths unless they are deliberately owned, tested, and maintained

## Benchmark Decision

Codex Brain should cover BMAD-level workflow ergonomics while exceeding BMAD in world-class product diligence.

The target is not:

- more documents for their own sake
- theatrical agent behavior
- process that cannot be enforced

The target is:

- better decisions before code
- better decomposition during code
- better verification after code
- better learning after projects

## Adoption Rules

Add a benchmark-inspired capability only when it satisfies at least one condition:

- prevents a known failure mode
- improves user or buyer trust
- makes a gate machine-checkable
- reduces session context loss
- improves implementation consistency
- improves frontend quality
- improves security, privacy, reliability, or scale
- improves future project learning

Do not add a capability when:

- it is only branding
- it adds ceremony to Light projects
- it duplicates an existing gate without improving it
- future Codex sessions cannot realistically use it

## Current Differentiation Thesis

BMAD is the public ecosystem benchmark.

Codex Brain should be the Codex-native high-rigor product brain:

- BMAD-level workflow routing
- TracerKit-level vertical slices
- Memory Bank-level continuity
- Spec Kit-level spec-first discipline
- intelligence-architecture selection across model-only, ADK/workflow, RAG, structured retrieval, extraction, memory, action, and routines
- agent-runtime-level orchestration awareness without locking into one runtime
- Agent Skills-style procedural memory with stricter trust gates
- CLI-Anything-style generated harness awareness with stricter surface-routing and trust review
- Full-mode product, scale, design, security, GDPR, testing, and launch discipline
- agentic-opportunity, intelligence-architecture, agent-engineering, skill-factory, and capability-access gates before Build Plan
- JSON-backed state and audit scripts
- structured learning promotion

That combination is the strategic edge.

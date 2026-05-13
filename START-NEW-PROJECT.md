# Start a New Project With Codex Brain

Use this exact instruction when starting a new project:

```text
Use Codex Brain. Follow the Codex Brain repo at https://github.com/Qubitix101/codex-brain. Read its CODEX.md first, bootstrap this project if needed, classify the project as Light, Standard, or Full, audit whether this should become an agentic intelligence system if AI/automation is relevant, select the intelligence architecture if RAG/structured retrieval/extraction/memory/workflow/action/routines are relevant, audit production-agent engineering and procedural skills if agents/retrieval/multi-model orchestration are relevant, define the Agent OS runtime if L3+/multi-agent/memory-writing/routine/tool/action behavior is relevant, map required capabilities/access if this depends on external systems, and tell me the next allowed action before building.
```

After bootstrap, the new project should contain:

- `CODEX.md`
- `.codex-brain/state.json`
- `.codex-brain/project-context.md`
- `.codex-brain/memory/`
- `.codex-brain/sessions/`

Then future sessions can use the shorter instruction:

```text
Use Codex Brain for this project.
```

Codex should then read the local `CODEX.md`, local `.codex-brain/` state, and determine the next allowed action.

At the end of meaningful work, say:

```text
Save Codex Brain context for this session.
```

Codex should create a session record, update memory, and record the next action.

## Important Limitation

Codex does not automatically know to use Codex Brain in unrelated new conversations unless the user asks for it or the project already contains the local Codex Brain instruction files.

The reliable trigger is:

```text
Use Codex Brain.
```

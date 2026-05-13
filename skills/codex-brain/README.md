# Codex Brain Global Skills Pack

This folder contains portable Codex skills extracted from the Codex Brain operating system.

Codex Brain remains the full project harness for state, bootstrap, lifecycle gates, context persistence, and repo-local workflows. These skills are smaller reusable procedures that can be installed globally under `~/.codex/skills` and invoked across Codex chats and projects.

## Install

```bash
npm run install-global-skills
```

By default, the installer writes to:

```text
~/.codex/skills
```

Override the target with:

```bash
CODEX_SKILLS_HOME=/path/to/skills npm run install-global-skills
```

Dry-run validation:

```bash
npm run install-global-skills -- --dry-run
```

## Skills

- `agentic-opportunity-auditor`
- `intelligence-architecture-selector`
- `agent-engineering-reviewer`
- `capability-access-mapper`
- `tool-surface-router`
- `skill-factory`
- `vertical-slice-prd-decomposer`
- `design-dna-gate`
- `context-save-handoff`

## Design Rules

- Each skill is instruction-only at v0.1.0.
- Each `description` is the trigger condition.
- No external writes, credentials, network calls, or scripts are bundled.
- Add scripts only after trust review and calibration.
- Keep the full Codex Brain repo as the canonical source for deeper lifecycle operation.

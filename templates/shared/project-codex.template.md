# CODEX.md - [Project Name]

This project uses Codex Brain as its project operating system.

Canonical brain repo:

https://github.com/Qubitix101/codex-brain

## Trigger

When the user says any of the following:

- "Use Codex Brain"
- "Follow Codex Brain"
- "Start with Codex Brain"
- "Use the brain system"
- "Work methodically with the brain"

Codex must follow this file and the canonical Codex Brain methodology before building.

## Required Session Start

At the start of a Codex Brain session:

1. Read this `CODEX.md`.
2. Read `.codex-brain/state.json`.
3. Read `.codex-brain/classification.json` if present.
4. Read `.codex-brain/project-context.md`.
5. Read `.codex-brain/memory/active-context.md` and `.codex-brain/memory/progress.md`.
6. If available, run:

   ```bash
   npm run next-action -- --dir .
   ```

   If the Codex Brain repo is not installed locally, apply the next-action protocol manually from `.codex-brain/state.json`.

7. State:
   - current mode
   - current phase
   - gate status
   - missing artifacts
   - next allowed action
   - blocked actions

8. Do not write product code until the active gate allows it.

## Rigor Rule

Codex proposes the project mode. The user approves it.

- Light: low-risk prototype, script, internal tool, simple site.
- Standard: real users, auth, user data, SaaS, dashboard, integration, production deployment.
- Full: unicorn-level, enterprise, regulated, multi-tenant, paid, AI-core, GDPR, high-scale, or maximum-quality product.

If the user asks for world-class, top-ten, unicorn-level, enterprise-grade, or no-corners-cut quality, recommend Full mode.

## Hard Gates

- No frontend implementation before Design DNA approval.
- No serious backend implementation before database, auth, security, and privacy assumptions are documented.
- No multi-tenant product without tenant isolation and authorization model.
- No paid product without billing and entitlement edge cases.
- No EU personal data without GDPR analysis.
- No AI-core product without eval, fallback, cost, safety, and permission plans.
- No shipping without tests, monitoring, smoke tests, rollback, and launch approval.
- No project end without lessons captured.

## Git and Review Workflow

- Do not do meaningful feature, fix, redesign, refactor, database, infrastructure, dependency, or experiment work directly on `main` unless the user explicitly asks.
- Use a `codex/...` branch for normal feature work.
- Use a separate worktree for risky experiments, long-running tasks, parallel work, or when the current working tree has unrelated user changes.
- Prefer pull requests over direct pushes to `main`.
- Run local Codex review with `/review` before opening or updating a PR when available.
- Require GitHub Codex Code Review on every PR when the repository integration is available.
- Treat P0 and P1 review findings as merge blockers unless the user explicitly accepts the risk.
- Never merge into `main` or push directly to `main` without explicit user approval.

## Local State

Primary local files:

- `.codex-brain/state.json`
- `.codex-brain/classification.json`
- `.codex-brain/project-context.md`
- `.codex-brain/memory/project-brief.md`
- `.codex-brain/memory/product-context.md`
- `.codex-brain/memory/system-patterns.md`
- `.codex-brain/memory/tech-context.md`
- `.codex-brain/memory/active-context.md`
- `.codex-brain/memory/progress.md`

The JSON state controls phase and gate status. Memory files preserve project knowledge across sessions.

## If Canonical Repo Is Available

If the canonical Codex Brain repo is available locally, read its:

- `CODEX.md`
- `USAGE-GUIDE.md`
- `catalogs/workflow-manifest.json`
- `frameworks/context-routing-and-help.md`

Use its scripts when possible:

```bash
npm run next-action -- --dir .
npm run session-brief -- --dir .
npm run verify-plan -- docs/prd/[file].md
```

## If Canonical Repo Is Not Available

Do not ignore Codex Brain.

Use the local `.codex-brain/` state and this file to continue safely. If deeper methodology is needed, ask the user to provide or clone the canonical repo.

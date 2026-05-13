#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { parseArgs, readJson } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const root = resolve(args.dir || process.cwd());
const statePath = resolve(args.state || join(root, ".codex-brain", "state.json"));

if (!existsSync(statePath)) {
  console.error(`Missing state file: ${statePath}`);
  process.exit(1);
}

const state = readJson(statePath);
const errors = [];
const warnings = [];

if (!state.project) errors.push("state.project is required.");
if (!["light", "standard", "full", "pending"].includes(state.mode)) errors.push("state.mode must be light, standard, full, or pending.");
if (!state.phase) errors.push("state.phase is required.");
if (!state.gates?.agentic_opportunity) warnings.push("state.gates.agentic_opportunity is missing; bootstrap from the latest Codex Brain template when agentic planning matters.");
if (!state.gates?.capability_access) warnings.push("state.gates.capability_access is missing; bootstrap from the latest Codex Brain template when capability planning matters.");

for (const [gateName, gate] of Object.entries(state.gates || {})) {
  for (const artifact of gate.required_artifacts || []) {
    const artifactPath = join(root, artifact);
    if (!existsSync(artifactPath)) {
      if (gate.status === "complete") {
        errors.push(`Gate ${gateName} is complete but artifact is missing: ${artifact}`);
      } else {
        warnings.push(`Gate ${gateName} missing artifact: ${artifact}`);
      }
    }
  }
}

if (state.design_dna?.required && !state.design_dna.frontend_unblocked) {
  warnings.push("Design DNA is required and frontend is still blocked.");
}

if (!state.context) {
  warnings.push("state.context is missing; run save-context after meaningful work.");
} else {
  if (!state.context.last_session_id) warnings.push("No last session id recorded in state.context.");
  if (!state.context.last_next_action) warnings.push("No last next action recorded in state.context.");
}

if (state.mode === "full") {
  const fullExpected = [
    "docs/agentic-opportunity-audit.md",
    "docs/intelligence-system-plan.md",
    "docs/capability-access-map.md",
    "docs/build-plan.md",
    "design/design-dna.md"
  ];
  for (const artifact of fullExpected) {
    if (!existsSync(join(root, artifact))) warnings.push(`Full mode expected artifact missing: ${artifact}`);
  }
}

console.log(JSON.stringify({ ok: errors.length === 0, errors, warnings }, null, 2));
process.exit(errors.length === 0 ? 0 : 1);

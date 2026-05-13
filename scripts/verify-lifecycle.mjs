#!/usr/bin/env node
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { parseArgs, readJson } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const root = resolve(args.dir || process.cwd());
const statePath = resolve(args.state || join(root, ".codex-brain", "state.json"));
const classificationPath = resolve(args.classification || join(root, ".codex-brain", "classification.json"));
const requireCurrent = Boolean(args["require-current"]);

const phaseOrder = [
  "classify",
  "validate",
  "research",
  "agentic-opportunity",
  "intelligence-architecture",
  "agent-engineering",
  "agent-os-runtime",
  "agent-network",
  "agentic-zero-trust",
  "capability-access",
  "plan",
  "design-dna",
  "decompose",
  "execute",
  "review",
  "ship",
  "learn"
];

const gateByPhase = {
  classify: "classification",
  validate: "validation",
  research: "research",
  "agentic-opportunity": "agentic_opportunity",
  "intelligence-architecture": "intelligence_architecture",
  "agent-engineering": "agent_engineering",
  "agent-os-runtime": "agent_os_runtime",
  "agent-network": "agent_network",
  "agentic-zero-trust": "agentic_zero_trust",
  "capability-access": "capability_access",
  plan: "plan",
  "design-dna": "design_dna",
  decompose: "decomposition",
  execute: "execution",
  review: "review",
  ship: "ship",
  learn: "learn"
};

const lightPrerequisitePhases = ["classify", "validate"];
const advancedGatePhases = [
  "agentic-opportunity",
  "intelligence-architecture",
  "agent-engineering",
  "agent-os-runtime",
  "agent-network",
  "agentic-zero-trust",
  "capability-access"
];

function pathExists(artifact) {
  return artifact && !artifact.includes("[") && !artifact.includes("#") && existsSync(join(root, artifact));
}

function gateComplete(gate) {
  return gate?.status === "complete" && gate.approved === true;
}

function missingArtifacts(gate) {
  return (gate?.required_artifacts || []).filter((artifact) => !pathExists(artifact));
}

function requiredPhaseList(state, targetPhase) {
  const targetIndex = phaseOrder.indexOf(targetPhase);
  if (targetIndex < 0) return [];

  function applicable(phase) {
    return phase !== "design-dna" || state.design_dna?.required !== false;
  }

  if (state.mode === "light") {
    const phases = lightPrerequisitePhases.filter((phase) => phaseOrder.indexOf(phase) < targetIndex && applicable(phase));
    const activeAdvanced = advancedGatePhases.filter((phase) => {
      const gate = state.gates?.[gateByPhase[phase]];
      return gate && (gate.status !== "not-started" || gate.approved || (gate.required_artifacts || []).some(pathExists));
    });
    return Array.from(new Set([...phases, ...activeAdvanced.filter((phase) => phaseOrder.indexOf(phase) < targetIndex && applicable(phase))]));
  }

  return phaseOrder.filter((phase) => phaseOrder.indexOf(phase) < targetIndex && applicable(phase));
}

function checkGate({ state, phase, gateName, gate, errors, warnings }) {
  if (!gate) {
    errors.push(`Missing gate object for ${gateName}.`);
    return;
  }

  if (!gateComplete(gate)) {
    errors.push(`Gate ${gateName} must be complete and approved before entering a later phase.`);
  }

  const artifactGaps = missingArtifacts(gate);
  if (artifactGaps.length > 0) {
    errors.push(`Gate ${gateName} is missing required artifact(s): ${artifactGaps.join(", ")}.`);
  }

  const declaredMissing = gate.missing || [];
  if (declaredMissing.length > 0) {
    errors.push(`Gate ${gateName} still declares missing item(s): ${declaredMissing.join(", ")}.`);
  }

  if (phase === "classify") {
    if (!existsSync(classificationPath)) {
      errors.push(`Missing classification file: ${classificationPath}`);
      return;
    }

    const classification = readJson(classificationPath);
    if (classification.user_approved !== true) {
      errors.push("Classification must be user-approved before entering a later phase.");
    }
    if (classification.approved_mode && classification.approved_mode !== "pending" && classification.approved_mode !== state.mode) {
      errors.push(`State mode (${state.mode}) does not match approved classification mode (${classification.approved_mode}).`);
    }
    if (
      classification.recommended_mode === "full" &&
      state.mode !== "full" &&
      !existsSync(join(root, "docs", "mode-downgrade-record.md")) &&
      !existsSync(join(root, ".codex-brain", "mode-downgrade-record.md"))
    ) {
      errors.push("Full mode was recommended but the project is running lower rigor without a mode downgrade record.");
    }
  }

  if (gate.status === "complete" && gate.approved !== true) {
    warnings.push(`Gate ${gateName} is complete but not approved.`);
  }
}

if (!existsSync(statePath)) {
  console.log(JSON.stringify({
    ok: false,
    errors: [`Missing state file: ${statePath}`],
    warnings: [],
    checked_phase: null,
    required_prior_gates: []
  }, null, 2));
  process.exit(1);
}

const state = readJson(statePath);
const targetPhase = args.phase || state.phase || "classify";
const targetIndex = phaseOrder.indexOf(targetPhase);
const errors = [];
const warnings = [];

if (targetIndex < 0) errors.push(`Unknown phase: ${targetPhase}`);
if (!["light", "standard", "full", "pending"].includes(state.mode)) errors.push(`Unknown mode: ${state.mode}`);
if (state.mode === "pending" && targetPhase !== "classify") {
  errors.push("Project mode is pending; classify and approve mode before moving past classify.");
}

for (const [gateName, gate] of Object.entries(state.gates || {})) {
  if (gate?.status === "complete") {
    const artifactGaps = missingArtifacts(gate);
    if (artifactGaps.length > 0) {
      errors.push(`Gate ${gateName} is complete but missing artifact(s): ${artifactGaps.join(", ")}.`);
    }
  }
}

const requiredPriorPhases = requiredPhaseList(state, targetPhase);
for (const phase of requiredPriorPhases) {
  const gateName = gateByPhase[phase];
  checkGate({
    state,
    phase,
    gateName,
    gate: state.gates?.[gateName],
    errors,
    warnings
  });
}

if (requireCurrent && targetIndex >= 0) {
  const gateName = gateByPhase[targetPhase];
  checkGate({
    state,
    phase: targetPhase,
    gateName,
    gate: state.gates?.[gateName],
    errors,
    warnings
  });
}

if (state.design_dna?.required && ["decompose", "execute", "review", "ship", "learn"].includes(targetPhase)) {
  const gate = state.gates?.design_dna;
  if (!gateComplete(gate) || state.design_dna.frontend_unblocked !== true) {
    errors.push("Design DNA is required but not approved/unblocked before frontend-capable phases.");
  }
}

const ok = errors.length === 0;
console.log(JSON.stringify({
  ok,
  project: state.project || null,
  mode: state.mode || null,
  state_phase: state.phase || null,
  checked_phase: targetPhase,
  require_current: requireCurrent,
  required_prior_gates: requiredPriorPhases.map((phase) => gateByPhase[phase]),
  errors,
  warnings
}, null, 2));

process.exit(ok ? 0 : 1);

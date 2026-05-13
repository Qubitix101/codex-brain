#!/usr/bin/env node
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs, readJson } from "./lib.mjs";

const brainRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const args = parseArgs(process.argv.slice(2));
const root = resolve(args.dir || process.cwd());
const statePath = resolve(args.state || join(root, ".codex-brain", "state.json"));
const manifest = readJson(join(brainRoot, "catalogs", "workflow-manifest.json"));

const gateByPhase = {
  classify: "classification",
  validate: "validation",
  research: "research",
  "agentic-opportunity": "agentic_opportunity",
  "intelligence-architecture": "intelligence_architecture",
  "agent-engineering": "agent_engineering",
  "agent-os-runtime": "agent_os_runtime",
  "agent-network": "agent_network",
  "capability-access": "capability_access",
  plan: "plan",
  "design-dna": "design_dna",
  decompose: "decomposition",
  execute: "execution",
  review: "review",
  ship: "ship",
  learn: "learn"
};

function pathExists(artifact) {
  if (!artifact || artifact.includes("[") || artifact.includes("#")) return false;
  return existsSync(join(root, artifact));
}

function workflowForPhase(phase, mode) {
  return manifest.workflows.find((workflow) => {
    return workflow.phase === phase && workflow.modes.includes(mode);
  }) || manifest.workflows.find((workflow) => workflow.phase === phase);
}

function nextPhase(phase) {
  const order = ["classify", "validate", "research", "agentic-opportunity", "intelligence-architecture", "agent-engineering", "agent-os-runtime", "agent-network", "capability-access", "plan", "design-dna", "decompose", "execute", "review", "ship", "learn"];
  const index = order.indexOf(phase);
  return index >= 0 && index < order.length - 1 ? order[index + 1] : null;
}

if (!existsSync(statePath)) {
  console.log(JSON.stringify({
    ok: false,
    next_action: "Bootstrap Codex Brain state for this project.",
    recommended_workflow: "bootstrap",
    blocked_actions: ["planning", "implementation", "shipping"],
    reason: `Missing state file: ${statePath}`
  }, null, 2));
  process.exit(0);
}

const state = readJson(statePath);
const phase = state.phase || "classify";
const mode = state.mode || "pending";
const gateName = gateByPhase[phase] || phase;
const gate = state.gates?.[gateName] || {};
const requiredArtifacts = gate.required_artifacts || [];
const missingArtifacts = Array.from(new Set([
  ...(gate.missing || []),
  ...requiredArtifacts.filter((artifact) => !pathExists(artifact))
]));

const workflow = workflowForPhase(phase, mode);
const blocked = new Set(workflow?.blocked_actions || []);
const allowed = new Set(workflow?.allowed_actions || []);
const warnings = [];

if (state.design_dna?.required && !state.design_dna.frontend_unblocked) {
  blocked.add("frontend implementation");
  blocked.add("styling");
  blocked.add("animations");
  warnings.push("Design DNA is required and frontend remains blocked.");
}

if (mode === "pending") {
  blocked.add("implementation");
  blocked.add("architecture lock-in");
}

let nextAction;
let recommendedWorkflow = workflow?.id || null;
let userApprovalNeeded = Boolean(workflow?.approval_required);

if (phase === "classify" && mode === "pending") {
  nextAction = "Classify the project and get user approval for Standard or Full mode.";
} else if (missingArtifacts.length > 0) {
  nextAction = `Create or update missing artifact: ${missingArtifacts[0]}`;
} else if (gate.approved === false || gate.status !== "complete") {
  nextAction = `Review and approve the ${gateName} gate.`;
  userApprovalNeeded = true;
} else {
  const next = nextPhase(phase);
  if (next) {
    const nextWorkflow = workflowForPhase(next, mode);
    recommendedWorkflow = nextWorkflow?.id || recommendedWorkflow;
    nextAction = `Move to ${next} phase.`;
  } else {
    nextAction = "Project lifecycle is complete. Capture and promote lessons.";
  }
}

console.log(JSON.stringify({
  ok: true,
  project: state.project,
  mode,
  phase,
  gate: {
    name: gateName,
    status: gate.status || "unknown",
    approved: Boolean(gate.approved),
    required_artifacts: requiredArtifacts,
    missing: missingArtifacts
  },
  recommended_workflow: recommendedWorkflow,
  next_action: nextAction,
  user_approval_needed: userApprovalNeeded,
  allowed_actions: Array.from(allowed),
  blocked_actions: Array.from(blocked),
  warnings
}, null, 2));

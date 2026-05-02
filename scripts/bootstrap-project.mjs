#!/usr/bin/env node
import { existsSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { copyTemplate, parseArgs, readJson, today, writeJson } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const project = args.project || args.name || args._[0];
if (!project) {
  console.error("Usage: node scripts/bootstrap-project.mjs --project <name> [--dir <path>] [--mode light|standard|full|auto]");
  process.exit(1);
}

const root = resolve(args.dir || process.cwd());
const brainRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const codexDir = join(root, ".codex-brain");
const mode = args.mode || "auto";

mkdirSync(codexDir, { recursive: true });
mkdirSync(join(codexDir, "lessons"), { recursive: true });
mkdirSync(join(codexDir, "task-records"), { recursive: true });
mkdirSync(join(codexDir, "research"), { recursive: true });
mkdirSync(join(root, "docs", "prd"), { recursive: true });
mkdirSync(join(root, "design", "references"), { recursive: true });

const statePath = join(codexDir, "state.json");
if (!existsSync(statePath)) {
  const state = readJson(join(brainRoot, "templates", "shared", "project-state.template.json"));
  state.project = project;
  state.phase_status = "in-progress";
  if (mode !== "auto") {
    state.mode = mode;
    state.gates.classification.status = "complete";
    state.gates.classification.missing = [];
    state.gates.classification.approved = true;
  }
  writeJson(statePath, state);
}

const classificationPath = join(codexDir, "classification.json");
if (!existsSync(classificationPath)) {
  const classification = readJson(join(brainRoot, "templates", "shared", "classification.template.json"));
  classification.project = project;
  classification.date = today();
  if (mode !== "auto") {
    classification.recommended_mode = mode;
    classification.approved_mode = mode;
    classification.user_approved = true;
    classification.confidence = 1;
    classification.reasons = [`Mode set explicitly during bootstrap: ${mode}.`];
  }
  writeJson(classificationPath, classification);
}

const designPath = join(root, "design", "design-dna.md");
if (!existsSync(designPath)) {
  copyTemplate(join(brainRoot, "templates", "shared", "design-dna.template.md"), designPath, {
    "[Project Name]": project
  });
}

const prdPath = join(root, "docs", "prd", "prd-001.template.md");
if (!existsSync(prdPath)) {
  copyTemplate(join(brainRoot, "templates", "shared", "prd.template.md"), prdPath);
}

console.log(`Codex Brain bootstrapped for ${project}`);
console.log(`State: ${statePath}`);
console.log("Next: classify the project and approve Light, Standard, or Full mode.");

#!/usr/bin/env node
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { listFilesRecursive, readJson } from "./lib.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const required = [
  "README.md",
  "CODEX.md",
  "USAGE-GUIDE.md",
  "frameworks/lifecycle.md",
  "frameworks/research-deep-methodology.md",
  "frameworks/build-plan-deep-methodology.md",
  "frameworks/rigor-modes.md",
  "frameworks/design-dna.md",
  "frameworks/frontend-visual-qa.md",
  "frameworks/quality-gate-matrix.md",
  "frameworks/narrative-validation.md",
  "frameworks/governance-and-evolution.md",
  "frameworks/learning-loop.md",
  "schemas/project-state.schema.json",
  "schemas/project-classification.schema.json",
  "schemas/lesson.schema.json",
  "schemas/full-mode-coverage-catalog.schema.json",
  "catalogs/full-mode-coverage-catalog.json",
  "templates/shared/project-state.template.json",
  "templates/full/master-build-plan.template.md",
  "templates/full/evidence-ledger.template.json",
  "templates/full/research-category.template.md",
  "templates/full/frontend-visual-qa.template.md",
  "templates/full/postmortem.template.md",
  "templates/full/mode-downgrade-record.template.md",
  "scripts/classify-project.mjs",
  "scripts/bootstrap-project.mjs",
  "scripts/validate-state.mjs",
  "scripts/capture-lesson.mjs"
];

const missing = required.filter((path) => !existsSync(join(root, path)));
const jsonFiles = listFilesRecursive(join(root, "schemas")).concat(listFilesRecursive(join(root, "templates")).filter((p) => p.endsWith(".json")));
const jsonErrors = [];

for (const file of jsonFiles) {
  try {
    readJson(file);
  } catch (error) {
    jsonErrors.push(`${file}: ${error.message}`);
  }
}

const ok = missing.length === 0 && jsonErrors.length === 0;
console.log(JSON.stringify({ ok, missing, jsonErrors }, null, 2));
process.exit(ok ? 0 : 1);

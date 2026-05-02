#!/usr/bin/env node
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { listFilesRecursive, readJson } from "./lib.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const required = [
  "README.md",
  "CODEX.md",
  "frameworks/lifecycle.md",
  "frameworks/research-deep-methodology.md",
  "frameworks/build-plan-deep-methodology.md",
  "frameworks/rigor-modes.md",
  "frameworks/design-dna.md",
  "frameworks/quality-gate-matrix.md",
  "frameworks/narrative-validation.md",
  "frameworks/learning-loop.md",
  "schemas/project-state.schema.json",
  "schemas/project-classification.schema.json",
  "schemas/lesson.schema.json",
  "templates/shared/project-state.template.json",
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

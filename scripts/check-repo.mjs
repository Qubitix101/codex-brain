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
  "frameworks/competitive-benchmark.md",
  "frameworks/context-routing-and-help.md",
  "frameworks/quick-flow.md",
  "frameworks/vertical-slice-planning.md",
  "frameworks/context-distillation.md",
  "frameworks/test-architecture.md",
  "frameworks/project-context.md",
  "frameworks/expert-councils.md",
  "frameworks/skill-workflow-architecture.md",
  "schemas/project-state.schema.json",
  "schemas/project-classification.schema.json",
  "schemas/lesson.schema.json",
  "schemas/full-mode-coverage-catalog.schema.json",
  "schemas/workflow-manifest.schema.json",
  "schemas/session-brief.schema.json",
  "catalogs/full-mode-coverage-catalog.json",
  "catalogs/workflow-manifest.json",
  "workflows/README.md",
  "workflows/context-routing/step-01-load-state.md",
  "workflows/context-routing/step-02-compute-next-action.md",
  "workflows/context-routing/step-03-report-brief.md",
  "workflows/quick-flow/step-01-clarify.md",
  "workflows/quick-flow/step-02-write-quick-spec.md",
  "workflows/quick-flow/step-03-implement-slice.md",
  "workflows/quick-flow/step-04-verify.md",
  "workflows/quick-flow/step-05-learn.md",
  "workflows/full-mode-readiness/step-01-research-gate.md",
  "workflows/full-mode-readiness/step-02-build-plan-gate.md",
  "workflows/full-mode-readiness/step-03-execution-readiness.md",
  "templates/shared/project-state.template.json",
  "templates/shared/project-context.template.md",
  "templates/shared/distillate.template.md",
  "templates/shared/memory/project-brief.template.md",
  "templates/shared/memory/product-context.template.md",
  "templates/shared/memory/system-patterns.template.md",
  "templates/shared/memory/tech-context.template.md",
  "templates/shared/memory/active-context.template.md",
  "templates/shared/memory/progress.template.md",
  "templates/light/quick-spec.template.md",
  "templates/full/master-build-plan.template.md",
  "templates/full/evidence-ledger.template.json",
  "templates/full/research-category.template.md",
  "templates/full/frontend-visual-qa.template.md",
  "templates/full/postmortem.template.md",
  "templates/full/mode-downgrade-record.template.md",
  "templates/full/test-strategy.template.md",
  "templates/full/traceability-matrix.template.md",
  "scripts/classify-project.mjs",
  "scripts/bootstrap-project.mjs",
  "scripts/validate-state.mjs",
  "scripts/capture-lesson.mjs",
  "scripts/next-action.mjs",
  "scripts/session-brief.mjs",
  "scripts/verify-plan.mjs",
  "scripts/distill-context.mjs"
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

#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readJson } from "./lib.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const catalogPath = join(root, "catalogs", "full-mode-coverage-catalog.json");
const catalog = readJson(catalogPath);

const requiredFiles = [
  "frameworks/research-deep-methodology.md",
  "frameworks/build-plan-deep-methodology.md",
  "frameworks/quality-gate-matrix.md",
  "frameworks/design-dna.md",
  "frameworks/database-scale.md",
  "frameworks/security-gdpr.md",
  "frameworks/narrative-validation.md",
  "templates/full/master-build-plan.template.md",
  "templates/full/research-matrix.template.md",
  "templates/full/build-plan-checklist.template.md",
  "templates/full/evidence-ledger.template.json",
  "templates/full/adr.template.md",
  "templates/full/promise-to-spec-audit.template.md"
];

const corpusFiles = requiredFiles.filter((file) => file.endsWith(".md"));
const corpus = corpusFiles
  .map((file) => (existsSync(join(root, file)) ? readFileSync(join(root, file), "utf8") : ""))
  .join("\n")
  .toLowerCase();

const missingFiles = requiredFiles.filter((file) => !existsSync(join(root, file)));
const domainFailures = [];

for (const domain of catalog.domains) {
  const terms = [
    domain.id,
    domain.name,
    ...domain.required_questions.slice(0, 3),
    ...domain.p0_blockers.slice(0, 2)
  ]
    .map((term) => term.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim())
    .filter(Boolean);

  const hits = terms.filter((term) => {
    const words = term.split(" ").filter((word) => word.length > 3);
    return words.length === 0 || words.every((word) => corpus.includes(word));
  });

  if (hits.length < Math.min(3, terms.length)) {
    domainFailures.push({
      id: domain.id,
      name: domain.name,
      hits: hits.length,
      checked: terms.length
    });
  }
}

const requiredConcepts = [
  "multi-tenancy",
  "tenant isolation",
  "gdpr",
  "lawful basis",
  "database adr",
  "scale model",
  "design dna",
  "accessibility",
  "ai orchestration",
  "eval",
  "billing edge",
  "observability",
  "rollback",
  "promise-to-spec",
  "evidence ledger",
  "threat model",
  "authorization matrix",
  "retention",
  "deletion",
  "subprocessor"
];

const missingConcepts = requiredConcepts.filter((concept) => !corpus.includes(concept));

const ok = missingFiles.length === 0 && domainFailures.length === 0 && missingConcepts.length === 0;
console.log(JSON.stringify({
  ok,
  domain_count: catalog.domains.length,
  missingFiles,
  domainFailures,
  missingConcepts
}, null, 2));

process.exit(ok ? 0 : 1);

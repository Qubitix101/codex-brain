#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const files = args._.map((file) => resolve(file));

if (files.length === 0) {
  console.error("Usage: node scripts/verify-plan.mjs <plan-or-prd.md> [...]");
  process.exit(1);
}

const broadTaskPatterns = [
  /\bbuild (the )?(whole|entire|full)\b/i,
  /\bbuild dashboard\b/i,
  /\bimplement auth system\b/i,
  /\bimprove security\b/i,
  /\bpolish ui\b/i,
  /\bbackend work\b/i,
  /\bfrontend work\b/i
];

function analyze(file) {
  if (!existsSync(file)) {
    return { file, ok: false, errors: [`Missing file: ${file}`], warnings: [] };
  }

  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  const errors = [];
  const warnings = [];
  let checkboxCount = 0;
  let uncheckedCount = 0;
  let acceptanceHeadings = 0;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^#{2,4}\s+Acceptance Criteria/i.test(line)) acceptanceHeadings += 1;
    if (!/^\s*-\s+\[[ xX]\]/.test(line)) continue;

    checkboxCount += 1;
    if (/^\s*-\s+\[\s\]/.test(line)) uncheckedCount += 1;

    const block = [line];
    for (let lookahead = index + 1; lookahead < Math.min(lines.length, index + 8); lookahead += 1) {
      if (/^\s*-\s+\[[ xX]\]/.test(lines[lookahead])) break;
      block.push(lines[lookahead]);
    }
    const blockText = block.join("\n");
    const hasVerification = /\b(verify|verification|test|command|acceptance|expected|assert|screenshot|e2e|unit|integration)\b/i.test(blockText);

    if (!hasVerification) {
      errors.push(`Line ${index + 1}: checkbox has no verification hint.`);
    }

    if (broadTaskPatterns.some((pattern) => pattern.test(line))) {
      warnings.push(`Line ${index + 1}: task may be too broad: ${line.trim()}`);
    }
  }

  if (checkboxCount === 0) warnings.push("No task checkboxes found.");
  if (acceptanceHeadings === 0) warnings.push("No Acceptance Criteria heading found.");

  return {
    file,
    ok: errors.length === 0,
    checkbox_count: checkboxCount,
    unchecked_count: uncheckedCount,
    errors,
    warnings
  };
}

const reports = files.map(analyze);
const ok = reports.every((report) => report.ok);
console.log(JSON.stringify({ ok, reports }, null, 2));
process.exit(ok ? 0 : 1);


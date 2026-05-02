#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { parseArgs, listFilesRecursive, today } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const root = resolve(args.dir || process.cwd());
const output = resolve(args.output || join(root, ".codex-brain", "distillates", "manual-distillate.md"));
const inputs = args._;

if (inputs.length === 0) {
  console.error("Usage: node scripts/distill-context.mjs [--output <path>] <file-or-dir> [...]");
  process.exit(1);
}

const keywords = [
  "decision",
  "constraint",
  "risk",
  "blocker",
  "must",
  "forbidden",
  "gdpr",
  "security",
  "database",
  "tenant",
  "scale",
  "design dna",
  "test",
  "rollback",
  "observability",
  "ai",
  "eval",
  "accepted",
  "rejected"
];

function sourceFiles(input) {
  const path = resolve(root, input);
  if (!existsSync(path)) return [];
  const stat = statSync(path);
  if (stat.isDirectory()) {
    return listFilesRecursive(path).filter((file) => file.endsWith(".md") || file.endsWith(".json"));
  }
  return [path];
}

const files = Array.from(new Set(inputs.flatMap(sourceFiles)));
const sections = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  const kept = [];
  let currentHeading = "";

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (/^#{1,4}\s+/.test(line)) {
      currentHeading = line.replace(/^#+\s+/, "");
      kept.push(`- Heading: ${currentHeading}`);
      continue;
    }
    const lower = line.toLowerCase();
    const keywordHit = keywords.some((keyword) => lower.includes(keyword));
    const bullet = /^[-*]\s+/.test(line);
    if (keywordHit || bullet) {
      kept.push(`- ${currentHeading ? `${currentHeading}: ` : ""}${line.replace(/^[-*]\s+/, "")}`);
    }
  }

  sections.push({
    file: relative(root, file),
    kept
  });
}

const body = [
  "---",
  "type: codex-brain-distillate",
  `created: ${today()}`,
  "consumer: general",
  "status: generated",
  "sources:",
  ...files.map((file) => `  - ${relative(root, file)}`),
  "---",
  "",
  "# Context Distillate",
  "",
  "This generated distillate is a starting point. For Full-mode work, review it against the source artifacts before treating it as complete.",
  "",
  ...sections.flatMap((section) => [
    `## ${section.file}`,
    "",
    ...(section.kept.length ? section.kept : ["- No high-signal lines extracted."]),
    ""
  ])
].join("\n");

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${body.trim()}\n`);
console.log(JSON.stringify({ ok: true, output, sources: files.length }, null, 2));


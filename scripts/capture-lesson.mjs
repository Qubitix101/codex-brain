#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { parseArgs, readJson, slugify, today, writeJson } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const root = resolve(args.dir || process.cwd());
const project = args.project || (existsSync(join(root, ".codex-brain", "state.json")) ? readJson(join(root, ".codex-brain", "state.json")).project : "unknown-project");
const lesson = args.lesson || args._.join(" ");

if (!lesson) {
  console.error("Usage: node scripts/capture-lesson.mjs --lesson \"what we learned\" --category security --severity high");
  process.exit(1);
}

const category = args.category || "other";
const severity = args.severity || "medium";
const slug = slugify(lesson).slice(0, 48) || "lesson";
const id = `lesson_${today().replaceAll("-", "")}_${slug}`;
const path = join(root, ".codex-brain", "lessons", `${id}.json`);

const payload = {
  id,
  date: today(),
  source_project: project,
  category,
  severity,
  trigger: args.trigger || "Captured during Codex Brain session.",
  lesson,
  rule: args.rule || "Review this lesson when similar project conditions appear.",
  applies_to: String(args.appliesTo || "standard,full").split(",").map((s) => s.trim()).filter(Boolean),
  confidence: Number(args.confidence || 0.6),
  promote_to: String(args.promoteTo || "framework").split(",").map((s) => s.trim()).filter(Boolean),
  evidence: args.evidence ? [args.evidence] : [],
  status: "captured"
};

writeJson(path, payload);
console.log(`Captured lesson: ${path}`);


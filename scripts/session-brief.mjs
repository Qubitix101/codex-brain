#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { parseArgs, readJson, listFilesRecursive } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const root = resolve(args.dir || process.cwd());
const statePath = join(root, ".codex-brain", "state.json");

function readIfExists(path) {
  return existsSync(path) ? readFileSync(path, "utf8").trim() : "";
}

function checkboxProgress(file) {
  const text = readFileSync(file, "utf8");
  const total = (text.match(/^\s*-\s+\[[ xX]\]/gm) || []).length;
  const done = (text.match(/^\s*-\s+\[[xX]\]/gm) || []).length;
  return { file: relative(root, file), done, total };
}

if (!existsSync(statePath)) {
  console.log("No Codex Brain state found. Run bootstrap first.");
  process.exit(0);
}

const state = readJson(statePath);
const memoryDir = join(root, ".codex-brain", "memory");
const memoryFiles = existsSync(memoryDir)
  ? listFilesRecursive(memoryDir).map((file) => relative(root, file))
  : [];

const planFiles = []
  .concat(existsSync(join(root, "docs", "prd")) ? listFilesRecursive(join(root, "docs", "prd")) : [])
  .concat(existsSync(join(root, "docs", "plans")) ? listFilesRecursive(join(root, "docs", "plans")) : [])
  .filter((file) => file.endsWith(".md"))
  .map(checkboxProgress)
  .filter((progress) => progress.total > 0);

const activeContext = readIfExists(join(memoryDir, "active-context.md"));
const progress = readIfExists(join(memoryDir, "progress.md"));

const brief = {
  project: state.project,
  mode: state.mode,
  phase: state.phase,
  phase_status: state.phase_status,
  current_task: state.current_task || {},
  design_dna: state.design_dna || {},
  memory_files: memoryFiles,
  plan_progress: planFiles,
  active_context_excerpt: activeContext.split("\n").slice(0, 12).join("\n"),
  progress_excerpt: progress.split("\n").slice(0, 12).join("\n")
};

if (args.json) {
  console.log(JSON.stringify(brief, null, 2));
} else {
  console.log(`# Session Brief: ${brief.project}`);
  console.log("");
  console.log(`- Mode: ${brief.mode}`);
  console.log(`- Phase: ${brief.phase} (${brief.phase_status})`);
  console.log(`- Current task: ${brief.current_task.id || "none"}`);
  console.log(`- Design DNA: ${brief.design_dna.status || "unknown"}`);
  console.log("");
  console.log("## Plan Progress");
  if (planFiles.length === 0) {
    console.log("- No PRD/plan checkboxes found.");
  } else {
    for (const item of planFiles) {
      console.log(`- ${item.file}: ${item.done}/${item.total}`);
    }
  }
  console.log("");
  console.log("## Active Context");
  console.log(brief.active_context_excerpt || "- No active context yet.");
  console.log("");
  console.log("## Progress");
  console.log(brief.progress_excerpt || "- No progress memory yet.");
}


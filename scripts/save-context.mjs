#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { collectContextHealth, inspectGit, many, one, parseRepeatedArgs, timestampId } from "./context-utils.mjs";
import { readJson, writeJson } from "./lib.mjs";

const args = parseRepeatedArgs(process.argv.slice(2));
const root = resolve(one(args, "dir", process.cwd()));
const codexDir = join(root, ".codex-brain");
const statePath = join(codexDir, "state.json");

const summary = one(args, "summary", args._.join(" ").trim());
const nextAction = one(args, "next", one(args, "next-action", ""));

if (!existsSync(statePath)) {
  console.error(`Missing state file: ${statePath}`);
  process.exit(1);
}

if (!summary || !nextAction) {
  console.error([
    "Usage: node scripts/save-context.mjs --dir <project> --summary \"what happened\" --next \"next allowed action\"",
    "Optional repeated fields: --completed, --decision, --check, --blocker, --risk, --lesson, --artifact, --file"
  ].join("\n"));
  process.exit(1);
}

const state = readJson(statePath);
const now = new Date();
const stamp = timestampId(now);
const id = `session_${stamp}`;
const sessionsDir = join(codexDir, "sessions");
const memoryDir = join(codexDir, "memory");
mkdirSync(sessionsDir, { recursive: true });
mkdirSync(memoryDir, { recursive: true });

const git = inspectGit(root);
const filesChanged = Array.from(new Set([
  ...many(args, "file"),
  ...git.changed_files
]));

const sessionPath = join(sessionsDir, `${id}.json`);
const relativeSessionPath = relative(root, sessionPath);

const session = {
  id,
  timestamp: now.toISOString(),
  project: state.project || "unknown-project",
  mode: state.mode || "pending",
  phase: one(args, "phase", state.phase || "classify"),
  phase_status: one(args, "phase-status", state.phase_status || "in-progress"),
  summary,
  completed: many(args, "completed"),
  decisions: many(args, "decision"),
  files_changed: filesChanged,
  artifacts_updated: many(args, "artifact"),
  checks_run: many(args, "check"),
  blockers: many(args, "blocker"),
  risks: many(args, "risk"),
  next_action: nextAction,
  lessons: many(args, "lesson"),
  context_updates: {
    state: true,
    active_context: true,
    progress: true,
    project_context: Boolean(args["project-context-updated"]),
    distillates: Boolean(args["distillate-updated"])
  },
  context_health: {
    ok: false,
    score: 0,
    warnings: ["Context health is computed after writing session files."]
  },
  git: {
    available: git.available,
    branch: git.branch,
    status_short: git.status_short
  },
  state_snapshot: {
    mode: state.mode,
    phase: state.phase,
    phase_status: state.phase_status,
    current_task: state.current_task || null,
    design_dna: state.design_dna || null,
    gates: state.gates || null
  }
};

writeJson(sessionPath, session);

function bulletList(items, empty = "- None") {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : empty;
}

function writeActiveContext() {
  const content = [
    "# Active Context",
    "",
    `Last saved: ${session.timestamp}`,
    `Session: ${relativeSessionPath}`,
    "",
    "## Current Focus",
    "",
    `- ${session.summary}`,
    "",
    "## Current Phase",
    "",
    `- Mode: ${session.mode}`,
    `- Phase: ${session.phase}`,
    `- Phase status: ${session.phase_status}`,
    "",
    "## Active Decisions",
    "",
    bulletList(session.decisions),
    "",
    "## Blockers",
    "",
    bulletList(session.blockers),
    "",
    "## Risks",
    "",
    bulletList(session.risks),
    "",
    "## Next Allowed Action",
    "",
    `- ${session.next_action}`,
    ""
  ].join("\n");
  writeFileSync(join(memoryDir, "active-context.md"), content);
}

function sessionLinks(limit = 20) {
  const files = readdirSync(sessionsDir)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .slice(-limit)
    .reverse();
  return files.map((file) => `- ${file}`);
}

function writeProgress() {
  const content = [
    "# Progress",
    "",
    `Last saved: ${session.timestamp}`,
    "",
    "## Latest Session",
    "",
    `- ${session.summary}`,
    "",
    "## Completed Recently",
    "",
    bulletList(session.completed),
    "",
    "## Checks Run",
    "",
    bulletList(session.checks_run),
    "",
    "## Files Changed",
    "",
    bulletList(session.files_changed),
    "",
    "## Next",
    "",
    `- ${session.next_action}`,
    "",
    "## Recent Session Records",
    "",
    bulletList(sessionLinks(), "- No session records."),
    ""
  ].join("\n");
  writeFileSync(join(memoryDir, "progress.md"), content);
}

writeActiveContext();
writeProgress();

state.context = {
  ...(state.context || {}),
  last_session_id: id,
  last_session_path: relativeSessionPath,
  last_saved_at: session.timestamp,
  last_summary: session.summary,
  last_next_action: session.next_action,
  last_context_health_score: null,
  unsaved_changes: false
};

if (args.phase) state.phase = session.phase;
if (args["phase-status"]) state.phase_status = session.phase_status;

writeJson(statePath, state);

const health = collectContextHealth(root);
session.context_health = {
  ok: health.ok,
  score: health.score,
  warnings: health.warnings
};
writeJson(sessionPath, session);

state.context.last_context_health_score = health.score;
state.context.last_context_health_ok = health.ok;
writeJson(statePath, state);

console.log(JSON.stringify({
  ok: true,
  session: sessionPath,
  project: session.project,
  mode: session.mode,
  phase: session.phase,
  next_action: session.next_action,
  context_health: session.context_health,
  files_changed_count: session.files_changed.length,
  git_branch: git.branch
}, null, 2));

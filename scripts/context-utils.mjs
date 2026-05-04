import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { readJson } from "./lib.mjs";

export function parseRepeatedArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      out._.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const next = argv[i + 1];
    const value = !next || next.startsWith("--") ? true : next;
    if (value !== true) i += 1;
    if (out[key] === undefined) {
      out[key] = value;
    } else if (Array.isArray(out[key])) {
      out[key].push(value);
    } else {
      out[key] = [out[key], value];
    }
  }
  return out;
}

export function one(args, key, fallback = "") {
  const value = args[key];
  if (Array.isArray(value)) return value[0] ?? fallback;
  if (value === true || value === undefined || value === null) return fallback;
  return value;
}

export function many(args, key) {
  const value = args[key];
  if (value === undefined || value === null || value === true) return [];
  return (Array.isArray(value) ? value : [value])
    .flatMap((item) => String(item).split("\n"))
    .map((item) => item.trim())
    .filter(Boolean);
}

export function timestampId(date = new Date()) {
  return date.toISOString().replace(/[-:.]/g, "").replace("T", "_").replace("Z", "");
}

export function latestSessionPath(root) {
  const sessionsDir = join(root, ".codex-brain", "sessions");
  if (!existsSync(sessionsDir)) return null;
  const sessions = readdirSync(sessionsDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => join(sessionsDir, file))
    .filter((file) => statSync(file).isFile())
    .sort();
  return sessions.at(-1) || null;
}

export function inspectGit(root) {
  const branch = spawnSync("git", ["-C", root, "branch", "--show-current"], {
    encoding: "utf8"
  });
  const status = spawnSync("git", ["-C", root, "status", "--short"], {
    encoding: "utf8"
  });
  const available = branch.status === 0 && status.status === 0;
  const statusShort = available
    ? status.stdout.split(/\r?\n/).map((line) => line.trimEnd()).filter(Boolean)
    : [];

  return {
    available,
    branch: available ? branch.stdout.trim() || null : null,
    status_short: statusShort,
    changed_files: statusShort
      .map((line) => line.slice(3).trim())
      .filter(Boolean)
  };
}

export function collectContextHealth(root) {
  const warnings = [];
  const checks = [];

  function check(path, label) {
    const ok = existsSync(join(root, path));
    checks.push({ path, label, ok });
    if (!ok) warnings.push(`Missing ${label}: ${path}`);
    return ok;
  }

  const hasState = check(".codex-brain/state.json", "project state");
  check("CODEX.md", "local Codex instruction");
  check(".codex-brain/project-context.md", "project context");
  check(".codex-brain/memory/active-context.md", "active context");
  check(".codex-brain/memory/progress.md", "progress memory");
  check(".codex-brain/sessions", "sessions directory");

  const latestSession = latestSessionPath(root);
  if (!latestSession) {
    warnings.push("No session records found in .codex-brain/sessions.");
    checks.push({ path: ".codex-brain/sessions/*.json", label: "latest session", ok: false });
  } else {
    checks.push({ path: latestSession, label: "latest session", ok: true });
  }

  let state = null;
  if (hasState) {
    try {
      state = readJson(join(root, ".codex-brain", "state.json"));
      if (!state.context?.last_next_action) {
        warnings.push("state.context.last_next_action is missing.");
        checks.push({ path: ".codex-brain/state.json#context.last_next_action", label: "next action", ok: false });
      } else {
        checks.push({ path: ".codex-brain/state.json#context.last_next_action", label: "next action", ok: true });
      }
    } catch (error) {
      warnings.push(`State JSON could not be parsed: ${error.message}`);
      checks.push({ path: ".codex-brain/state.json", label: "state JSON parse", ok: false });
    }
  }

  const passed = checks.filter((item) => item.ok).length;
  const score = checks.length === 0 ? 0 : Number((passed / checks.length).toFixed(3));

  return {
    ok: warnings.length === 0,
    score,
    warnings,
    checks,
    latest_session: latestSession,
    state_summary: state ? {
      project: state.project,
      mode: state.mode,
      phase: state.phase,
      phase_status: state.phase_status,
      last_session_id: state.context?.last_session_id || null,
      last_next_action: state.context?.last_next_action || null
    } : null
  };
}


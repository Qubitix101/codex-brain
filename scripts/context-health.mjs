#!/usr/bin/env node
import { resolve } from "node:path";
import { collectContextHealth, one, parseRepeatedArgs } from "./context-utils.mjs";

const args = parseRepeatedArgs(process.argv.slice(2));
const root = resolve(one(args, "dir", process.cwd()));
const health = collectContextHealth(root);

console.log(JSON.stringify({
  ok: health.ok,
  score: health.score,
  warnings: health.warnings,
  latest_session: health.latest_session,
  state_summary: health.state_summary,
  checks: health.checks
}, null, 2));

process.exit(health.ok ? 0 : 1);


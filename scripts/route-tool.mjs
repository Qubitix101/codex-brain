#!/usr/bin/env node
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs, readJson } from "./lib.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const args = parseArgs(process.argv.slice(2));
const task = String(args.task || args._.join(" ")).trim();

if (!task) {
  console.error("Usage: npm run route-tool -- --task \"inspect the last failed GitHub Actions run\"");
  process.exit(1);
}

const matrix = readJson(join(root, "catalogs", "tool-surface-routing-matrix.json"));
const taskLower = task.toLowerCase();

function keywordHits(rule) {
  return (rule.keywords || []).filter((keyword) => taskLower.includes(String(keyword).toLowerCase()));
}

const ranked = matrix.rules
  .map((rule) => {
    const hits = keywordHits(rule);
    return {
      rule,
      hits,
      score: hits.reduce((total, hit) => total + Math.max(1, hit.split(/\s+/).length), 0)
    };
  })
  .filter((entry) => entry.score > 0)
  .sort((a, b) => b.score - a.score || a.rule.id.localeCompare(b.rule.id));

const best = ranked[0];

if (!best) {
  console.log(JSON.stringify({
    ok: true,
    task,
    recommendation: "manual_decision_required",
    reason: "No routing rule matched strongly. Apply the decision order from the routing matrix.",
    decision_order: matrix.decision_order,
    available_surfaces: matrix.surfaces.map((surface) => ({
      id: surface.id,
      name: surface.name,
      best_for: surface.best_for
    }))
  }, null, 2));
  process.exit(0);
}

const confidence = Math.min(0.95, 0.45 + best.score * 0.08);
const surface = matrix.surfaces.find((item) => item.id === best.rule.preferred_surface);

console.log(JSON.stringify({
  ok: true,
  task,
  recommended_surface: best.rule.preferred_surface,
  recommended_tool: best.rule.specific_tool || null,
  surface_name: surface?.name || best.rule.preferred_surface,
  confidence,
  matched_rule: best.rule.id,
  matched_keywords: best.hits,
  why: best.rule.why,
  alternates: best.rule.alternates || [],
  verify_with: best.rule.verify_with || [],
  context_budget_note: best.rule.preferred_surface === "mcp_connector"
    ? "Use the smallest available toolset, read-only mode when possible, and avoid loading broad write surfaces unless needed."
    : "Prefer this surface unless auth, governance, rendering, or production runtime requirements change the task.",
  decision_order: matrix.decision_order
}, null, 2));

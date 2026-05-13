#!/usr/bin/env node
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs, readJson } from "./lib.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const args = parseArgs(process.argv.slice(2));
const brief = String(args.brief || args._.join(" ")).trim();
const mode = String(args.mode || "standard").toLowerCase();
const markdown = Boolean(args.markdown);

if (!brief) {
  console.error("Usage: npm run plan-capabilities -- --brief \"AI video app with payments\" --mode full --markdown");
  process.exit(1);
}

const catalog = readJson(join(root, "catalogs", "capability-access-catalog.json"));
const briefLower = brief.toLowerCase();

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function keywordMatches(text, keyword) {
  const pattern = escapeRegex(String(keyword).toLowerCase().trim()).replace(/\\ /g, "\\s+");
  return new RegExp(`(^|[^a-z0-9])${pattern}($|[^a-z0-9])`).test(text);
}

function scoreCapability(capability) {
  const hits = (capability.keywords || []).filter((keyword) => keywordMatches(briefLower, keyword));
  const score = hits.reduce((total, hit) => total + Math.max(1, hit.split(/\s+/).length), 0);
  return { capability, hits, score };
}

const rows = catalog.capabilities
  .map(scoreCapability)
  .filter(({ capability, score }) => {
    if (capability.always_consider) return true;
    if (score > 0) return true;
    return mode === "full";
  })
  .sort((a, b) => {
    const aAlways = a.capability.always_consider ? 1 : 0;
    const bAlways = b.capability.always_consider ? 1 : 0;
    return b.score - a.score || bAlways - aAlways || a.capability.name.localeCompare(b.capability.name);
  });

const planned = rows.map(({ capability, hits, score }) => ({
  id: capability.id,
  name: capability.name,
  match_score: score,
  matched_keywords: hits,
  criticality: capability.always_consider || score > 0 ? "consider_now" : "full_mode_review",
  production_surfaces: capability.production_surfaces,
  agent_surfaces: capability.agent_surfaces,
  required_access: capability.required_access,
  readiness_questions: capability.readiness_questions,
  mock_strategy: capability.mock_strategy,
  risks: capability.risks
}));

if (!markdown) {
  console.log(JSON.stringify({
    ok: true,
    mode,
    brief,
    catalog_version: catalog.version,
    artifact_to_create: "docs/capability-access-map.md",
    capabilities: planned,
    next_step: "Fill templates/shared/capability-access-map.template.md after intelligence architecture, agent-engineering, skill, and Agent OS runtime requirements are known; ask the user only for required-now access."
  }, null, 2));
  process.exit(0);
}

const lines = [];
lines.push(`# Capability and Access Starter Map`);
lines.push("");
lines.push(`- Mode: ${mode}`);
lines.push(`- Brief: ${brief}`);
lines.push(`- Target artifact: docs/capability-access-map.md`);
lines.push("");
lines.push("## Capabilities To Consider");
lines.push("");

for (const item of planned) {
  lines.push(`### ${item.name}`);
  lines.push("");
  lines.push(`- Criticality: ${item.criticality}`);
  lines.push(`- Matched keywords: ${item.matched_keywords.length ? item.matched_keywords.join(", ") : "none; included by mode/baseline"}`);
  lines.push(`- Product runtime surfaces: ${item.production_surfaces.join(", ")}`);
  lines.push(`- Agent implementation surfaces: ${item.agent_surfaces.join(", ")}`);
  lines.push(`- Required access: ${item.required_access.join(", ")}`);
  lines.push(`- Mock strategy: ${item.mock_strategy}`);
  lines.push(`- Main risks: ${item.risks.join(", ")}`);
  lines.push("");
  lines.push("Readiness questions:");
  for (const question of item.readiness_questions) {
    lines.push(`- ${question}`);
  }
  lines.push("");
}

lines.push("## Next Step");
lines.push("");
lines.push("Create `docs/capability-access-map.md` after `docs/intelligence-architecture-decision.md`, `docs/agent-engineering-audit.md`, `docs/skill-inventory.md`, and `docs/agent-os-runtime-plan.md` are complete when relevant. Mark each capability required/mockable/deferred/not applicable, then ask the user only for the required-now credentials, accounts, scopes, or setup information.");

console.log(lines.join("\n"));

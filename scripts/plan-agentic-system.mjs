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
  console.error("Usage: npm run plan-agentic-system -- --brief \"LinkedIn content OS with memory and approvals\" --mode full --markdown");
  process.exit(1);
}

const catalog = readJson(join(root, "catalogs", "agentic-system-patterns.json"));
const briefLower = brief.toLowerCase();

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function keywordMatches(text, keyword) {
  const pattern = escapeRegex(String(keyword).toLowerCase().trim()).replace(/\\ /g, "\\s+");
  return new RegExp(`(^|[^a-z0-9])${pattern}($|[^a-z0-9])`).test(text);
}

function hitsFor(items = []) {
  return items.filter((item) => keywordMatches(briefLower, item));
}

const levelMatches = catalog.maturity_levels.map((level) => {
  const hits = hitsFor(level.signals);
  return {
    id: level.id,
    name: level.name,
    description: level.description,
    hits,
    score: hits.reduce((total, hit) => total + Math.max(1, hit.split(/\s+/).length), 0),
    requires: level.requires,
    avoid: level.avoid
  };
});

const patternMatches = catalog.domain_patterns
  .map((pattern) => {
    const hits = hitsFor(pattern.keywords);
    return {
      ...pattern,
      hits,
      score: hits.reduce((total, hit) => total + Math.max(1, hit.split(/\s+/).length), 0)
    };
  })
  .filter((pattern) => pattern.score > 0)
  .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

const strongestLevel = [...levelMatches].sort((a, b) => b.score - a.score || b.id.localeCompare(a.id))[0];
const bestPattern = patternMatches[0];
const recommendedLevelId = bestPattern?.recommended_level || strongestLevel?.id || (mode === "full" ? "L3" : "L1");
const highestLevelId = bestPattern?.highest_level || (mode === "full" ? "L6" : recommendedLevelId);
const recommendedLevel = catalog.maturity_levels.find((level) => level.id === recommendedLevelId);
const highestLevel = catalog.maturity_levels.find((level) => level.id === highestLevelId);

const memory = bestPattern?.memory || ["user profile", "preferences", "examples", "history", "outcome feedback"];
const tools = bestPattern?.tools || ["official APIs/SDKs", "MCP/connectors when auth or governance matters", "browser automation for rendered state", "scheduled jobs"];
const routines = bestPattern?.routines || ["capture", "review", "generate", "approve", "learn"];
const evals = bestPattern?.evals || ["factuality", "quality score", "style match", "safety/privacy", "outcome review"];
const firstClosedLoop = bestPattern?.first_closed_loop || "capture input -> update memory/context -> generate or propose output -> review/approve -> record outcome -> learn";

const result = {
  ok: true,
  mode,
  brief,
  catalog_version: catalog.version,
  artifacts_to_create: [
    "docs/agentic-opportunity-audit.md",
    "docs/intelligence-system-plan.md"
  ],
  recommended_maturity: {
    id: recommendedLevelId,
    name: recommendedLevel?.name || recommendedLevelId,
    description: recommendedLevel?.description || ""
  },
  highest_plausible_maturity: {
    id: highestLevelId,
    name: highestLevel?.name || highestLevelId,
    description: highestLevel?.description || ""
  },
  matched_pattern: bestPattern ? {
    id: bestPattern.id,
    name: bestPattern.name,
    matched_keywords: bestPattern.hits
  } : null,
  first_closed_loop: firstClosedLoop,
  memory,
  tools,
  routines,
  evals,
  dimensions: catalog.dimensions,
  next_step: "Create the agentic opportunity audit and intelligence system plan, then run the intelligence architecture selection before the agent-engineering/skill-factory audit, Agent OS runtime, agent network, and capability/access mapping."
};

if (!markdown) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

const lines = [];
lines.push("# Agentic Opportunity and Intelligence System Starter");
lines.push("");
lines.push(`- Mode: ${mode}`);
lines.push(`- Brief: ${brief}`);
lines.push(`- Recommended maturity now: ${result.recommended_maturity.id} - ${result.recommended_maturity.name}`);
lines.push(`- Highest plausible maturity later: ${result.highest_plausible_maturity.id} - ${result.highest_plausible_maturity.name}`);
if (result.matched_pattern) {
  lines.push(`- Matched pattern: ${result.matched_pattern.name}`);
  lines.push(`- Matched keywords: ${result.matched_pattern.matched_keywords.join(", ")}`);
}
lines.push("");
lines.push("## Artifacts To Create");
for (const artifact of result.artifacts_to_create) {
  lines.push(`- ${artifact}`);
}
lines.push("");
lines.push("## First Closed Loop");
lines.push("");
lines.push(firstClosedLoop);
lines.push("");
lines.push("## Memory");
for (const item of memory) {
  lines.push(`- ${item}`);
}
lines.push("");
lines.push("## Tools and Harness Hypotheses");
for (const item of tools) {
  lines.push(`- ${item}`);
}
lines.push("");
lines.push("## Routines");
for (const item of routines) {
  lines.push(`- ${item}`);
}
lines.push("");
lines.push("## Evals");
for (const item of evals) {
  lines.push(`- ${item}`);
}
lines.push("");
lines.push("## Audit Dimensions");
for (const dimension of catalog.dimensions) {
  lines.push(`### ${dimension.name}`);
  for (const question of dimension.questions) {
    lines.push(`- ${question}`);
  }
  lines.push("");
}
lines.push("## Next Step");
lines.push("");
lines.push("Fill `docs/agentic-opportunity-audit.md`, then `docs/intelligence-system-plan.md`, then run `npm run plan-intelligence-architecture -- --brief \"...\" --mode full --markdown` to decide RAG vs structured retrieval vs extraction vs ADK/workflow before Agent Engineering, Skill Factory, Agent OS Runtime, Agent Network, and Capability Access.");

console.log(lines.join("\n"));

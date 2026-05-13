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
  console.error("Usage: npm run plan-intelligence-architecture -- --brief \"Research copilot with RAG, SQL records, extraction, approvals, and weekly routines\" --mode full --markdown");
  process.exit(1);
}

const catalog = readJson(join(root, "catalogs", "intelligence-architecture-catalog.json"));
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

function scoreHits(hits = []) {
  return hits.reduce((total, hit) => total + Math.max(1, hit.split(/\s+/).length), 0);
}

const substrateMatches = catalog.substrates
  .map((substrate) => {
    const hits = hitsFor(substrate.keywords);
    return { ...substrate, hits, score: scoreHits(hits), source: "brief" };
  })
  .filter((substrate) => substrate.score > 0);

const patternMatches = catalog.domain_patterns
  .map((pattern) => {
    const hits = hitsFor(pattern.keywords);
    return { ...pattern, hits, score: scoreHits(hits) };
  })
  .filter((pattern) => pattern.score > 0)
  .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

const selectedIds = new Set(substrateMatches.map((substrate) => substrate.id));
for (const pattern of patternMatches) {
  for (const id of pattern.recommended_substrates || []) selectedIds.add(id);
}

if (mode === "full" && selectedIds.size === 0) {
  for (const id of ["model_only_reasoning", "structured_retrieval", "semantic_rag", "llm_extraction", "adk_workflow", "durable_memory"]) {
    selectedIds.add(id);
  }
}

if (selectedIds.size === 0) {
  selectedIds.add("model_only_reasoning");
}

const selectedSubstrates = catalog.substrates
  .filter((substrate) => selectedIds.has(substrate.id))
  .map((substrate) => {
    const direct = substrateMatches.find((match) => match.id === substrate.id);
    return { ...substrate, matched_keywords: direct?.hits || [] };
  });

const primaryPattern = patternMatches[0] || null;
const sourceOfTruth = patternMatches.length > 0
  ? Array.from(new Set(patternMatches.flatMap((pattern) => pattern.source_of_truth || [])))
  : ["provided context", "project-defined data sources"];
const firstLoop = primaryPattern?.first_loop || "receive input -> choose source of truth -> retrieve/extract/think -> produce answer/proposal -> evaluate -> record decision";

const result = {
  ok: true,
  mode,
  brief,
  catalog_version: catalog.version,
  artifact_to_create: "docs/intelligence-architecture-decision.md",
  matched_patterns: patternMatches.map((pattern) => ({
    id: pattern.id,
    name: pattern.name,
    matched_keywords: pattern.hits,
    first_loop: pattern.first_loop
  })),
  selected_substrates: selectedSubstrates.map((substrate) => ({
    id: substrate.id,
    name: substrate.name,
    purpose: substrate.purpose,
    matched_keywords: substrate.matched_keywords,
    use_when: substrate.use_when,
    avoid_when: substrate.avoid_when,
    required_outputs: substrate.required_outputs,
    p0_blockers: substrate.p0_blockers,
    evals: substrate.evals
  })),
  source_of_truth: sourceOfTruth,
  first_loop: firstLoop,
  decision_dimensions: catalog.decision_dimensions,
  next_step: "Create docs/intelligence-architecture-decision.md, then run the agent-engineering/skill-factory audit, Agent OS Runtime Plan, and agent network plan before capability/access mapping."
};

if (!markdown) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

const lines = [];
lines.push("# Intelligence Architecture Starter");
lines.push("");
lines.push(`- Mode: ${mode}`);
lines.push(`- Brief: ${brief}`);
lines.push(`- Target artifact: ${result.artifact_to_create}`);
if (result.matched_patterns.length > 0) {
  lines.push(`- Matched patterns: ${result.matched_patterns.map((pattern) => pattern.name).join(", ")}`);
}
lines.push("");
lines.push("## Source Of Truth Hypothesis");
for (const source of result.source_of_truth) lines.push(`- ${source}`);
lines.push("");
lines.push("## First Loop Hypothesis");
lines.push("");
lines.push(result.first_loop);
lines.push("");
lines.push("## Selected Intelligence Substrates");

for (const substrate of result.selected_substrates) {
  lines.push(`### ${substrate.name}`);
  lines.push(substrate.purpose);
  if (substrate.matched_keywords.length > 0) {
    lines.push(`- Matched keywords: ${substrate.matched_keywords.join(", ")}`);
  }
  lines.push("");
  lines.push("Use when:");
  for (const item of substrate.use_when) lines.push(`- ${item}`);
  lines.push("");
  lines.push("Avoid when:");
  for (const item of substrate.avoid_when) lines.push(`- ${item}`);
  lines.push("");
  lines.push("Required outputs:");
  for (const output of substrate.required_outputs) lines.push(`- ${output}`);
  lines.push("");
  lines.push("P0 blockers:");
  for (const blocker of substrate.p0_blockers) lines.push(`- ${blocker}`);
  lines.push("");
  lines.push("Evals:");
  for (const evaluation of substrate.evals) lines.push(`- ${evaluation}`);
  lines.push("");
}

lines.push("## Decision Dimensions");
for (const dimension of result.decision_dimensions) {
  lines.push(`### ${dimension.name}`);
  for (const question of dimension.questions) lines.push(`- ${question}`);
  lines.push("");
}

lines.push("## Next Step");
lines.push("");
lines.push("Fill `docs/intelligence-architecture-decision.md`. Do not run Agent Engineering, Skill Factory, Agent OS Runtime, Agent Network, or Capability Access until each core product loop has an explicit choice between model-only reasoning, ADK/workflow, semantic RAG, structured retrieval, extraction, durable memory, external action, and routine automation.");

console.log(lines.join("\n"));

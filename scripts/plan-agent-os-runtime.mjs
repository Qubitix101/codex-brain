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
  console.error("Usage: npm run plan-agent-os-runtime -- --brief \"memory-backed content agent with weekly routines and publish approvals\" --mode full --markdown");
  process.exit(1);
}

const catalog = readJson(join(root, "catalogs", "agent-os-runtime-catalog.json"));
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

const componentMatches = catalog.kernel_components
  .map((component) => {
    const hits = hitsFor(component.keywords);
    return { ...component, hits, score: scoreHits(hits), source: "brief" };
  })
  .filter((component) => component.score > 0);

const patternMatches = catalog.domain_runtime_patterns
  .map((pattern) => {
    const hits = hitsFor(pattern.keywords);
    return { ...pattern, hits, score: scoreHits(hits) };
  })
  .filter((pattern) => pattern.score > 0)
  .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

const selectedIds = new Set(componentMatches.map((component) => component.id));
for (const pattern of patternMatches) {
  for (const id of pattern.recommended_components || []) selectedIds.add(id);
}

if (mode === "full") {
  for (const id of [
    "scheduler_orchestrator",
    "memory_manager",
    "tool_manager_sandbox",
    "identity_delegation",
    "observability_trace",
    "guardrails_governance",
    "recovery_resumability",
    "budget_quota_manager",
    "agent_registry",
    "human_control_surface"
  ]) {
    selectedIds.add(id);
  }
}

if (selectedIds.size === 0) {
  for (const id of ["scheduler_orchestrator", "memory_manager", "tool_manager_sandbox", "observability_trace", "guardrails_governance", "human_control_surface"]) {
    selectedIds.add(id);
  }
}

const selectedComponents = catalog.kernel_components
  .filter((component) => selectedIds.has(component.id))
  .map((component) => {
    const direct = componentMatches.find((match) => match.id === component.id);
    return { ...component, matched_keywords: direct?.hits || [] };
  });

const primaryPattern = patternMatches[0] || null;

const result = {
  ok: true,
  mode,
  brief,
  catalog_version: catalog.version,
  artifact_to_create: "docs/agent-os-runtime-plan.md",
  matched_patterns: patternMatches.map((pattern) => ({
    id: pattern.id,
    name: pattern.name,
    matched_keywords: pattern.hits,
    first_runtime_slice: pattern.first_runtime_slice
  })),
  first_runtime_slice: primaryPattern?.first_runtime_slice || "user request -> scheduled agent loop -> governed memory/tool access -> traced proposal/action -> approval/control -> recovery/learning",
  selected_components: selectedComponents.map((component) => ({
    id: component.id,
    name: component.name,
    purpose: component.purpose,
    matched_keywords: component.matched_keywords,
    required_outputs: component.required_outputs,
    p0_blockers: component.p0_blockers
  })),
  next_step: "Create docs/agent-os-runtime-plan.md before agent network and capability/access mapping. Define runtime ownership, memory/tool/identity/trace/governance/recovery/budget controls for the first agentic slice."
};

if (!markdown) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

const lines = [];
lines.push("# Agent OS Runtime Starter");
lines.push("");
lines.push(`- Mode: ${mode}`);
lines.push(`- Brief: ${brief}`);
lines.push(`- Target artifact: ${result.artifact_to_create}`);
if (result.matched_patterns.length > 0) {
  lines.push(`- Matched patterns: ${result.matched_patterns.map((pattern) => pattern.name).join(", ")}`);
}
lines.push("");
lines.push("## First Runtime Slice Hypothesis");
lines.push("");
lines.push(result.first_runtime_slice);
lines.push("");
lines.push("## Required Kernel Components");

for (const component of result.selected_components) {
  lines.push("");
  lines.push(`### ${component.name}`);
  lines.push(component.purpose);
  if (component.matched_keywords.length > 0) {
    lines.push(`- Matched keywords: ${component.matched_keywords.join(", ")}`);
  }
  lines.push("");
  lines.push("Required outputs:");
  for (const output of component.required_outputs) lines.push(`- ${output}`);
  lines.push("");
  lines.push("P0 blockers:");
  for (const blocker of component.p0_blockers) lines.push(`- ${blocker}`);
}

lines.push("");
lines.push("## Next Step");
lines.push("");
lines.push("Fill `docs/agent-os-runtime-plan.md` after `docs/agent-engineering-audit.md` and `docs/skill-inventory.md`. Do not map agent network, capability/access, or approve the Build Plan for L3+ systems until scheduling, memory, tool sandboxing, identity, traces, governance, recovery, budgets, agent roles, and human control are explicit.");

console.log(lines.join("\n"));

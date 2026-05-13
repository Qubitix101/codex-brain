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
  console.error("Usage: npm run plan-agent-network -- --brief \"stock intelligence OS that delegates approved LinkedIn drafts to a social content OS\" --mode full --markdown");
  process.exit(1);
}

const catalog = readJson(join(root, "catalogs", "agent-network-interop-catalog.json"));
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

const componentMatches = catalog.network_components
  .map((component) => {
    const hits = hitsFor(component.keywords);
    return { ...component, hits, score: scoreHits(hits) };
  })
  .filter((component) => component.score > 0);

const patternMatches = catalog.network_patterns
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

const internalOnly = /\b(no|without|not)\s+(remote agents?|external agents?|a2a|agent cards?|agent network|inter[-\s]?os|federated agents?)\b|\binternal workflow\b|\bsame runtime\b/.test(briefLower);
const notApplicableCandidate = internalOnly && mode !== "full";

if (notApplicableCandidate) {
  selectedIds.clear();
}

if (!notApplicableCandidate && mode === "full") {
  for (const id of [
    "agent_cards_discovery",
    "collaboration_topology",
    "delegation_boundaries",
    "task_message_contracts",
    "protocol_surface_decision",
    "memory_context_boundary",
    "identity_auth_trust",
    "streaming_progress",
    "cross_agent_observability",
    "versioning_compatibility",
    "reuse_commercialization"
  ]) {
    selectedIds.add(id);
  }
}

if (!notApplicableCandidate && selectedIds.size === 0) {
  for (const id of [
    "agent_cards_discovery",
    "collaboration_topology",
    "delegation_boundaries",
    "task_message_contracts",
    "protocol_surface_decision",
    "memory_context_boundary",
    "identity_auth_trust",
    "cross_agent_observability",
    "versioning_compatibility"
  ]) {
    selectedIds.add(id);
  }
}

const selectedComponents = catalog.network_components
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
  artifact_to_create: "docs/agent-network-interop-plan.md",
  applicability: notApplicableCandidate ? "not_applicable_candidate" : "requires_review",
  matched_patterns: patternMatches.map((pattern) => ({
    id: pattern.id,
    name: pattern.name,
    matched_keywords: pattern.hits,
    first_interoperable_slice: pattern.first_interoperable_slice
  })),
  first_interoperable_slice: notApplicableCandidate ? "No cross-agent or inter-OS boundary detected. Mark the gate not applicable unless a remote agent, agent card, A2A-style delegation, or reusable agent service appears." : primaryPattern?.first_interoperable_slice || "one internal agent or domain OS exposes one bounded agent card, consumes one external agent/service contract, exchanges only a distilled task payload, records a cross-agent trace, and requires approval before public/paid/destructive work",
  selected_components: selectedComponents.map((component) => ({
    id: component.id,
    name: component.name,
    purpose: component.purpose,
    matched_keywords: component.matched_keywords,
    required_outputs: component.required_outputs,
    p0_blockers: component.p0_blockers
  })),
  next_step: notApplicableCandidate ? "Record Agent Network and Interoperability as not applicable for this slice, then continue to capability/access mapping. Reopen this gate if a remote agent, external domain OS, reusable agent service, agent card, or A2A-style delegation appears." : "Create docs/agent-network-interop-plan.md after the Agent OS runtime plan and before capability/access mapping. Separate MCP/tool access from A2A-style agent delegation, define agent cards, task contracts, context boundaries, identity, traces, streaming, recovery, and first interoperable slice."
};

if (!markdown) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

const lines = [];
lines.push("# Agent Network and Interoperability Starter");
lines.push("");
lines.push(`- Mode: ${mode}`);
lines.push(`- Brief: ${brief}`);
lines.push(`- Target artifact: ${result.artifact_to_create}`);
lines.push(`- Applicability: ${result.applicability}`);
if (result.matched_patterns.length > 0) {
  lines.push(`- Matched patterns: ${result.matched_patterns.map((pattern) => pattern.name).join(", ")}`);
}
lines.push("");
lines.push("## First Interoperable Slice Hypothesis");
lines.push("");
lines.push(result.first_interoperable_slice);
lines.push("");
lines.push("## Required Network Components");

if (result.selected_components.length === 0) {
  lines.push("");
  lines.push("No network components are required for the current slice based on the brief. Mark the gate not applicable and reopen it if cross-agent or inter-OS collaboration appears.");
}

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
lines.push("Fill `docs/agent-network-interop-plan.md` after `docs/agent-os-runtime-plan.md`. Do not map capability/access or approve the Build Plan for federated agentic systems until agent cards, topology, delegation boundaries, task contracts, protocol decisions, memory/context sharing, identity, streaming, traces, recovery, versioning, and first interoperable slice are explicit.");

console.log(lines.join("\n"));

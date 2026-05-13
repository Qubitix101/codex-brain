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
  console.error("Usage: npm run plan-agentic-zero-trust -- --brief \"social content OS with LinkedIn publishing and memory\" --mode full --markdown");
  process.exit(1);
}

const catalog = readJson(join(root, "catalogs", "agentic-zero-trust-catalog.json"));
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

const controlMatches = catalog.zero_trust_controls
  .map((control) => {
    const hits = hitsFor(control.keywords);
    return { ...control, hits, score: scoreHits(hits) };
  })
  .filter((control) => control.score > 0);

const patternMatches = catalog.risk_patterns
  .map((pattern) => {
    const hits = hitsFor(pattern.keywords);
    return { ...pattern, hits, score: scoreHits(hits) };
  })
  .filter((pattern) => pattern.score > 0)
  .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

const selectedIds = new Set(controlMatches.map((control) => control.id));
for (const pattern of patternMatches) {
  for (const id of pattern.recommended_controls || []) selectedIds.add(id);
}

const clearlyNotAgentic = /\b(static site|brochure|landing page only|no ai|no agents?|no tools?|no external actions?|no sensitive data|simple script|local only)\b/.test(briefLower);
const notApplicableCandidate = clearlyNotAgentic && mode !== "full";

if (notApplicableCandidate) {
  selectedIds.clear();
}

if (!notApplicableCandidate && mode === "full") {
  for (const control of catalog.zero_trust_controls) selectedIds.add(control.id);
}

if (!notApplicableCandidate && selectedIds.size === 0) {
  for (const id of [
    "agent_nhi_registry",
    "jit_vault_credentials",
    "per_action_authorization",
    "trusted_registry",
    "ai_gateway_policy",
    "data_memory_model_integrity",
    "micro_sandbox_segmentation",
    "immutable_observability",
    "human_control_kill_switch",
    "adversarial_evals",
    "incident_response_blast_radius"
  ]) {
    selectedIds.add(id);
  }
}

const selectedControls = catalog.zero_trust_controls
  .filter((control) => selectedIds.has(control.id))
  .map((control) => {
    const direct = controlMatches.find((match) => match.id === control.id);
    return { ...control, matched_keywords: direct?.hits || [] };
  });

const primaryPattern = patternMatches[0] || null;

const result = {
  ok: true,
  mode,
  brief,
  catalog_version: catalog.version,
  artifact_to_create: "docs/agentic-zero-trust-plan.md",
  applicability: notApplicableCandidate ? "not_applicable_candidate" : "requires_review",
  matched_patterns: patternMatches.map((pattern) => ({
    id: pattern.id,
    name: pattern.name,
    matched_keywords: pattern.hits,
    first_secure_slice: pattern.first_secure_slice
  })),
  first_secure_slice: notApplicableCandidate ? "No agentic action, tool use, memory/retrieval trust boundary, MCP/A2A boundary, sensitive data, or AI-controlled external action detected. Mark the gate not applicable unless the scope changes." : primaryPattern?.first_secure_slice || "one low-risk agentic loop uses a registered tool, receives a just-in-time scoped credential, validates model output before tool invocation, records an immutable trace, and requires human approval before public, paid, destructive, or compliance-sensitive action",
  selected_controls: selectedControls.map((control) => ({
    id: control.id,
    name: control.name,
    purpose: control.purpose,
    matched_keywords: control.matched_keywords,
    threats: control.threats,
    required_outputs: control.required_outputs,
    p0_blockers: control.p0_blockers
  })),
  next_step: notApplicableCandidate ? "Record Agentic Zero Trust as not applicable for this slice, then continue to capability/access mapping. Reopen this gate if agentic action, tool use, memory/retrieval, MCP/A2A, sensitive data, or autonomous routines appear." : "Create docs/agentic-zero-trust-plan.md after the Agent Network plan and before capability/access mapping. Define identity, JIT credentials, per-action authorization, trusted registry, AI gateway/firewall, memory/retrieval integrity, sandboxing, immutable traces, human controls, adversarial evals, and incident response."
};

if (!markdown) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

const lines = [];
lines.push("# Agentic Zero Trust Starter");
lines.push("");
lines.push(`- Mode: ${mode}`);
lines.push(`- Brief: ${brief}`);
lines.push(`- Target artifact: ${result.artifact_to_create}`);
lines.push(`- Applicability: ${result.applicability}`);
if (result.matched_patterns.length > 0) {
  lines.push(`- Matched patterns: ${result.matched_patterns.map((pattern) => pattern.name).join(", ")}`);
}
lines.push("");
lines.push("## First Secure Autonomous Slice Hypothesis");
lines.push("");
lines.push(result.first_secure_slice);
lines.push("");
lines.push("## Required Zero Trust Controls");

if (result.selected_controls.length === 0) {
  lines.push("");
  lines.push("No Agentic Zero Trust controls are required for the current slice based on the brief. Mark the gate not applicable and reopen it if agents, tools, memory/retrieval, MCP/A2A, sensitive data, or external actions appear.");
}

for (const control of result.selected_controls) {
  lines.push("");
  lines.push(`### ${control.name}`);
  lines.push(control.purpose);
  if (control.matched_keywords.length > 0) {
    lines.push(`- Matched keywords: ${control.matched_keywords.join(", ")}`);
  }
  lines.push("");
  lines.push("Threats covered:");
  for (const threat of control.threats) lines.push(`- ${threat}`);
  lines.push("");
  lines.push("Required outputs:");
  for (const output of control.required_outputs) lines.push(`- ${output}`);
  lines.push("");
  lines.push("P0 blockers:");
  for (const blocker of control.p0_blockers) lines.push(`- ${blocker}`);
}

lines.push("");
lines.push("## Next Step");
lines.push("");
lines.push("Fill `docs/agentic-zero-trust-plan.md` after `docs/agent-network-interop-plan.md` and before `docs/capability-access-map.md`. Do not approve capability/access or Build Plan for agentic systems until identity, JIT credentials, per-action authorization, registry trust, policy enforcement, memory/retrieval integrity, sandboxing, immutable traces, human controls, adversarial evals, and incident response are explicit.");

console.log(lines.join("\n"));

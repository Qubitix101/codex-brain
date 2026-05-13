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
  console.error("Usage: npm run plan-agent-skills -- --brief \"AI research agent with RAG, Perplexity routing, approvals, and weekly reports\" --mode full --markdown");
  process.exit(1);
}

const catalog = readJson(join(root, "catalogs", "agent-engineering-catalog.json"));
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

const disciplineMatches = catalog.disciplines
  .map((discipline) => {
    const hits = hitsFor(discipline.signals);
    const score = scoreHits(hits);
    return { ...discipline, hits, score };
  })
  .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

const patternMatches = catalog.domain_skill_patterns
  .map((pattern) => {
    const hits = hitsFor(pattern.keywords);
    const score = scoreHits(hits);
    return { ...pattern, hits, score };
  })
  .filter((pattern) => pattern.score > 0)
  .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

const directSkillMatches = catalog.skill_archetypes
  .map((skill) => {
    const hits = hitsFor(skill.keywords);
    const score = scoreHits(hits);
    return { ...skill, hits, score, source: "brief" };
  })
  .filter((skill) => skill.score > 0);

const recommendedSkillIds = new Set(directSkillMatches.map((skill) => skill.id));
const requiredDisciplineIds = new Set();

for (const pattern of patternMatches) {
  for (const id of pattern.recommended_skills || []) recommendedSkillIds.add(id);
  for (const id of pattern.required_disciplines || []) requiredDisciplineIds.add(id);
}

if (mode === "full") {
  for (const discipline of catalog.disciplines) requiredDisciplineIds.add(discipline.id);
}

for (const discipline of disciplineMatches.filter((discipline) => discipline.score > 0)) {
  requiredDisciplineIds.add(discipline.id);
}

const recommendedSkills = Array.from(recommendedSkillIds)
  .map((id) => {
    const archetype = catalog.skill_archetypes.find((skill) => skill.id === id);
    const direct = directSkillMatches.find((skill) => skill.id === id);
    return archetype ? { ...archetype, matched_keywords: direct?.hits || [] } : null;
  })
  .filter(Boolean)
  .sort((a, b) => a.default_trust.localeCompare(b.default_trust) || a.name.localeCompare(b.name));

const requiredDisciplines = catalog.disciplines.filter((discipline) => requiredDisciplineIds.has(discipline.id));

const defaultDisciplines = requiredDisciplines.length > 0 ? requiredDisciplines : catalog.disciplines;
const defaultSkills = recommendedSkills.length > 0 ? recommendedSkills : catalog.skill_archetypes.filter((skill) => {
  return ["capture_signal", "retrieve_context", "generate_artifact", "critique_score"].includes(skill.id);
});

const result = {
  ok: true,
  mode,
  brief,
  catalog_version: catalog.version,
  artifacts_to_create: [
    "docs/intelligence-architecture-decision.md",
    "docs/agent-engineering-audit.md",
    "docs/skill-inventory.md"
  ],
  matched_patterns: patternMatches.map((pattern) => ({
    id: pattern.id,
    name: pattern.name,
    matched_keywords: pattern.hits
  })),
  required_disciplines: defaultDisciplines.map((discipline) => ({
    id: discipline.id,
    name: discipline.name,
    purpose: discipline.purpose,
    required_outputs: discipline.required_outputs,
    p0_blockers: discipline.p0_blockers
  })),
  recommended_skills: defaultSkills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    trust_level: skill.default_trust,
    purpose: skill.purpose,
    inputs: skill.inputs,
    outputs: skill.outputs,
    evals: skill.evals,
    matched_keywords: skill.matched_keywords || []
  })),
  trust_levels: catalog.skill_trust_levels,
  next_step: "Create docs/intelligence-architecture-decision.md first when AI architecture is not already selected, then create docs/agent-engineering-audit.md and docs/skill-inventory.md before capability/access mapping."
};

if (!markdown) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

const lines = [];
lines.push("# Agent Engineering and Skill Factory Starter");
lines.push("");
lines.push(`- Mode: ${mode}`);
lines.push(`- Brief: ${brief}`);
if (result.matched_patterns.length > 0) {
  lines.push(`- Matched patterns: ${result.matched_patterns.map((pattern) => pattern.name).join(", ")}`);
}
lines.push("");
lines.push("## Artifacts To Create");
for (const artifact of result.artifacts_to_create) lines.push(`- ${artifact}`);
lines.push("");
lines.push("## Required Agent Engineering Disciplines");
for (const discipline of result.required_disciplines) {
  lines.push(`### ${discipline.name}`);
  lines.push(discipline.purpose);
  lines.push("");
  lines.push("Required outputs:");
  for (const output of discipline.required_outputs) lines.push(`- ${output}`);
  lines.push("");
  lines.push("P0 blockers to check:");
  for (const blocker of discipline.p0_blockers) lines.push(`- ${blocker}`);
  lines.push("");
}
lines.push("## Recommended Skill Candidates");
for (const skill of result.recommended_skills) {
  lines.push(`### ${skill.name}`);
  lines.push(`- Trust level: ${skill.trust_level}`);
  lines.push(`- Purpose: ${skill.purpose}`);
  lines.push(`- Inputs: ${skill.inputs.join(", ")}`);
  lines.push(`- Outputs: ${skill.outputs.join(", ")}`);
  lines.push(`- Evals: ${skill.evals.join(", ")}`);
  if (skill.matched_keywords.length > 0) lines.push(`- Matched keywords: ${skill.matched_keywords.join(", ")}`);
  lines.push("");
}
lines.push("## Trust Levels");
for (const level of result.trust_levels) {
  lines.push(`- ${level.id} - ${level.name}: ${level.description}`);
}
lines.push("");
lines.push("## Next Step");
lines.push("");
lines.push("Confirm `docs/intelligence-architecture-decision.md` first when AI architecture is not already selected. Then fill `docs/agent-engineering-audit.md` and `docs/skill-inventory.md`. Do not generate or install executable skills until T2-T4 trust review requirements are explicit.");

console.log(lines.join("\n"));

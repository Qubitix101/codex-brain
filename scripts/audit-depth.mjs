#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readJson } from "./lib.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const catalogPath = join(root, "catalogs", "full-mode-coverage-catalog.json");
const catalog = readJson(catalogPath);

const requiredFiles = [
  "frameworks/research-deep-methodology.md",
  "frameworks/build-plan-deep-methodology.md",
  "frameworks/quality-gate-matrix.md",
  "frameworks/governance-and-evolution.md",
  "frameworks/frontend-visual-qa.md",
  "frameworks/design-dna.md",
  "frameworks/database-scale.md",
  "frameworks/security-gdpr.md",
  "frameworks/narrative-validation.md",
  "frameworks/competitive-benchmark.md",
  "frameworks/context-routing-and-help.md",
  "frameworks/agentic-opportunity-audit.md",
  "frameworks/intelligence-system-plan.md",
  "frameworks/intelligence-architecture-selection.md",
  "frameworks/agent-engineering-skill-stack.md",
  "frameworks/skill-factory.md",
  "frameworks/agent-os-runtime.md",
  "frameworks/agent-network-interop.md",
  "frameworks/capability-access-readiness.md",
  "frameworks/tool-surface-routing.md",
  "frameworks/quick-flow.md",
  "frameworks/vertical-slice-planning.md",
  "frameworks/context-distillation.md",
  "frameworks/test-architecture.md",
  "frameworks/project-context.md",
  "frameworks/session-close-and-context-save.md",
  "frameworks/expert-councils.md",
  "frameworks/skill-workflow-architecture.md",
  "templates/full/master-build-plan.template.md",
  "templates/full/research-matrix.template.md",
  "templates/full/build-plan-checklist.template.md",
  "templates/full/evidence-ledger.template.json",
  "templates/full/adr.template.md",
  "templates/full/promise-to-spec-audit.template.md",
  "templates/full/research-category.template.md",
  "templates/full/frontend-visual-qa.template.md",
  "templates/full/postmortem.template.md",
  "templates/full/mode-downgrade-record.template.md",
  "templates/full/test-strategy.template.md",
  "templates/full/traceability-matrix.template.md",
  "templates/shared/project-codex.template.md",
  "templates/shared/agentic-opportunity-audit.template.md",
  "templates/shared/intelligence-system-plan.template.md",
  "templates/shared/intelligence-architecture-decision.template.md",
  "templates/shared/agent-engineering-audit.template.md",
  "templates/shared/agent-os-runtime-plan.template.md",
  "templates/shared/agent-network-interop-plan.template.md",
  "templates/shared/skill-inventory.template.md",
  "templates/shared/skill-spec.template.md",
  "templates/shared/capability-access-map.template.md",
  "templates/shared/project-context.template.md",
  "templates/shared/distillate.template.md",
  "templates/shared/session-record.template.json",
  "templates/light/quick-spec.template.md",
  "workflows/README.md",
  "workflows/context-routing/step-02-compute-next-action.md",
  "workflows/agentic-opportunity/step-01-audit.md",
  "workflows/agentic-opportunity/step-02-intelligence-system-plan.md",
  "workflows/agentic-opportunity/step-03-readiness-gate.md",
  "workflows/intelligence-architecture/step-01-substrate-selection.md",
  "workflows/intelligence-architecture/step-02-loop-architecture.md",
  "workflows/intelligence-architecture/step-03-readiness-gate.md",
  "workflows/agent-engineering/step-01-seven-skill-audit.md",
  "workflows/agent-engineering/step-02-skill-gap-map.md",
  "workflows/agent-engineering/step-03-skill-factory-readiness.md",
  "workflows/agent-os-runtime/step-01-kernel-map.md",
  "workflows/agent-os-runtime/step-02-runtime-contracts.md",
  "workflows/agent-os-runtime/step-03-readiness-gate.md",
  "workflows/agent-network-interop/step-01-network-map.md",
  "workflows/agent-network-interop/step-02-contracts-boundaries.md",
  "workflows/agent-network-interop/step-03-readiness-gate.md",
  "workflows/capability-access/step-01-inventory.md",
  "workflows/capability-access/step-02-map-surfaces.md",
  "workflows/capability-access/step-03-readiness-gate.md",
  "workflows/quick-flow/step-03-implement-slice.md",
  "workflows/full-mode-readiness/step-03-execution-readiness.md",
  "workflows/session-close/step-02-save-record.md",
  "workflows/session-close/step-03-health-check.md",
  "agents/intelligence-architecture-reviewer.md",
  "agents/agent-engineering-reviewer.md",
  "agents/agent-os-runtime-reviewer.md",
  "agents/agent-network-interop-reviewer.md",
  "START-NEW-PROJECT.md",
  "USAGE-GUIDE.md"
];

const corpusFiles = requiredFiles.filter((file) => file.endsWith(".md"));
const corpus = corpusFiles
  .map((file) => (existsSync(join(root, file)) ? readFileSync(join(root, file), "utf8") : ""))
  .join("\n")
  .toLowerCase();

const missingFiles = requiredFiles.filter((file) => !existsSync(join(root, file)));
const domainFailures = [];

for (const domain of catalog.domains) {
  const terms = [
    domain.id,
    domain.name,
    ...domain.required_questions.slice(0, 3),
    ...domain.p0_blockers.slice(0, 2)
  ]
    .map((term) => term.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim())
    .filter(Boolean);

  const hits = terms.filter((term) => {
    const words = term.split(" ").filter((word) => word.length > 3);
    return words.length === 0 || words.every((word) => corpus.includes(word));
  });

  if (hits.length < Math.min(3, terms.length)) {
    domainFailures.push({
      id: domain.id,
      name: domain.name,
      hits: hits.length,
      checked: terms.length
    });
  }
}

const requiredConcepts = [
  "multi-tenancy",
  "tenant isolation",
  "gdpr",
  "lawful basis",
  "database adr",
  "scale model",
  "design dna",
  "accessibility",
  "ai orchestration",
  "eval",
  "billing edge",
  "observability",
  "rollback",
  "promise-to-spec",
  "evidence ledger",
  "threat model",
  "authorization matrix",
  "retention",
  "deletion",
  "subprocessor",
  "visual qa",
  "mode downgrade",
  "governance",
  "postmortem",
  "research category",
  "frontend visual",
  "workflow manifest",
  "next allowed action",
  "quick flow",
  "vertical slice",
  "traceability matrix",
  "test strategy",
  "project context",
  "use codex brain",
  "save context",
  "session close",
  "session record",
  "context health",
  "context distillation",
  "expert councils",
  "session brief",
  "agentic opportunity",
  "intelligence system",
  "maturity level",
  "first closed loop",
  "memory-backed copilot",
  "bounded autonomous operator",
  "domain operating system",
  "intelligence architecture",
  "source of truth",
  "semantic rag",
  "structured retrieval",
  "deterministic structured retrieval",
  "llm extraction",
  "structured fields",
  "adk",
  "workflow architecture",
  "external action",
  "routine automation",
  "agent engineering",
  "seven-discipline",
  "system design",
  "tool and contract",
  "retrieval engineering",
  "reliability engineering",
  "security and safety",
  "evaluation and observability",
  "product trust",
  "skill factory",
  "procedural memory",
  "skill inventory",
  "skill trust",
  "progressive disclosure",
  "model routing",
  "agent os runtime",
  "runtime kernel",
  "scheduler",
  "orchestrator",
  "memory manager",
  "tool manager",
  "sandbox",
  "identity",
  "delegation",
  "guardrails",
  "governance",
  "resumability",
  "budget",
  "quota",
  "agent registry",
  "human control",
  "agent network",
  "interoperability",
  "agent card",
  "agent cards",
  "agent-to-agent",
  "a2a",
  "network plane",
  "delegation boundary",
  "cross-agent",
  "collaboration topology",
  "task contract",
  "message contract",
  "context sharing",
  "streaming progress",
  "versioning",
  "compatibility",
  "capability access",
  "tool surface",
  "official api",
  "official cli",
  "mcp",
  "generated cli harness",
  "browser automation",
  "computer use",
  "live verification"
];

const missingConcepts = requiredConcepts.filter((concept) => !corpus.includes(concept));

const ok = missingFiles.length === 0 && domainFailures.length === 0 && missingConcepts.length === 0;
console.log(JSON.stringify({
  ok,
  domain_count: catalog.domains.length,
  missingFiles,
  domainFailures,
  missingConcepts
}, null, 2));

process.exit(ok ? 0 : 1);

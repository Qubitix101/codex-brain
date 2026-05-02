#!/usr/bin/env node
import { writeJson, parseArgs, today } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));

const project = args.project || args.name || "unknown-project";
const brief = `${args.brief || ""} ${args._.join(" ")}`.toLowerCase();

function has(...terms) {
  return terms.some((term) => brief.includes(term));
}

const signals = {
  public_product: Boolean(args.public) || has("public", "launch", "customers", "users"),
  user_accounts: Boolean(args.auth) || has("auth", "login", "signup", "account", "user accounts"),
  stores_user_data: Boolean(args.data) || has("user data", "personal data", "profile", "records", "customer data"),
  payments: Boolean(args.payments) || has("payment", "payments", "stripe", "subscription", "billing", "invoice", "refund"),
  multi_tenant: Boolean(args.multiTenant) || has("multi-tenant", "tenant", "organization", "workspace", "team", "client portal"),
  regulated_domain: Boolean(args.regulated) || has("health", "medical", "finance", "legal", "education", "children", "insurance", "banking"),
  eu_personal_data: Boolean(args.eu) || has("gdpr", "europe", "eu users", "personal data"),
  enterprise_customers: Boolean(args.enterprise) || has("enterprise", "b2b", "soc 2", "iso 27001", "procurement"),
  ai_core: Boolean(args.ai) || has("ai", "llm", "agent", "rag", "model", "prompt", "copilot"),
  high_scale: Boolean(args.scale) || has("scale", "millions", "high traffic", "global", "large volume"),
  frontend_ui: Boolean(args.ui) || has("frontend", "ui", "dashboard", "landing", "website", "app", "mobile"),
  world_class_ambition: Boolean(args.worldClass) || has("world-class", "top ten", "top 10", "unicorn", "best in the world", "enterprise-grade")
};

const fullTriggers = [
  "multi_tenant",
  "regulated_domain",
  "enterprise_customers",
  "ai_core",
  "high_scale",
  "world_class_ambition"
].filter((key) => signals[key]);

if (signals.payments && (signals.multi_tenant || signals.enterprise_customers || signals.eu_personal_data)) {
  fullTriggers.push("payments_with_trust_or_compliance_pressure");
}

const standardTriggers = [
  "public_product",
  "user_accounts",
  "stores_user_data",
  "payments",
  "eu_personal_data",
  "frontend_ui"
].filter((key) => signals[key]);

let recommended = "light";
if (fullTriggers.length > 0) recommended = "full";
else if (standardTriggers.length > 0) recommended = "standard";

const reasons = [];
for (const key of fullTriggers) reasons.push(`Full trigger: ${key.replaceAll("_", " ")}.`);
for (const key of standardTriggers) {
  if (recommended !== "full") reasons.push(`Standard trigger: ${key.replaceAll("_", " ")}.`);
}
if (reasons.length === 0) reasons.push("No major product, data, payment, scale, UI, or compliance risk detected.");

const risks = [];
if (recommended === "full") {
  risks.push("Lower rigor may miss architecture, security, privacy, design, scale, or business-model risks before implementation.");
}
if (recommended === "standard") {
  risks.push("Light mode may skip product, security, privacy, design, and deployment questions required for real users.");
}

const output = {
  project,
  date: today(),
  recommended_mode: recommended,
  approved_mode: args.approve ? recommended : "pending",
  confidence: recommended === "light" ? 0.72 : recommended === "standard" ? 0.82 : 0.9,
  user_approved: Boolean(args.approve),
  signals,
  reasons,
  risks_if_lower_mode: risks
};

if (args.out) {
  writeJson(args.out, output);
} else {
  console.log(JSON.stringify(output, null, 2));
}


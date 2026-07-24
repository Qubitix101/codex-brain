#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

const skills = [
  "jass-loop-start",
  "jass-loop-spec",
  "jass-loop-build",
  "jass-loop-review",
  "jass-loop-status",
];

const deprecated = [
  "finn-spec",
  "finn-build",
  "finn-review",
  "loop-engineering-bootstrap",
  "loop-status",
];

const errors = [];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

for (const skill of skills) {
  const path = join(root, ".agents", "skills", skill, "SKILL.md");
  if (!(await exists(path))) {
    errors.push(`missing skill: ${skill}`);
    continue;
  }
  const text = await readFile(path, "utf8");
  if (!text.includes(`name: ${skill}`)) {
    errors.push(`frontmatter name mismatch: ${skill}`);
  }
  if (!text.includes("references/CALIBRATION.md")) {
    errors.push(`missing calibration reference: ${skill}`);
  }
}

for (const skill of deprecated) {
  const path = join(root, ".agents", "skills", skill);
  if (await exists(path)) errors.push(`deprecated skill directory remains: ${skill}`);
}

const messagePath = join(root, "docs", "MERGE_READY_MESSAGE.md");
const message = await readFile(messagePath, "utf8");
const messageRequirements = [
  "**In one simple sentence**",
  "**The issue**",
  "**What this PR does**",
  "**What it does not do**",
  "**Preview**",
  "No app preview for this PR",
  "**How to test it yourself**",
  "**What Jass Loop already checked**",
  "**Your action**",
  "Exact reviewed version",
  "Never combine “merged” and “live”",
];

for (const requirement of messageRequirements) {
  if (!message.includes(requirement)) {
    errors.push(`merge-ready message requirement missing: ${requirement}`);
  }
}

const appPackage = JSON.parse(
  await readFile(join(root, "apps", "slack-approval", "package.json"), "utf8"),
);
if (appPackage.name !== "@jass-loop/slack-approval") {
  errors.push("Slack approval package is not Jass Loop branded");
}

if (errors.length > 0) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exitCode = 1;
} else {
  console.log(
    JSON.stringify(
      {
        ok: true,
        skills,
        messageContract: "docs/MERGE_READY_MESSAGE.md",
      },
      null,
      2,
    ),
  );
}

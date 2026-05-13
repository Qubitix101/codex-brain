#!/usr/bin/env node

import { cp, mkdir, readdir, readFile, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const repoRoot = process.cwd();
const sourceRoot = path.join(repoRoot, "skills", "codex-brain");
const targetRoot = process.env.CODEX_SKILLS_HOME
  ? path.resolve(process.env.CODEX_SKILLS_HOME)
  : path.join(os.homedir(), ".codex", "skills");
const dryRun = process.argv.includes("--dry-run");
const allowedResourceDirs = new Set(["scripts", "references", "assets"]);
const placeholderPattern = /\b(TODO|FIXME|TBD|PLACEHOLDER)\b/;

function parseFrontmatter(content, skillDir) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    throw new Error(`${skillDir}: missing YAML frontmatter`);
  }

  const data = {};
  for (const line of match[1].split("\n")) {
    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (keyMatch) {
      data[keyMatch[1]] = keyMatch[2].replace(/^["']|["']$/g, "").trim();
    }
  }

  if (!data.name || !data.description) {
    throw new Error(`${skillDir}: frontmatter requires name and description`);
  }

  return data;
}

async function validateSkill(skillName) {
  const skillDir = path.join(sourceRoot, skillName);
  const skillPath = path.join(skillDir, "SKILL.md");
  if (!existsSync(skillPath)) {
    throw new Error(`${skillName}: missing SKILL.md`);
  }

  const content = await readFile(skillPath, "utf8");
  const frontmatter = parseFrontmatter(content, skillName);

  if (frontmatter.name !== skillName) {
    throw new Error(`${skillName}: frontmatter name must match directory`);
  }

  if (!/^[a-z][a-z0-9-]*[a-z0-9]$/.test(frontmatter.name)) {
    throw new Error(`${skillName}: name must be kebab-case`);
  }

  const descriptionWords = frontmatter.description.split(/\s+/).filter(Boolean).length;
  if (descriptionWords < 10 || descriptionWords > 60) {
    throw new Error(`${skillName}: description must be 10-60 words`);
  }

  for (const vague of ["helps", "assists", "supports", "various"]) {
    if (frontmatter.description.toLowerCase().includes(vague)) {
      throw new Error(`${skillName}: description contains vague term "${vague}"`);
    }
  }

  if (!content.includes("## When to Use")) {
    throw new Error(`${skillName}: missing "## When to Use" section`);
  }

  if (!content.includes("## Examples") && !content.includes("### Example")) {
    throw new Error(`${skillName}: missing examples`);
  }

  if (placeholderPattern.test(content)) {
    throw new Error(`${skillName}: placeholder text found`);
  }

  const entries = await readdir(skillDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && !allowedResourceDirs.has(entry.name)) {
      throw new Error(
        `${skillName}: invalid resource directory "${entry.name}". Use scripts, references, or assets.`
      );
    }
  }

  return { name: skillName, description: frontmatter.description };
}

async function main() {
  if (!existsSync(sourceRoot)) {
    throw new Error(`Skill source root not found: ${sourceRoot}`);
  }

  const sourceEntries = await readdir(sourceRoot, { withFileTypes: true });
  const skillNames = [];
  for (const entry of sourceEntries) {
    if (!entry.isDirectory()) continue;
    const skillDir = path.join(sourceRoot, entry.name);
    const skillStat = await stat(skillDir);
    if (skillStat.isDirectory()) {
      skillNames.push(entry.name);
    }
  }

  skillNames.sort();

  if (skillNames.length === 0) {
    throw new Error(`No skills found under ${sourceRoot}`);
  }

  const validated = [];
  for (const skillName of skillNames) {
    validated.push(await validateSkill(skillName));
  }

  if (dryRun) {
    console.log(`Validated ${validated.length} skills. Dry run only.`);
    for (const skill of validated) {
      console.log(`- ${skill.name}: ${skill.description}`);
    }
    return;
  }

  await mkdir(targetRoot, { recursive: true });

  for (const skill of validated) {
    const sourceDir = path.join(sourceRoot, skill.name);
    const targetDir = path.join(targetRoot, skill.name);
    await rm(targetDir, { recursive: true, force: true });
    await cp(sourceDir, targetDir, { recursive: true });
    console.log(`Installed ${skill.name} -> ${targetDir}`);
  }

  console.log(`Installed ${validated.length} Codex Brain skills into ${targetRoot}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

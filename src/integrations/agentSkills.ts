/**
 * Publishes agent skills for AI coding agents.
 *
 * Skills live in public/.well-known/agent-skills/<name>/SKILL.md (https://agentskills.io/specification).
 * After the build, this integration validates each one and writes the discovery index
 * /.well-known/agent-skills/index.json (Agent Skills Discovery RFC v0.2.0,
 * https://github.com/cloudflare/agent-skills-discovery-rfc) with the SHA-256 digest of every
 * published SKILL.md. Agents can then install a skill with `npx skills add https://mage-os.org`.
 */
import { createHash } from 'node:crypto';
import type { Dirent } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { AstroIntegration } from 'astro';
import yaml from 'js-yaml';

export const SKILLS_PATH = '.well-known/agent-skills';
export const INDEX_SCHEMA = 'https://schemas.agentskills.io/discovery/0.2.0/schema.json';

/** Front matter keys every Agent Skills client accepts; claude.ai rejects skills with other keys. */
const ALLOWED_KEYS = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);
const NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export interface SkillIndexEntry {
  name: string;
  type: 'skill-md';
  description: string;
  url: string;
  digest: string;
}

/** Validates a SKILL.md against the Agent Skills spec and returns its name and description. */
export function parseSkill(directory: string, content: string): { name: string; description: string } {
  const fail = (problem: string): never => {
    throw new Error(`${SKILLS_PATH}/${directory}/SKILL.md: ${problem}`);
  };
  const frontMatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(content)?.[1];
  if (frontMatter === undefined) fail('missing YAML front matter');

  const data = yaml.load(frontMatter as string);
  if (!data || typeof data !== 'object' || Array.isArray(data)) return fail('front matter must be a mapping');
  const fields = data as Record<string, unknown>;

  const unknown = Object.keys(fields).filter((key) => !ALLOWED_KEYS.has(key));
  if (unknown.length) fail(`unsupported front matter keys: ${unknown.join(', ')}`);

  const { name, description, compatibility, metadata } = fields;
  if (typeof name !== 'string' || name.length > 64 || !NAME_PATTERN.test(name)) {
    fail('name must be 1-64 lowercase letters, digits and single hyphens');
  }
  if (name !== directory) fail(`name "${String(name)}" must match the directory name`);
  if (typeof description !== 'string' || !description.trim() || description.length > 1024) {
    fail('description must be 1-1024 characters');
  }
  if (compatibility !== undefined && (typeof compatibility !== 'string' || compatibility.length > 500)) {
    fail('compatibility must be at most 500 characters');
  }
  if (
    metadata !== undefined &&
    (!metadata ||
      typeof metadata !== 'object' ||
      Array.isArray(metadata) ||
      Object.values(metadata).some((value) => typeof value !== 'string'))
  ) {
    fail('metadata must map keys to string values');
  }

  return { name: name as string, description: (description as string).trim() };
}

export function skillIndexEntry(directory: string, file: Buffer): SkillIndexEntry {
  const { name, description } = parseSkill(directory, file.toString('utf8'));
  return {
    name,
    type: 'skill-md',
    description,
    url: `/${SKILLS_PATH}/${name}/SKILL.md`,
    digest: `sha256:${createHash('sha256').update(file).digest('hex')}`,
  };
}

export default function agentSkills(): AstroIntegration {
  return {
    name: 'mage-os:agent-skills',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const skillsDir = path.join(fileURLToPath(dir), SKILLS_PATH);
        const directories = (await fs.readdir(skillsDir, { withFileTypes: true }).catch((): Dirent[] => []))
          .filter((entry) => entry.isDirectory())
          .map((entry) => entry.name)
          .sort();
        if (!directories.length) return;

        const skills: SkillIndexEntry[] = [];
        for (const directory of directories) {
          skills.push(skillIndexEntry(directory, await fs.readFile(path.join(skillsDir, directory, 'SKILL.md'))));
        }
        await fs.writeFile(
          path.join(skillsDir, 'index.json'),
          `${JSON.stringify({ $schema: INDEX_SCHEMA, skills }, null, 2)}\n`
        );
        logger.info(`Published ${skills.length} agent skill(s): ${skills.map((skill) => skill.name).join(', ')}`);
      },
    },
  };
}

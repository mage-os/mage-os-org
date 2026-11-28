import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import test from 'node:test';

import { parseSkill, skillIndexEntry } from '../src/integrations/agentSkills.ts';

const skillsDir = new URL('../public/.well-known/agent-skills/', import.meta.url);
const skill = (frontMatter, body = '# Skill\n') => `---\n${frontMatter}\n---\n\n${body}`;

test('published skills follow the Agent Skills spec', () => {
  const directories = readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  assert.ok(directories.includes('mage-os'));

  for (const directory of directories) {
    const content = readFileSync(new URL(`${directory}/SKILL.md`, skillsDir), 'utf8');
    assert.equal(parseSkill(directory, content).name, directory);
    assert.ok(content.split('\n').length < 500, `${directory}/SKILL.md should stay under 500 lines`);
  }
});

test('index entries carry the digest of the published file', () => {
  const file = Buffer.from(skill('name: demo\ndescription: Does a thing. Use when testing.'));
  assert.deepEqual(skillIndexEntry('demo', file), {
    name: 'demo',
    type: 'skill-md',
    description: 'Does a thing. Use when testing.',
    url: '/.well-known/agent-skills/demo/SKILL.md',
    digest: `sha256:${createHash('sha256').update(file).digest('hex')}`,
  });
});

test('invalid skills fail the build', () => {
  const cases = [
    ['# No front matter\n', /missing YAML front matter/],
    [skill('name: Demo\ndescription: x'), /name must be/],
    [skill('name: other\ndescription: x'), /must match the directory name/],
    [skill('name: demo'), /description must be/],
    [skill(`name: demo\ndescription: ${'x'.repeat(1025)}`), /description must be/],
    [skill('name: demo\ndescription: x\nuser-invocable: true'), /unsupported front matter keys: user-invocable/],
    [skill('name: demo\ndescription: x\nmetadata:\n  version: 4'), /metadata must map keys to string values/],
  ];
  for (const [content, error] of cases) {
    assert.throws(() => parseSkill('demo', content), error);
  }
});

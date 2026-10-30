import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync, existsSync, lstatSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const cli = path.join(root, 'scripts/install.mjs');

function sandbox(t) {
  const dir = mkdtempSync(path.join(tmpdir(), 'xwul-skills-'));
  const home = path.join(dir, 'home');
  const cwd = path.join(dir, 'project');
  mkdirSync(home);
  mkdirSync(cwd);
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], {
    cwd,
    env: { ...process.env, HOME: home, CODEX_HOME: path.join(home, 'custom-codex') },
    encoding: 'utf8',
  });
  return { cwd, home, run };
}

for (const agent of ['codex', 'claude-code']) {
  test(`installs skill, references and agent for ${agent} in a project`, t => {
    const { cwd, home, run } = sandbox(t);
    const result = run('install', 'conversion-copywriter', '--agent', agent);
    assert.equal(result.status, 0, result.stderr);
    const skill = path.join(cwd, agent === 'codex' ? '.agents' : '.claude', 'skills/conversion-copywriter');
    assert.equal(readFileSync(path.join(skill, 'SKILL.md'), 'utf8'), readFileSync(path.join(root, 'conversion-copywriter/SKILL.md'), 'utf8'));
    assert.ok(existsSync(path.join(skill, 'references/meta-ads.md')));
    assert.ok(existsSync(path.join(skill, 'agents/openai.yaml')));
    const filename = `conversion-strategist.${agent === 'codex' ? 'toml' : 'md'}`;
    const installedAgent = path.join(cwd, agent === 'codex' ? '.codex' : '.claude', 'agents', filename);
    assert.equal(readFileSync(installedAgent, 'utf8'), readFileSync(path.join(root, 'platforms', agent, filename), 'utf8'));
    assert.equal(existsSync(path.join(home, 'custom-codex')), false);
    writeFileSync(path.join(skill, 'SKILL.md'), 'local edits');
    writeFileSync(installedAgent, 'local agent edits');
    assert.equal(run('install', 'conversion-copywriter', '-a', agent).status, 0);
    assert.equal(readFileSync(path.join(skill, 'SKILL.md'), 'utf8'), 'local edits');
    assert.equal(readFileSync(installedAgent, 'utf8'), 'local agent edits');
  });
}

test('global installation respects HOME and CODEX_HOME', t => {
  const { cwd, home, run } = sandbox(t);
  for (const agent of ['codex', 'claude-code']) {
    const result = run('install', 'conversion-copywriter', '-a', agent, '-g');
    assert.equal(result.status, 0, result.stderr);
  }
  assert.ok(existsSync(path.join(home, '.agents/skills/conversion-copywriter/SKILL.md')));
  assert.ok(existsSync(path.join(home, 'custom-codex/agents/conversion-strategist.toml')));
  assert.ok(existsSync(path.join(home, '.claude/skills/conversion-copywriter/SKILL.md')));
  assert.ok(existsSync(path.join(home, '.claude/agents/conversion-strategist.md')));
  assert.equal(existsSync(path.join(cwd, '.agents')), false);
});

test('preserves a broken symlink at an installation destination', t => {
  const { cwd, run } = sandbox(t);
  mkdirSync(path.join(cwd, '.agents/skills'), { recursive: true });
  const target = path.join(cwd, '.agents/skills/conversion-copywriter');
  symlinkSync(path.join(cwd, 'missing'), target);
  assert.equal(run('install', 'conversion-copywriter', '-a', 'codex').status, 0);
  assert.ok(lstatSync(target).isSymbolicLink());
});

test('rejects invalid arguments before installing', t => {
  const { cwd, run } = sandbox(t);
  for (const args of [[], ['install', 'other'], ['install', 'conversion-copywriter'], ['install', 'conversion-copywriter', '-a', 'other'], ['install', 'conversion-copywriter', '-a', 'codex', '--force']]) {
    assert.equal(run(...args).status, 1);
  }
  assert.equal(existsSync(path.join(cwd, '.agents')), false);
  assert.equal(run('--help').status, 0);
});

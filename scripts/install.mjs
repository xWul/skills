#!/usr/bin/env node

import { cp, lstat, mkdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const help = `Install the conversion-copywriter skill and conversion-strategist agent.

Usage:
  xwul-skills install conversion-copywriter --agent <codex|claude-code> [--global]

Options:
  --agent, -a   Target application (required)
  --global, -g  Install for all projects (default: current project)
  --help, -h    Show this help

Existing files and directories are skipped, including symbolic links.
Restart the target app after installation.`;

function parse(args) {
  if (args.includes('--help') || args.includes('-h')) return null;
  if (args.shift() !== 'install' || args.shift() !== 'conversion-copywriter') {
    throw new Error('Expected: install conversion-copywriter. Use --help for usage.');
  }
  const options = { global: false };
  while (args.length) {
    const arg = args.shift();
    if (arg === '--global' || arg === '-g') options.global = true;
    else if (arg === '--agent' || arg === '-a') options.agent = args.shift();
    else throw new Error(`Unknown option: ${arg}`);
  }
  if (!['codex', 'claude-code'].includes(options.agent)) {
    throw new Error('--agent must be codex or claude-code.');
  }
  return options;
}

async function copyIfMissing(source, destination) {
  try {
    await lstat(destination);
    console.log(`Skipped existing installation: ${destination}`);
    return;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true, force: false, errorOnExist: true });
  console.log(`Installed: ${destination}`);
}

try {
  const options = parse(process.argv.slice(2));
  if (!options) {
    console.log(help);
  } else {
    const base = options.global ? homedir() : process.cwd();
    const codex = options.agent === 'codex';
    const skillBase = path.join(base, codex ? '.agents' : '.claude', 'skills');
    const agentBase = codex
      ? (options.global ? process.env.CODEX_HOME || path.join(base, '.codex') : path.join(base, '.codex'))
      : path.join(base, '.claude');
    const platform = codex ? 'codex' : 'claude-code';
    const filename = `conversion-strategist.${codex ? 'toml' : 'md'}`;

    await copyIfMissing(path.join(root, 'conversion-copywriter'), path.join(skillBase, 'conversion-copywriter'));
    await copyIfMissing(path.join(root, 'platforms', platform, filename), path.join(agentBase, 'agents', filename));
    console.log(`Done. Restart ${options.agent} to load the skill and agent.`);
  }
} catch (error) {
  console.error(`Installation failed: ${error.message}`);
  process.exitCode = 1;
}

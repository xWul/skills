#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL="$ROOT/conversion-copywriter"
if [[ ! -f "$SKILL/SKILL.md" ]]; then echo "Missing SKILL.md" >&2; exit 1; fi
TARGETS=("$HOME/.agents/skills" "$HOME/.claude/skills" "$HOME/.cursor/skills" "$HOME/.gemini/config/skills" "$HOME/.gemini/antigravity-cli/skills")
for target in "${TARGETS[@]}"; do
  mkdir -p "$target"
  if [[ -e "$target/conversion-copywriter" ]]; then
    echo "Existing installation at $target/conversion-copywriter; skipping (remove/backup to upgrade)."
  else
    cp -R "$SKILL" "$target/conversion-copywriter"
    echo "Installed skill: $target/conversion-copywriter"
  fi
done
mkdir -p "$HOME/.claude/agents" "$HOME/.codex/agents"
for entry in "claude-code/conversion-strategist.md:$HOME/.claude/agents/conversion-strategist.md" "codex/conversion-strategist.toml:$HOME/.codex/agents/conversion-strategist.toml"; do
 src="$ROOT/platforms/${entry%%:*}"; dest="${entry#*:}"
 if [[ -e "$dest" ]]; then echo "Existing agent at $dest; skipping."; else cp "$src" "$dest"; echo "Installed agent: $dest"; fi
done
printf '\nDone. Restart each app. Skill installed for Codex, Claude Code, Cursor, Antigravity App/IDE and CLI.\n'

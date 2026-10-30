# Conversion Copywriter

Create, improve, and audit direct-response marketing copy for ads, landing pages,
emails, offers, headlines, CTAs, and video scripts. The workflow connects audience,
benefit, evidence, offer, and next action before writing.

[← All skills](../README.md)

## When to use it

- Create Meta, Facebook, or Instagram ad concepts with distinct audience angles.
- Write a landing page or improve weak sections of an existing page.
- Develop email copy, Reels scripts, or creative briefs.
- Review messaging and prioritize conversion experiments.

The skill uses the requested language and defaults to natural Brazilian
Portuguese for Brazilian marketing audiences. It labels assumptions and avoids
inventing testimonials, metrics, guarantees, or urgency. Editorial reviews and
test hypotheses do not promise conversion results or ROAS.

## Install

### Skill only

Use the Agent Skills CLI (requires Node.js 22.20+):

```bash
npx skills add xWul/skills --skill conversion-copywriter
```

Choose your target application in the prompt. Add `-g` for a global installation;
otherwise it installs in the current project.

### Skill + specialist agent

The optional `conversion-strategist` agent handles delegated copy audits,
positioning reviews, and campaign concepts. Its configuration is supplied for
Codex and Claude Code. The Agent Skills CLI installs the skill but does not
register these specialist agent definitions.

Use this repository's installer to install both (requires Node.js 18+):

```bash
# Codex: install globally
npx github:xWul/skills install conversion-copywriter --agent codex --global

# Claude Code: install globally
npx github:xWul/skills install conversion-copywriter --agent claude-code --global
```

Omit `--global` to install in the current project. Existing files, directories,
and symbolic links are skipped to preserve local changes. To update an existing
installation, back it up and remove the relevant destination before reinstalling.
Restart the application to load the skill and agent.

| Target | Skill location | Agent location |
| --- | --- | --- |
| Codex, project | `.agents/skills/conversion-copywriter/` | `.codex/agents/conversion-strategist.toml` |
| Codex, global | `~/.agents/skills/conversion-copywriter/` | `~/.codex/agents/conversion-strategist.toml` |
| Claude Code, project | `.claude/skills/conversion-copywriter/` | `.claude/agents/conversion-strategist.md` |
| Claude Code, global | `~/.claude/skills/conversion-copywriter/` | `~/.claude/agents/conversion-strategist.md` |

For global Codex installations, a configured `CODEX_HOME` overrides `~/.codex`
for the agent destination. The skill remains in `~/.agents/skills/`.

The installer runs directly from GitHub and does not require publishing an npm
package. The GitHub commands use the files committed and pushed to this repository.

### Other platforms and local checkout

See the supplied [Cursor](../platforms/cursor/README.md) and
[Antigravity](../platforms/antigravity/README.md) notes. These applications use
the shared skill workflow; the supplied specialist agent definitions target
Codex and Claude Code.

From a local checkout, install the skill and agent into the current project:

```bash
node scripts/install.mjs install conversion-copywriter --agent codex
```

An optional macOS/Linux installer copies the skill to the five global locations
used by the original universal bundle and installs both agent definitions:

```bash
bash scripts/install-conversion-copywriter.sh
```

Those skill locations are `~/.agents/skills/`, `~/.claude/skills/`,
`~/.cursor/skills/`, `~/.gemini/config/skills/`, and
`~/.gemini/antigravity-cli/skills/`. This shell installer uses
`~/.codex/agents/` and `~/.claude/agents/` for agents and skips existing installations.

## Usage

For Codex:

```text
$conversion-copywriter Create four Meta Ads concepts for a R$57 digital
nursery-planning guide for first-time parents in Brazil. Use different angles,
include visual concepts, and do not invent safety statistics.
```

For Claude Code, invoke `/conversion-copywriter`. In other applications, ask
the agent to use the skill by name:

```text
Use conversion-copywriter to audit this landing page. Identify the three
weakest persuasion steps, rewrite the relevant passages, and propose tests.
Use only the product details and evidence I provide.
```

After installing the specialist agent in an application that supports it,
you can also request delegation:

```text
Delegate a review of these ad concepts to conversion-strategist.
Compare audience motivations, clarity, available proof, and the CTA.
```

## What you get

| Request | Typical deliverable |
| --- | --- |
| Ad concepts | Distinct angles with hooks, copy, headlines, CTAs, visual ideas, and test hypotheses. |
| Copy audit | A diagnosis, prioritized fixes, rewritten passages, and measurable experiments. |
| Landing page | Section-by-section copy with a primary CTA and clearly marked proof placeholders. |
| Creative brief | Audience, promise, evidence, scenes, exact copy, and placement notes. |

Provide product details, audience, channel, offer, available proof, and the desired
next action when possible. Page inspection and external research depend on the
tools available in the host application.

## Guides and agent definitions

- [Skill instructions](SKILL.md)
- [Brief template](references/brief-template.md)
- [Meta ads, carousels, and Reels](references/meta-ads.md)
- [Landing pages](references/landing-pages.md)
- [Reviews and experiments](references/review-and-experiments.md)
- [Codex agent](../platforms/codex/conversion-strategist.toml)
- [Claude Code agent](../platforms/claude-code/conversion-strategist.md)

This is an original workflow informed by established direct-response practices.
It does not reproduce or claim endorsement by the author or publisher of
*The Copywriter’s Handbook*.

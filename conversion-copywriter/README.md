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

### Create ad concepts

For Codex, invoke the skill with a concrete brief:

```text
$conversion-copywriter

Product: An e-book with practical home-organization checklists.
Price: R$49.
Audience: Brazilian adults who live in small apartments and want a more
organized home without buying more furniture.
Channel: Instagram and Facebook feed ads.
Goal: Qualified visits to the product's landing page.

Create three ad concepts in Brazilian Portuguese, each with a distinct angle.
For each concept, provide the hook, primary text, headline, CTA, suggested
visual, and a measurable test hypothesis.

Use only the product details above. Do not invent testimonials, results,
discounts, or urgency. Flag any missing information needed before publication.
```

For Claude Code, invoke `/conversion-copywriter`. In other applications, ask
the agent to use `conversion-copywriter` by name.

### Audit a landing page with the specialist agent

After installing the specialist agent, use a brief like this in Codex.
The Codex agent is named `conversion_strategist`; in Claude Code, use
`conversion-strategist` instead.

```text
Delegate to conversion_strategist.

Product: Claude, Anthropic's AI assistant.
Pricing: Use the current information on the official website. Do not assume
plan prices or features that are not shown.
Audience hypothesis for this audit: Professionals evaluating an AI assistant
for writing, research, analysis, and everyday work.
Goal: Help qualified visitors understand the product and start using Claude.

Analyze this public landing page: https://claude.com/product/overview

Use the complete conversion-copywriter framework, consulting its reference
guides as relevant to the audit, especially landing pages, briefs, and
reviews and experiments.

Perform a conversion-focused audit:

1. Evaluate the value proposition and its relevance to the audience.
2. Analyze the headline and first-screen experience, including mobile clarity.
3. Identify weak, generic, or confusing copy, quoting the affected passages.
4. Evaluate how clearly the page explains the benefits, use cases,
   product capabilities, and how to get started.
5. Review available social proof, CTAs, and responses to likely objections.
6. Identify the three highest-priority improvements, explaining the evidence
   and likely impact behind each recommendation.
7. Rewrite the affected sections in the page's language, using only supported
   product details and clearly marking any proof placeholders.
8. Propose measurable A/B tests with a hypothesis, the change to test, and a
   primary success metric, such as completed sign-ups. Explain what tracking
   would be needed without assuming access to Anthropic's analytics.

Do not modify the website. If you cannot access the page, state that limitation
and request its copy or screenshots before making page-specific findings.
Do not invent testimonials, metrics, discounts, urgency, or product claims.

Return actionable findings ordered by estimated impact. Distinguish observed
facts from hypotheses and do not promise conversion gains.
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

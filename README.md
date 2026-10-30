# Skills

Reusable skills for Codex, Claude Code, and other AI agents. Each skill provides
instructions for a specific workflow, with supporting references where needed.

## Available skills

| Skill | What it does | Documentation |
| --- | --- | --- |
| `frontend-performance-audit` | Audits frontend code for layout shifts, unnecessary React re-renders, and expensive updates. Returns prioritized findings with evidence and suggested fixes. | [Usage and installation](frontend-performance-audit/README.md) |
| `conversion-copywriter` | Creates and reviews ads, landing pages, emails, and video scripts. Includes optional specialist agents for Codex and Claude Code. | [Usage and installation](conversion-copywriter/README.md) |

## Quick start

Install a skill with the [Agent Skills CLI](https://github.com/vercel-labs/skills)
(requires Node.js 22.20+):

```bash
npx skills add xWul/skills
```

Choose a skill and target application in the prompt. Installations apply to the
current project by default; add `-g` to make a skill available across projects.

To install one skill directly:

```bash
npx skills add xWul/skills --skill frontend-performance-audit
npx skills add xWul/skills --skill conversion-copywriter
```

To list the available skills without installing:

```bash
npx skills add xWul/skills --list
```

After installation, ask your agent to use the skill by name. Each skill's README
includes example requests, expected output, and any additional setup.

The conversion skill also includes a `conversion-strategist` agent. See its
[installation guide](conversion-copywriter/README.md#skill--specialist-agent)
for commands that install both the skill and the agent through `npx`.

## Repository layout

```text
skills/
├── frontend-performance-audit/
│   ├── README.md              # Installation, usage, and scope
│   └── SKILL.md               # Instructions loaded by the agent
├── conversion-copywriter/
│   ├── README.md
│   ├── SKILL.md
│   ├── agents/openai.yaml     # Codex skill metadata
│   └── references/            # Guides for specific copywriting tasks
├── platforms/                 # Specialist agents and platform notes
├── scripts/                   # Installers
├── tests/                     # Installer checks
└── package.json
```

## Contributing

Create a directory named after the skill with:

- `SKILL.md`: instructions with `name` and `description` in YAML frontmatter.
- `README.md`: a short overview, installation command, and usage examples.
- Optional `references/`, `scripts/`, or `assets/` when the workflow needs them.

Keep skills focused on a clear task, ground recommendations in available
evidence, and add an entry to the table above. Put detailed agent instructions in
`SKILL.md` and supporting references; use the README to help people choose and
install the skill.

To check the bundled installer after making changes:

```bash
npm test
```

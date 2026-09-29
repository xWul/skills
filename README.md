# Skills

A collection of reusable AI skills for **Codex and other AI agents**.

The goal of this repository is to store practical, focused instructions that help AI agents perform recurring tasks more consistently across software development, automation, research, career workflows, productivity, and other areas.

## Available skills

### `frontend-performance-audit`

Audits frontend projects for performance issues such as:

- Layout shifts and CLS risks
- Unnecessary re-renders
- Expensive component updates
- Broad state subscriptions
- Inefficient derived calculations
- Context propagation
- Large lists
- High-frequency updates
- Loading and skeleton mismatches

More skills will be added over time.

## Repository structure

```text
skills/
├── frontend-performance-audit/
│   ├── SKILL.md
│   └── references/
│
└── future-skill/
    ├── SKILL.md
    └── references/
```

Each skill lives in its own directory and should contain a `SKILL.md` file.

Optional supporting content can be placed in directories such as:

```text
references/
scripts/
assets/
```

## What is a skill?

A skill is a reusable set of instructions that teaches an AI agent how to perform a specific task or workflow.

A typical skill defines:

- What the skill does
- When it should be used
- The workflow the agent should follow
- Important constraints
- Best practices
- Expected output
- Optional supporting references or scripts

Example:

```md
---
name: frontend-performance-audit
description: Audit frontend projects for layout shifts, unnecessary re-renders, expensive rendering, and state-management performance issues.
---

# Frontend Performance Audit

Instructions...
```

The description is especially important because it helps an AI agent determine when the skill is relevant.

## Usage

Clone the repository:

```bash
git clone https://github.com/xwul/skills.git
```

Make the relevant skill available to your AI agent or coding environment.

You can then explicitly request a skill:

```text
Use the frontend-performance-audit skill to audit this project.

Focus on layout shifts and unnecessary re-renders.
```

Depending on the agent and environment, skills may also be selected automatically when their description matches the task.

## Adding a new skill

Create a directory for the skill:

```text
skills/
└── my-new-skill/
    └── SKILL.md
```

Start with:

```md
---
name: my-new-skill
description: Describe what this skill does and when an agent should use it.
---

# My New Skill

## Purpose

Describe the goal of the skill.

## When to use

Describe when the skill should be selected.

## Workflow

Describe the steps the agent should follow.

## Output

Describe what a successful result should look like.
```

For larger skills, keep `SKILL.md` focused and move detailed material into references:

```text
my-new-skill/
├── SKILL.md
└── references/
    ├── topic-a.md
    └── topic-b.md
```

## Principles

Skills in this repository should aim to be:

**Focused**  
Each skill should solve a clear problem or workflow.

**Reusable**  
Avoid unnecessary assumptions about a specific project unless the skill is intentionally project-specific.

**Practical**  
The output should help complete real work.

**Evidence-based**  
Agents should inspect the available context before making recommendations.

**Composable**  
Skills should work well alongside other skills and agent instructions.

**Maintainable**  
Prefer concise `SKILL.md` files with supporting details moved into references when necessary.

## Roadmap

The repository may eventually include skills for areas such as:

- Software engineering
- Code review
- Performance
- Architecture
- Testing
- Automation
- Job search
- Research
- Productivity
- Personal workflows

## Contributing

Suggestions, improvements, and new skills are welcome.

When adding a skill, keep its scope clear and document when it should be used.

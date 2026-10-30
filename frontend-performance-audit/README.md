# Frontend Performance Audit

Audit frontend code for layout shifts, unnecessary React re-renders, and
expensive component updates. The skill prioritizes React and TypeScript projects
and applies relevant layout checks to other frontend frameworks.

[← All skills](../README.md)

## When to use it

Use this skill when a page jumps as it loads, components update too often, or
interactions become slow under realistic load. It inspects:

- Images, fonts, async content, and loading states that can shift the layout.
- Props, callbacks, context values, and state subscriptions that trigger updates.
- Expensive calculations, large lists, and high-frequency events.
- React state, Context, Redux, Zustand, and TanStack Query usage where present.

## Install

Requires Node.js 22.20+ for the Agent Skills CLI:

```bash
npx skills add xWul/skills --skill frontend-performance-audit
```

Choose your target application in the prompt. Add `-g` to install globally
instead of in the current project.

## Usage

Open the frontend project in your agent and request an audit:

```text
Use frontend-performance-audit to audit this project.
Focus on layout shifts during loading and re-renders when typing in search.
```

For Codex, you can invoke it explicitly:

```text
$frontend-performance-audit Review this dashboard for expensive updates
caused by live data. Prioritize findings by impact.
```

## What you get

An audit with a summary, prioritized findings, affected files and code evidence,
explanations of likely user impact, and suggested fixes. The skill inspects the
project before recommending changes and implements fixes only when requested.

It avoids blanket memoization advice. Code findings identify risks; confirming
runtime impact or CLS improvements requires measurements in the application.

## Skill instructions

See [SKILL.md](SKILL.md) for the full audit workflow and output format.

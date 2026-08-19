# CLAUDE.md

Guidance for Claude Code working in this repository.

## Overview

`@rabjs/kit` is a lodash-shaped TypeScript utility library (named exports only) plus a Vite + React documentation app in `website/`. pnpm workspaces; Node `>= 20`.

## Commands

```bash
pnpm install          # pnpm required
pnpm test             # Vitest with coverage (90% floor)
pnpm test:watch       # Vitest watch
pnpm typecheck        # tsc --noEmit
pnpm lint             # ESLint, max warnings 0
pnpm prettier:check
pnpm prettier:fix
pnpm build            # tsdown: ESM + CJS + dts, rewrites package.json exports
pnpm docs:catalog     # JSDoc → website/src/generated/catalog.ts + llms.txt
pnpm docs:catalog:check
pnpm docs:dev         # Vite docs app
pnpm docs:build       # catalog + website build
```

Single spec: `pnpm exec vitest run test/array/chunk.spec.ts`.

Version a change with `pnpm changeset`. Do not hand-edit `package.json` `exports`.

## Layout

```
src/<category>/<name>.ts   # one named function per file
test/<category>/<name>.spec.ts
scripts/generate-catalog.ts
website/                   # Vite + React catalog docs, base /kit/
skills/                    # repo-local agent skills only
```

Categories: `array`, `object`, `string`, `function`, `number`, `is`, `date`, `promise`, `collection`, `math`. Shared types: `src/types/index.ts`. `src/promise/abort.ts` is internal — do not export it from `src/index.ts`.

## Adding a function

Source file + category `index.ts` re-export + Vitest spec + `pnpm docs:catalog`. Then `pnpm test` and `pnpm build`. Templates and JSDoc rules: [`skills/adding-kit-function/SKILL.md`](./skills/adding-kit-function/SKILL.md). Invariants: [`AGENTS.md`](./AGENTS.md).

## Constraints

- Named exports only. `sideEffects: false`. `"type": "module"`.
- Function names and primary argument order stay lodash-compatible.
- `remove` returns removed items and does not mutate the input.
- No `any` in public signatures.
- Docs site base path is `/kit/`.
- Skills stay in `skills/`. Do not install them to `~/.grok/skills` or `~/.agents/skills`.

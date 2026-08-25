# Contributing to @rabjs/kit

## Prerequisites

- Node.js `>= 20`
- pnpm `>= 10`

```bash
pnpm install
```

## Commands

```bash
pnpm test             # Vitest + coverage (90% branches/functions/lines/statements)
pnpm test:watch
pnpm typecheck
pnpm lint             # ESLint, zero warnings
pnpm prettier:check
pnpm prettier:fix
pnpm build            # tsdown (ESM + CJS + types)
pnpm docs:catalog     # regenerate catalog.ts and llms.txt from JSDoc
pnpm docs:dev         # Vite docs app
pnpm docs:build
```

## Adding a function

A new public function is four things — not an `exports` edit:

1. `src/<category>/<functionName>.ts` — one **named** export, JSDoc with `@param`, `@returns`, and a copy-pasteable `@example`.
2. Re-export from `src/<category>/index.ts`.
3. `test/<category>/<functionName>.spec.ts` (Vitest).
4. `pnpm docs:catalog`.

Then `pnpm test` and `pnpm build`. Never add `export default`. Never edit `package.json` `exports` (tsdown owns that field).

Agent walkthrough: [`skills/adding-kit-function/SKILL.md`](./skills/adding-kit-function/SKILL.md).

## Pull requests

- Keep function names and primary argument order lodash-compatible.
- `remove(array, predicate)` must return matching items and must not mutate `array`.
- No `any` in public signatures; tests use `as unknown as` when they need a bad input.
- Add a changeset (`pnpm changeset`) with the PR.
- Link related issues.

## Skills

The files under `skills/` are documentation for coding agents. This repository ships plugin manifests so Claude Code, Codex, Cursor, Grok, Kimi Code, OpenCode, and Pi can install them. Do not copy them to `~/.grok/skills` or `~/.agents/skills` — use the plugin command for your tool (see README).

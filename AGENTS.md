# AGENTS.md

Rules for coding agents working in this repository.

## Public API

- Named exports only. Never add `export default`.
- One public function per file: `src/<category>/<name>.ts`.
- `remove(array, predicate)` returns the matching items and does **not** mutate `array`.

## Adding or changing a function

1. Source file with JSDoc (`@param`, `@returns`, at least one `@example`).
2. Re-export from `src/<category>/index.ts`.
3. Vitest spec at `test/<category>/<name>.spec.ts`.
4. Run `pnpm docs:catalog` (do not hand-write `website/src/generated/catalog.ts`, `llms.txt`, or the inventory in `skills/using-rabjs-kit/SKILL.md`).
5. Never edit `package.json` `exports` — tsdown generates that map.

How-to: [`skills/adding-kit-function/SKILL.md`](./skills/adding-kit-function/SKILL.md).

## Verify

```bash
pnpm test
pnpm build
```

Coverage floor is 90% branches, functions, lines, and statements. Package manager is pnpm. Node `>= 20`.

## Skills

Skills live only under [`skills/`](./skills/). Install them into coding tools via this repository's plugin manifests (see README). Do not copy them to `~/.grok/skills` or `~/.agents/skills`.

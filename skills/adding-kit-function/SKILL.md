---
name: adding-kit-function
description: Use when adding or changing a public function in this @rabjs/kit repository.
---

# Adding a kit function

Consumer import styles and native-vs-kit guidance live in [`using-rabjs-kit`](../using-rabjs-kit/SKILL.md). Repo invariants: [`AGENTS.md`](../../AGENTS.md).

## Files

| Role            | Path                                                                             |
| --------------- | -------------------------------------------------------------------------------- |
| Implementation  | `src/<category>/<functionName>.ts`                                               |
| Category barrel | `src/<category>/index.ts` — add `export { functionName } from './functionName';` |
| Test            | `test/<category>/<functionName>.spec.ts`                                         |

One public function per file. Named export only — no `export default`. Do not edit `package.json` `exports`; `pnpm build` (tsdown) writes that map.

Do not re-export `src/promise/abort.ts` from public barrels. Do not hand-write `website/src/generated/catalog.ts` or `llms.txt`.

## JSDoc

Every public function needs a one-line summary, `@param`, `@returns`, and at least one copy-pasteable TypeScript `@example`.

```ts
/**
 * Splits an array into chunks of a specified size
 * @param array The array to chunk
 * @param size The size of each chunk
 * @returns An array of chunks
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(array: T[], size: number): T[][] {
  // ...
}
```

Public signatures: no `any` (generics or `unknown`). Names and primary argument order stay lodash-compatible.

## Vitest

```ts
import { describe, expect, it } from 'vitest';
import { chunk } from '../../src/array/chunk';

describe('chunk', () => {
  it('handles the happy path', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('handles edge cases', () => {
    expect(chunk([], 2)).toEqual([]);
    expect(chunk([1], 5)).toEqual([[1]]);
  });

  it('handles invalid input', () => {
    expect(chunk(null as unknown as number[], 2)).toEqual([]);
    expect(chunk([1, 2], 0)).toEqual([]);
  });
});
```

Cover happy path, edges, and invalid input. Coverage floor is 90% for branches, functions, lines, and statements.

## Catalog and verify

```bash
pnpm docs:catalog
pnpm test
pnpm build
```

`pnpm docs:catalog` refreshes `website/src/generated/catalog.ts` and `llms.txt` from JSDoc. `pnpm changeset` records the version bump for the PR.

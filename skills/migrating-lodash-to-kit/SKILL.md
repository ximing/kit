---
name: migrating-lodash-to-kit
description: Use when replacing lodash or lodash-es with @rabjs/kit.
---

# Migrating lodash to @rabjs/kit

Install `@rabjs/kit` and named-import the same function names. Primary argument order matches lodash for the functions we implement.

How to import (root / category / deep, no default): [`using-rabjs-kit`](../using-rabjs-kit/SKILL.md).

## Deep import equivalents

`lodash/<name>` and `lodash-es/<name>` map to `@rabjs/kit/<category>/<name>`:

| lodash path        | kit path                        |
| ------------------ | ------------------------------- |
| `lodash/chunk`     | `@rabjs/kit/array/chunk`        |
| `lodash/get`       | `@rabjs/kit/object/get`         |
| `lodash/debounce`  | `@rabjs/kit/function/debounce`  |
| `lodash/groupBy`   | `@rabjs/kit/collection/groupBy` |
| `lodash/isNil`     | `@rabjs/kit/is/isNil`           |
| `lodash/clamp`     | `@rabjs/kit/number/clamp`       |
| `lodash/camelCase` | `@rabjs/kit/string/camelCase`   |
| `lodash/max`       | `@rabjs/kit/math/max`           |

Same pattern for every name in the map below.

## Name map

Same name unless noted.

| Category   | Functions                                                                                                                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| array      | `chunk`, `compact`, `difference`, `drop`, `findIndex`, `flatten`, `flattenDeep`, `intersection`, `remove`, `take`, `union`, `uniq`, `uniqBy`, `zip`                                                                             |
| collection | `countBy`, `groupBy`, `keyBy`, `orderBy`, `partition`, `sample`, `sampleSize`, `shuffle`, `sortBy`                                                                                                                              |
| function   | `bind`, `curry`, `debounce`, `memoize`, `negate`, `once`, `partial`, `throttle`; `pipe` ≈ `_.flow`; `compose` ≈ `_.flowRight`                                                                                                   |
| is         | `isArray`, `isBoolean`, `isDate`, `isEmpty`, `isError`, `isFunction`, `isMap`, `isNil`, `isNull`, `isNumber`, `isObject`, `isPlainObject`, `isRegExp`, `isSet`, `isString`, `isSymbol`, `isUndefined`, `isWeakMap`, `isWeakSet` |
| math       | `max`, `maxBy`, `meanBy`, `min`, `minBy`, `sumBy`                                                                                                                                                                               |
| number     | `ceil`, `clamp`, `floor`, `inRange`, `mean`, `random`, `range`, `round`, `sum` (`median` has no lodash counterpart)                                                                                                             |
| object     | `clone`, `cloneDeep`, `entries`, `get`, `has`, `invert`, `keys`, `mapKeys`, `mapValues`, `merge`, `omit`, `pick`, `set`, `values` (`mergeDeep` is kit-only; lodash `merge` is already deep)                                     |
| string     | `camelCase`, `capitalize`, `kebabCase`, `lowerFirst`, `padEnd`, `padStart`, `repeat`, `snakeCase`, `trim`, `trimEnd`, `trimStart`, `truncate`, `upperFirst` (`pascalCase`, `template` are kit extras)                           |
| date       | kit-only (`format`, `parse`, `addDays`, …) — not lodash `date`                                                                                                                                                                  |
| promise    | kit-only (`retry`, `timeout`, `parallel`, `series`, `map`, `filter`, `reduce`). kit `delay` returns a `Promise`; lodash `delay` is `setTimeout` and returns a timer id                                                          |

`isPromise` is kit-only.

## `remove`

lodash `_.remove(array, predicate)` **mutates** `array` and returns the removed items.

kit `remove(array, predicate)` returns the removed items and **leaves `array` unchanged**.

```ts
const arr = [1, 2, 3, 4];
remove(arr, (n) => n % 2 === 0); // [2, 4]
arr; // [1, 2, 3, 4]
```

Keepers: `arr.filter((item, i) => !predicate(item, i))` or `partition`.

## Not provided

- `_.chain` / implicit chaining / lazy sequences
- `lodash/fp`
- Any lodash function not listed in the name map (no `assign`, `forEach`, `includes`, `template` lodash syntax, …)

Do not wrap kit calls in a chain helper to emulate `_.chain`. Call named functions.

# @rabjs/kit

![Build Status](https://github.com/ximing/kit/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/%40rabjs%2Fkit.svg)](https://badge.fury.io/js/%40rabjs%2Fkit)

A comprehensive TypeScript utility library with 100+ helper functions for arrays, objects, strings, functions, numbers, dates, promises, and more. Similar to lodash but with full TypeScript support and tree-shaking friendly.

## Features

- **TypeScript First**: Complete type definitions with full TypeScript support
- **Tree-shaking Friendly**: Only import what you need, reduce bundle size
- **High Test Coverage**: 90%+ test coverage with 675+ test cases
- **Multiple Module Formats**: CommonJS and ES Module support
- **Modern Tooling**: Built with Rollup, tested with Jest
- **100+ Functions**: Comprehensive utility library across 10+ categories

## Installation

```bash
npm install @rabjs/kit
# or
yarn add @rabjs/kit
# or
pnpm add @rabjs/kit
```

## Quick Start

### Import Everything

```typescript
import * as kit from '@rabjs/kit';

kit.chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
kit.debounce(() => console.log('hello'), 300);
```

### Import Specific Functions

```typescript
import { chunk, debounce } from '@rabjs/kit';

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
debounce(() => console.log('hello'), 300);
```

### Import from Submodules

```typescript
import { chunk } from '@rabjs/kit/array';
import { debounce } from '@rabjs/kit/function';

chunk([1, 2, 3, 4, 5], 2);
debounce(() => console.log('hello'), 300);
```

## API Documentation

### Array Functions

- `chunk(array, size)` - Split array into chunks
- `compact(array)` - Remove falsy values
- `flatten(array, depth)` - Flatten array
- `flattenDeep(array)` - Deep flatten
- `uniq(array)` - Remove duplicates
- `uniqBy(array, iteratee)` - Remove duplicates by condition
- `difference(...arrays)` - Get difference
- `intersection(...arrays)` - Get intersection
- `union(...arrays)` - Get union
- And more...

### Object Functions

- `clone(obj)` - Shallow clone
- `cloneDeep(obj)` - Deep clone
- `merge(target, ...sources)` - Merge objects
- `mergeDeep(target, ...sources)` - Deep merge
- `pick(obj, keys)` - Pick properties
- `omit(obj, keys)` - Omit properties
- `get(obj, path, defaultValue)` - Safe get
- `set(obj, path, value)` - Safe set
- And more...

### String Functions

- `camelCase(str)` - Convert to camelCase
- `kebabCase(str)` - Convert to kebab-case
- `snakeCase(str)` - Convert to snake_case
- `pascalCase(str)` - Convert to PascalCase
- `capitalize(str)` - Capitalize string
- `trim(str, chars)` - Trim characters
- `truncate(str, options)` - Truncate string
- And more...

### Function Utilities

- `debounce(func, wait, options)` - Debounce function
- `throttle(func, wait, options)` - Throttle function
- `once(func)` - Execute once
- `memoize(func, resolver)` - Cache results
- `curry(func, arity)` - Curry function
- `compose(...funcs)` - Compose functions
- `pipe(...funcs)` - Pipe functions
- And more...

### Number Functions

- `clamp(number, lower, upper)` - Clamp number
- `random(lower, upper, floating)` - Generate random number
- `round(number, precision)` - Round number
- `sum(numbers)` - Sum array
- `mean(numbers)` - Average
- `median(numbers)` - Median
- `range(start, end, step)` - Generate range
- And more...

### Type Checking

- `isArray(value)` - Check if array
- `isObject(value)` - Check if object
- `isString(value)` - Check if string
- `isNumber(value)` - Check if number
- `isFunction(value)` - Check if function
- `isPromise(value)` - Check if promise
- And more (20+ type checkers)...

### Date Functions

- `format(date, formatStr)` - Format date
- `parse(dateStr, formatStr)` - Parse date
- `addDays(date, amount)` - Add days
- `diffDays(date1, date2)` - Difference in days
- And more...

### Promise Utilities

- `delay(ms, value)` - Delay execution
- `retry(fn, options)` - Retry function
- `timeout(promise, ms, message)` - Promise timeout
- `parallel(tasks, concurrency)` - Run in parallel
- `series(tasks)` - Run in series
- And more...

### Collection Operations

- `groupBy(collection, iteratee)` - Group by property
- `keyBy(collection, iteratee)` - Create key-value map
- `sortBy(collection, iteratees)` - Sort collection
- `partition(collection, predicate)` - Partition collection
- `countBy(collection, iteratee)` - Count by property
- And more...

### Math Functions

- `max(numbers)` - Get maximum
- `min(numbers)` - Get minimum
- `maxBy(array, iteratee)` - Get max by condition
- `minBy(array, iteratee)` - Get min by condition
- And more...

## Usage Examples

### Array Operations

```typescript
import { chunk, compact, flatten, uniq } from '@rabjs/kit';

// Chunk array
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Remove falsy values
compact([0, 1, false, 2, '', 3]); // [1, 2, 3]

// Flatten array
flatten(
  [
    [1, 2],
    [3, [4, 5]],
  ],
  1,
); // [1, 2, 3, [4, 5]]

// Remove duplicates
uniq([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
```

### Object Operations

```typescript
import { get, set, pick, omit, merge } from '@rabjs/kit';

const obj = { a: { b: { c: 1 } } };

// Safe get
get(obj, 'a.b.c'); // 1
get(obj, 'a.x.y', 'default'); // 'default'

// Safe set
set(obj, 'a.b.d', 2); // { a: { b: { c: 1, d: 2 } } }

// Pick properties
pick(obj, ['a']); // { a: { b: { c: 1 } } }

// Omit properties
omit(obj, ['a']); // {}

// Merge objects
merge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
```

### Function Utilities

```typescript
import { debounce, throttle, once } from '@rabjs/kit';

// Debounce
const handleSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// Throttle
const handleScroll = throttle(() => {
  console.log('Scrolling...');
}, 1000);

// Execute once
const handleInit = once(() => {
  console.log('Initializing...');
});
```

### String Operations

```typescript
import { camelCase, kebabCase, capitalize } from '@rabjs/kit';

camelCase('hello-world'); // 'helloWorld'
kebabCase('helloWorld'); // 'hello-world'
capitalize('hello'); // 'Hello'
```

## Browser Support

- Chrome >= 70
- Safari >= 12
- Firefox >= 65
- Edge >= 79

## Node.js Support

- Node.js >= 12

## Contributing

We welcome contributions! Please read our [contributing guidelines](./CONTRIBUTING.md) to get started.

## License

MIT

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

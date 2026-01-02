---
sidebar_position: 3
---

# Usage Guide

## Basic Usage

### Import a Single Function

```typescript
import { chunk } from '@rabjs/kit';

const result = chunk([1, 2, 3, 4, 5], 2);
console.log(result); // [[1, 2], [3, 4], [5]]
```

### Import Multiple Functions

```typescript
import { chunk, compact, flatten } from '@rabjs/kit';

const arr = [1, null, 2, undefined, 3];
const cleaned = compact(arr);
console.log(cleaned); // [1, 2, 3]
```

### Import Entire Module

```typescript
import * as kit from '@rabjs/kit';

const result = kit.chunk([1, 2, 3, 4], 2);
```

## By Category

@rabjs/kit provides utility functions across multiple categories:

### Array Operations

```typescript
import { chunk, compact, flatten, union, intersection } from '@rabjs/kit';

// Chunking
const chunks = chunk([1, 2, 3, 4, 5], 2);

// Compacting (removing falsy values)
const cleaned = compact([1, null, 2, undefined, 3, false]);

// Flattening
const flat = flatten([
  [1, 2],
  [3, [4, 5]],
]);

// Union
const combined = union([1, 2], [2, 3]);

// Intersection
const common = intersection([1, 2, 3], [2, 3, 4]);
```

### Object Operations

```typescript
import { pick, omit, merge, keys, values } from '@rabjs/kit';

const obj = { a: 1, b: 2, c: 3 };

// Select specific properties
const selected = pick(obj, 'a', 'b');

// Exclude specific properties
const excluded = omit(obj, 'c');

// Merge objects
const merged = merge({ a: 1 }, { b: 2 });

// Get all keys
const allKeys = keys(obj);

// Get all values
const allValues = values(obj);
```

### String Operations

```typescript
import { capitalize, camelCase, kebabCase, trim } from '@rabjs/kit';

// Capitalize first letter
const capitalized = capitalize('hello');

// Convert to camelCase
const camel = camelCase('hello-world');

// Convert to kebab-case
const kebab = kebabCase('helloWorld');

// Trim whitespace
const trimmed = trim('  hello  ');
```

### Type Checking

```typescript
import { isArray, isObject, isString, isEmpty, isNil } from '@rabjs/kit';

isArray([1, 2, 3]); // true
isObject({ a: 1 }); // true
isString('hello'); // true
isEmpty([]); // true
isEmpty({}); // true
isNil(null); // true
isNil(undefined); // true
```

### Function Utilities

```typescript
import { debounce, throttle, memoize, compose, pipe } from '@rabjs/kit';

// Debounce
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// Throttle
const throttledScroll = throttle(() => {
  console.log('Scrolling...');
}, 500);

// Memoization
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// Function composition
const add = (a) => (b) => a + b;
const multiply = (a) => (b) => a * b;
const composed = compose(multiply(2), add(3));

// Function piping
const piped = pipe(add(1), multiply(2)); // (x) => (x + 1) * 2
```

## Next Steps

- 🔧 Browse [API Documentation](/docs/api/array) to explore all functions
- 📝 See [TypeScript Support](./typescript.md) for advanced type usage
- 💡 Check [Common Patterns](./examples/common-patterns.md) for more examples

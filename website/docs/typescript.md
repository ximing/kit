---
sidebar_position: 4
---

# TypeScript Support

@rabjs/kit is written 100% in TypeScript and provides complete type support and inference.

## Type Inference

All functions provide complete type inference, enabling autocompletion and type checking:

```typescript
import { chunk } from '@rabjs/kit';

// Types are automatically inferred
const result = chunk([1, 2, 3, 4], 2);
// result type: number[][]

const stringChunk = chunk(['a', 'b', 'c'], 2);
// stringChunk type: string[][]
```

## Generic Types

Many functions use generic types, allowing you to work with any data type:

```typescript
import { compact, isEmpty } from '@rabjs/kit';

// Work with any array type
const numbers = compact([1, null, 2, undefined, 3]);
// Type: number[]

const strings = compact(['a', null, 'b', undefined, 'c']);
// Type: string[]

// Work with any object type
isEmpty({}); // true
isEmpty([]); // true
isEmpty(''); // true
isEmpty(null); // false
isEmpty(undefined); // false
```

## Type Definitions

All type definitions are available in the `dist/types` directory:

```typescript
import type { ChunkOptions, CompactOptions } from '@rabjs/kit';

interface ChunkOptions {
  size: number;
}

interface CompactOptions {
  falsy?: boolean;
}
```

## Conditional Types

Some functions use conditional types to provide more precise type inference:

```typescript
import { pick, omit } from '@rabjs/kit';

const obj = { a: 1, b: 'hello', c: true };

// pick returns a subtype with selected properties
const picked = pick(obj, 'a', 'b');
// Type: { a: number; b: string }

// omit returns a type with excluded properties
const omitted = omit(obj, 'c');
// Type: { a: number; b: string }
```

## Strict Mode

@rabjs/kit fully supports TypeScript's strict mode:

```typescript
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

## Importing Types

You can import function type definitions:

```typescript
import type { Chunk, Compact, Pick, Omit } from '@rabjs/kit';

const myChunk: Chunk = (arr, size) => {
  // Implementation
};
```

## Best Practices

### 1. Use Type Inference

```typescript
import { chunk } from '@rabjs/kit';

// ✅ Good - Let TypeScript infer the type
const result = chunk([1, 2, 3], 2);

// ❌ Not good - Unnecessary type annotation
const result: number[][] = chunk([1, 2, 3], 2);
```

### 2. Use `as const` for Precise Types

```typescript
import { pick } from '@rabjs/kit';

const keys = ['a', 'b'] as const;
const obj = { a: 1, b: 2, c: 3 };

// Now picked has type { a: number; b: number }
const picked = pick(obj, ...keys);
```

### 3. Handle null/undefined

```typescript
import { isNil, compact } from '@rabjs/kit';

const data = [1, null, 2, undefined, 3];

// Use compact to remove null/undefined
const cleaned = compact(data);
// Type: number[]

// Or use type guards
if (!isNil(data)) {
  // Now data doesn't include null/undefined
}
```

## Next Steps

- 🔧 Browse [API Documentation](/docs/api/array) to explore all functions
- 💡 Check [Common Patterns](./examples/common-patterns.md) for more examples

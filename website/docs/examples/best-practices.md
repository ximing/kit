---
sidebar_position: 3
---

# Best Practices

This guide provides best practices and optimization tips for using @rabjs/kit effectively.

## Performance Optimization

### Tree-shaking

Import only the functions you need to minimize bundle size:

```typescript
// ✅ Good - Tree-shaking friendly
import { chunk, compact } from '@rabjs/kit';

// ❌ Avoid - Imports everything
import * as kit from '@rabjs/kit';
const result = kit.chunk([1, 2, 3], 2);
```

### Memoization for Expensive Operations

Use memoization to cache results of expensive computations:

```typescript
import { memoize, fibonacci } from '@rabjs/kit';

// Without memoization
function slowFibonacci(n: number): number {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
}

// With memoization
const fastFibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fastFibonacci(n - 1) + fastFibonacci(n - 2);
});

console.time('slow');
slowFibonacci(35); // ~150ms
console.timeEnd('slow');

console.time('fast');
fastFibonacci(35); // ~2ms
console.timeEnd('fast');
```

### Debounce and Throttle for Event Handlers

Optimize performance by limiting the frequency of event handler calls:

```typescript
import { debounce, throttle } from '@rabjs/kit';

// Debounce: Wait for user to stop typing before searching
const handleSearch = debounce((query: string) => {
  // API call
  fetchSearchResults(query);
}, 300);

// Throttle: Limit scroll event frequency
const handleScroll = throttle(() => {
  // Update UI based on scroll position
  updateScrollPosition();
}, 100);
```

## Type Safety

### Leverage TypeScript's Type Inference

Let TypeScript infer types automatically:

```typescript
import { pick, omit } from '@rabjs/kit';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  password: 'secret',
};

// ✅ Type is inferred as Pick<User, 'id' | 'name' | 'email'>
const publicUser = pick(user, ['id', 'name', 'email']);

// ✅ Type is inferred as Omit<User, 'password'>
const safeUser = omit(user, ['password']);
```

### Use Type Guards

Combine type checking functions with TypeScript's type narrowing:

```typescript
import { isArray, isObject, isString } from '@rabjs/kit';

function processValue(value: unknown): string {
  if (isString(value)) {
    // TypeScript knows value is string here
    return value.toUpperCase();
  }

  if (isArray(value)) {
    // TypeScript knows value is array here
    return value.join(', ');
  }

  if (isObject(value)) {
    // TypeScript knows value is object here
    return JSON.stringify(value);
  }

  return String(value);
}
```

## Error Handling

### Graceful Error Handling with Retry

Use retry for network requests and other operations that might fail:

```typescript
import { retry, timeout } from '@rabjs/kit';

async function fetchDataWithRetry() {
  try {
    const data = await retry(
      async () => {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) throw new Error('Request failed');
        return response.json();
      },
      {
        maxAttempts: 3,
        delay: 1000,
        backoff: 2, // Exponential backoff
      },
    );

    return data;
  } catch (error) {
    console.error('Failed after 3 attempts:', error);
    throw error;
  }
}
```

### Timeout Control

Prevent operations from hanging indefinitely:

```typescript
import { timeout } from '@rabjs/kit';

async function fetchWithTimeout() {
  try {
    const data = await timeout(fetch('https://api.example.com/data'), 5000);
    return data;
  } catch (error) {
    if (error.message === 'Operation timed out') {
      console.error('Request took too long');
    }
    throw error;
  }
}
```

## Data Transformation Patterns

### Chain Operations for Cleaner Code

Use pipe or compose for complex data transformations:

```typescript
import { pipe, map, filter, sortBy } from '@rabjs/kit';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1000, inStock: true },
  { id: 2, name: 'Mouse', price: 20, inStock: false },
  { id: 3, name: 'Keyboard', price: 50, inStock: true },
];

// Without pipe
const availableProducts = products.filter((p) => p.inStock).sort((a, b) => a.price - b.price);

// With pipe (more readable for complex transformations)
const transformProducts = pipe(
  (prods: Product[]) => prods.filter((p) => p.inStock),
  (prods) => prods.sort((a, b) => a.price - b.price),
  (prods) => prods.map((p) => ({ ...p, name: p.name.toUpperCase() })),
);

const result = transformProducts(products);
```

### Use groupBy for Data Aggregation

Group data for easier manipulation:

```typescript
import { groupBy, mapValues, sumBy } from '@rabjs/kit';

interface Sale {
  id: number;
  product: string;
  category: string;
  amount: number;
  date: string;
}

const sales: Sale[] = [
  { id: 1, product: 'Laptop', category: 'Electronics', amount: 1000, date: '2024-01-01' },
  { id: 2, product: 'Mouse', category: 'Electronics', amount: 20, date: '2024-01-01' },
  { id: 3, product: 'Desk', category: 'Furniture', amount: 300, date: '2024-01-02' },
];

// Group by category
const byCategory = groupBy(sales, 'category');

// Calculate total sales per category
const totalsByCategory = mapValues(byCategory, (items) => sumBy(items, 'amount'));

console.log(totalsByCategory);
// { Electronics: 1020, Furniture: 300 }
```

## Common Pitfalls and Solutions

### Avoid Mutating Original Arrays

Functions like `chunk`, `compact`, and `flatten` return new arrays:

```typescript
import { chunk } from '@rabjs/kit';

const original = [1, 2, 3, 4, 5];
const chunked = chunk(original, 2);

// ✅ Original array is unchanged
console.log(original); // [1, 2, 3, 4, 5]
console.log(chunked); // [[1, 2], [3, 4], [5]]
```

### Deep vs Shallow Clone

Understand the difference between shallow and deep cloning:

```typescript
import { clone, cloneDeep } from '@rabjs/kit';

const original = {
  name: 'Alice',
  address: {
    city: 'New York',
    zip: '10001',
  },
};

// Shallow clone - nested objects are still referenced
const shallow = clone(original);
shallow.address.city = 'Los Angeles';
console.log(original.address.city); // 'Los Angeles' (mutated!)

// Deep clone - completely independent copy
const deep = cloneDeep(original);
deep.address.city = 'Chicago';
console.log(original.address.city); // 'Los Angeles' (unchanged)
```

### isEmpty vs isNil

Know the difference between checking for empty values and null/undefined:

```typescript
import { isEmpty, isNil } from '@rabjs/kit';

isEmpty(null); // false
isEmpty(undefined); // false
isEmpty([]); // true
isEmpty({}); // true
isEmpty(''); // true

isNil(null); // true
isNil(undefined); // true
isNil([]); // false
isNil({}); // false
isNil(''); // false
```

## Testing Tips

### Unit Testing with @rabjs/kit

Example using Jest:

```typescript
import { chunk, compact } from '@rabjs/kit';

describe('Array utilities', () => {
  test('chunk should split array correctly', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
    expect(chunk([], 2)).toEqual([]);
  });

  test('compact should remove falsy values', () => {
    expect(compact([0, 1, false, 2, '', 3, null, undefined, 4])).toEqual([1, 2, 3, 4]);
  });
});
```

### Mocking Debounced Functions

When testing debounced functions:

```typescript
import { debounce } from '@rabjs/kit';

describe('Debounced search', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should debounce search calls', () => {
    const mockSearch = jest.fn();
    const debouncedSearch = debounce(mockSearch, 300);

    debouncedSearch('a');
    debouncedSearch('ab');
    debouncedSearch('abc');

    expect(mockSearch).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith('abc');
  });
});
```

## Next Steps

- 🔧 Browse [API Documentation](/docs/api/array) for complete function references
- 📖 Check [Common Patterns](./common-patterns.md) for more examples
- 💡 Read [Usage Guide](../usage.md) for basic usage patterns

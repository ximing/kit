---
sidebar_position: 2
---

# Common Patterns

This document showcases common programming patterns and solutions using @rabjs/kit.

## Data Processing

### Deduplication and Sorting

```typescript
import { uniq, orderBy } from '@rabjs/kit';

const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5];

// Remove duplicates
const unique = uniq(numbers);
// => [3, 1, 4, 5, 9, 2, 6]

// Sort
const sorted = orderBy(numbers);
// => [1, 1, 2, 3, 4, 5, 5, 6, 9]
```

### Grouping and Counting

```typescript
import { groupBy, countBy } from '@rabjs/kit';

const users = [
  { name: 'Alice', age: 25, city: 'New York' },
  { name: 'Bob', age: 30, city: 'Los Angeles' },
  { name: 'Charlie', age: 25, city: 'New York' },
];

// Group by city
const byCity = groupBy(users, 'city');
// => {
//   'New York': [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
//   'Los Angeles': [{ name: 'Bob', ... }]
// }

// Count by age
const ageCount = countBy(users, 'age');
// => { '25': 2, '30': 1 }
```

### Data Mapping

```typescript
import { map, pick } from '@rabjs/kit';

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', password: '...' },
  { id: 2, name: 'Bob', email: 'bob@example.com', password: '...' },
];

// Extract specific fields
const publicUsers = users.map((user) => pick(user, 'id', 'name', 'email'));
// => [
//   { id: 1, name: 'Alice', email: 'alice@example.com' },
//   { id: 2, name: 'Bob', email: 'bob@example.com' }
// ]
```

## Function Utilities

### Debounce and Throttle

```typescript
import { debounce, throttle } from '@rabjs/kit';

// Debounce search input
const search = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// Listen to input events
document.querySelector('#search').addEventListener('input', (e) => {
  search(e.target.value);
});

// Throttle scroll events
const handleScroll = throttle(() => {
  console.log('User is scrolling...');
}, 500);

window.addEventListener('scroll', handleScroll);
```

### Function Composition and Piping

```typescript
import { compose, pipe } from '@rabjs/kit';

const add = (a) => (b) => a + b;
const multiply = (a) => (b) => a * b;
const square = (x) => x * x;

// Function composition: right to left
// f(g(h(x)))
const composedFn = compose(square, multiply(2), add(3));
console.log(composedFn(5)); // ((5 + 3) * 2) ^ 2 = 256

// Function piping: left to right
// h(g(f(x)))
const pipedFn = pipe(add(3), multiply(2), square);
console.log(pipedFn(5)); // ((5 + 3) * 2) ^ 2 = 256
```

### Memoization

```typescript
import { memoize } from '@rabjs/kit';

// Calculate Fibonacci sequence
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.time('First call');
console.log(fibonacci(40)); // 102334155
console.timeEnd('First call'); // ~50ms

console.time('Second call');
console.log(fibonacci(40)); // 102334155
console.timeEnd('Second call'); // ~0ms
```

## Type Checking and Validation

### Conditional Processing

```typescript
import { isArray, isObject, isString, isEmpty } from '@rabjs/kit';

function processData(data) {
  if (isArray(data)) {
    return data.map((item) => processData(item));
  } else if (isObject(data)) {
    return Object.entries(data).map(([key, value]) => ({
      key,
      value: processData(value),
    }));
  } else if (isString(data)) {
    return data.toUpperCase();
  } else {
    return data;
  }
}
```

### Data Validation

```typescript
import { isEmail, isUrl, isPhoneNumber, isValidDate } from '@rabjs/kit';

function validateForm(formData) {
  const errors = [];

  if (!isEmail(formData.email)) {
    errors.push('Invalid email address');
  }

  if (!isPhoneNumber(formData.phone)) {
    errors.push('Invalid phone number');
  }

  if (formData.website && !isUrl(formData.website)) {
    errors.push('Invalid website URL');
  }

  if (!isValidDate(formData.birthDate)) {
    errors.push('Invalid birth date');
  }

  return errors;
}
```

## Object and Array Operations

### Deep Merge

```typescript
import { merge } from '@rabjs/kit';

const defaultConfig = {
  timeout: 5000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
  },
};

const userConfig = {
  timeout: 10000,
  headers: {
    Authorization: 'Bearer token',
  },
};

const finalConfig = merge(defaultConfig, userConfig);
// => {
//   timeout: 10000,
//   retries: 3,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer token'
//   }
// }
```

### Array Operations

```typescript
import { chunk, flatten, union, intersection, difference } from '@rabjs/kit';

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];

// Process large arrays in batches
const batches = chunk(arr1, 2);
// => [[1, 2], [3, 4], [5]]

// Flatten nested arrays
const nested = [
  [1, 2],
  [3, [4, 5]],
];
const flat = flatten(nested);
// => [1, 2, 3, 4, 5]

// Union
const combined = union(arr1, arr2);
// => [1, 2, 3, 4, 5, 6, 7]

// Intersection
const common = intersection(arr1, arr2);
// => [3, 4, 5]

// Difference
const diff = difference(arr1, arr2);
// => [1, 2]
```

## String Processing

### String Transformation

```typescript
import { capitalize, camelCase, kebabCase, snakeCase, pascalCase } from '@rabjs/kit';

const text = 'hello world';

capitalize(text);
// => 'Hello world'

camelCase(text);
// => 'helloWorld'

kebabCase(text);
// => 'hello-world'

snakeCase(text);
// => 'hello_world'

pascalCase(text);
// => 'HelloWorld'
```

### String Manipulation

```typescript
import { trim, padStart, padEnd, repeat } from '@rabjs/kit';

const text = '  hello  ';

trim(text);
// => 'hello'

padStart(text, 15, '*');
// => '****  hello  '

padEnd(text, 15, '*');
// => '  hello  ****'

repeat('ab', 3);
// => 'ababab'
```

## Async Operations

### Delay and Timeout

```typescript
import { delay, timeout } from '@rabjs/kit';

// Delayed execution
async function delayedGreeting() {
  console.log('Waiting...');
  await delay(2000);
  console.log('Hello after 2 seconds!');
}

// Timeout control
async function fetchWithTimeout() {
  try {
    const data = await timeout(fetch('https://api.example.com/data'), 5000);
    console.log(data);
  } catch (error) {
    console.error('Request timeout or failed');
  }
}
```

## Next Steps

- 🔧 Browse [API Documentation](/docs/api/array) to explore all functions
- 📝 See [Usage Guide](../usage.md) for more information

---
id: parallel
title: parallel
description: 'Executes multiple promises in parallel with a concurrency limit.'
---

# `parallel`

Executes multiple promises in parallel with a concurrency limit.

## Parameters

| Parameter     | Type  | Description                                                     |
| ------------- | ----- | --------------------------------------------------------------- |
| `tasks`       | `any` | - An array of functions that return promises                    |
| `concurrency` | `any` | - The maximum number of concurrent promises (default: Infinity) |

## Returns

- **Type**: `any`
- **Description**: Returns a promise that resolves with an array of results in the same order as tasks

## Examples

```typescript
* const results = await parallel([
 *   () => fetchUser(1),
 *   () => fetchUser(2),
 *   () => fetchUser(3)
 * ], 2); // Max 2 concurrent requests
 *
 *
```

```typescript
* const results = await parallel([
 *   () => delay(100, 'a'),
 *   () => delay(50, 'b'),
 *   () => delay(150, 'c')
 * ]); // Executes all at once
```

## Interactive Example

```tsx live
function parallelExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`parallel` Example</h4>
      <p>Executes multiple promises in parallel with a concurrency limit.</p>
    </div>
  );
}
```

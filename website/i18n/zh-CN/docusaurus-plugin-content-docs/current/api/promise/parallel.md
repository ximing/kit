---
id: parallel
title: parallel
description: 'Executes multiple promises in parallel with a concurrency limit.'
---

# `parallel`

Executes multiple promises in parallel with a concurrency limit.

## 参数

| 参数          | 类型  | 描述                                                            |
| ------------- | ----- | --------------------------------------------------------------- |
| `tasks`       | `any` | - An array of functions that return promises                    |
| `concurrency` | `any` | - The maximum number of concurrent promises (default: Infinity) |

## 返回值

- **类型**: `any`
- **描述**: Returns a promise that resolves with an array of results in the same order as tasks

## 示例

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

## 交互式示例

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

---
id: map
title: map
description: 'Iterates over an array and returns a promise that resolves with an array of mapped values. Supports concurrency limiting.'
---

# `map`

Iterates over an array and returns a promise that resolves with an array of mapped values.
Supports concurrency limiting.

## 参数

| 参数          | 类型  | 描述                                                                       |
| ------------- | ----- | -------------------------------------------------------------------------- |
| `array`       | `any` | - The array to iterate over                                                |
| `mapper`      | `any` | - The function to apply to each element (can be async or return a promise) |
| `concurrency` | `any` | - The maximum number of concurrent operations (default: Infinity)          |

## 返回值

- **类型**: `any`
- **描述**: Returns a promise that resolves with an array of mapped values in the same order

## 示例

```typescript
* const ids = [1, 2, 3];
 * const users = await map(ids, (id) => fetchUser(id), 2); // Max 2 concurrent requests
 *
 *
```

```typescript
* const numbers = [1, 2, 3];
 * const doubled = await map(numbers, (n) => Promise.resolve(n * 2));
```

## 交互式示例

```tsx live
function mapExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`map` Example</h4>
      <p>
        Iterates over an array and returns a promise that resolves with an array of mapped values. Supports concurrency
        limiting.
      </p>
    </div>
  );
}
```

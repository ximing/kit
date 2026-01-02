---
id: reduce
title: reduce
description: 'Iterates over an array and reduces it to a single value using an async reducer function.'
---

# `reduce`

Iterates over an array and reduces it to a single value using an async reducer function.

## 参数

| 参数           | 类型  | 描述                                                                     |
| -------------- | ----- | ------------------------------------------------------------------------ |
| `array`        | `any` | - The array to reduce                                                    |
| `reducer`      | `any` | - The function to reduce each element (can be async or return a promise) |
| `initialValue` | `any` | - The initial value for the accumulator                                  |

## 返回值

- **类型**: `any`
- **描述**: Returns a promise that resolves with the final accumulated value

## 示例

```typescript
* const sum = await reduce(
 *   [1, 2, 3, 4],
 *   (acc, value) => Promise.resolve(acc + value),
 *   0
 * ); // => 10
 *
 *
```

```typescript
* const users = await reduce(
 *   [1, 2, 3],
 *   async (acc, id) => {
 *     const user = await fetchUser(id);
 *     return [...acc, user];
 *   },
 *   []
 * );
```

## 交互式示例

```tsx live
function reduceExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`reduce` Example</h4>
      <p>Iterates over an array and reduces it to a single value using an async reducer function.</p>
    </div>
  );
}
```

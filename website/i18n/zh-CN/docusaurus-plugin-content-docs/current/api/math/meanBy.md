---
id: meanBy
title: meanBy
description: 'This method is like mean except that it accepts iteratee which is invoked for each element in array to generate the value to be averaged. The iteratee is invoked with one argument: (value).'
---

# `meanBy`

This method is like mean except that it accepts iteratee which is invoked for each element
in array to generate the value to be averaged.
The iteratee is invoked with one argument: (value).

## 参数

| 参数       | 类型  | 描述                               |
| ---------- | ----- | ---------------------------------- |
| `array`    | `any` | - The array to iterate over        |
| `iteratee` | `any` | - The iteratee invoked per element |

## 返回值

- **类型**: `any`
- **描述**: Returns the mean

## 示例

```typescript
* meanBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => 2
 * meanBy([], (o) => o.n) // => 0
```

## 交互式示例

```tsx live
function meanByExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`meanBy` Example</h4>
      <p>
        This method is like mean except that it accepts iteratee which is invoked for each element in array to generate
        the value to be averaged. The iteratee is invoked with one argument: (value).
      </p>
    </div>
  );
}
```

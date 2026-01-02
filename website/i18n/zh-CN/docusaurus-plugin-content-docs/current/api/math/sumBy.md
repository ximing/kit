---
id: sumBy
title: sumBy
description: 'This method is like sum except that it accepts iteratee which is invoked for each element in array to generate the value to be summed. The iteratee is invoked with one argument: (value).'
---

# `sumBy`

This method is like sum except that it accepts iteratee which is invoked for each element
in array to generate the value to be summed.
The iteratee is invoked with one argument: (value).

## 参数

| 参数       | 类型  | 描述                               |
| ---------- | ----- | ---------------------------------- |
| `array`    | `any` | - The array to iterate over        |
| `iteratee` | `any` | - The iteratee invoked per element |

## 返回值

- **类型**: `any`
- **描述**: Returns the sum

## 示例

```typescript
* sumBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => 6
 * sumBy([], (o) => o.n) // => 0
```

## 交互式示例

```tsx live
function sumByExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`sumBy` Example</h4>
      <p>
        This method is like sum except that it accepts iteratee which is invoked for each element in array to generate
        the value to be summed. The iteratee is invoked with one argument: (value).
      </p>
    </div>
  );
}
```

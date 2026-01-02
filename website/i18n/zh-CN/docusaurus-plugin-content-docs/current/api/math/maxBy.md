---
id: maxBy
title: maxBy
description: 'This method is like max except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked. The iteratee is invoked with one argument: (value).'
---

# `maxBy`

This method is like max except that it accepts iteratee which is invoked for each element
in array to generate the criterion by which the value is ranked.
The iteratee is invoked with one argument: (value).

## 参数

| 参数       | 类型  | 描述                               |
| ---------- | ----- | ---------------------------------- |
| `array`    | `any` | - The array to iterate over        |
| `iteratee` | `any` | - The iteratee invoked per element |

## 返回值

- **类型**: `any`
- **描述**: Returns the maximum value

## 示例

```typescript
* maxBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => { n: 3 }
 * maxBy([], (o) => o.n) // => undefined
```

## 交互式示例

```tsx live
function maxByExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`maxBy` Example</h4>
      <p>
        This method is like max except that it accepts iteratee which is invoked for each element in array to generate
        the criterion by which the value is ranked. The iteratee is invoked with one argument: (value).
      </p>
    </div>
  );
}
```

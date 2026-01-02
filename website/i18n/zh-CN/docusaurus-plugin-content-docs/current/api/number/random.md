---
id: random
title: random
description: 'Produces a random number between the inclusive lower and upper bounds. If only one argument is provided, a number between 0 and the given number is returned.'
---

# `random`

Produces a random number between the inclusive lower and upper bounds.
If only one argument is provided, a number between 0 and the given number is returned.

## 参数

| 参数       | 类型  | 描述                                                      |
| ---------- | ----- | --------------------------------------------------------- |
| `lower`    | `any` | - The lower bound or upper bound if upper is not provided |
| `upper`    | `any` | - The upper bound                                         |
| `floating` | `any` | - Specify returning a floating-point number               |

## 返回值

- **类型**: `any`
- **描述**: Returns the random number

## 示例

```typescript
* random(5) // => random number between 0 and 5
 * random(5, 10) // => random number between 5 and 10
 * random(5, 10, true) // => random floating-point number between 5 and 10
```

## 交互式示例

```tsx live
function randomExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`random` Example</h4>
      <p>
        Produces a random number between the inclusive lower and upper bounds. If only one argument is provided, a
        number between 0 and the given number is returned.
      </p>
    </div>
  );
}
```

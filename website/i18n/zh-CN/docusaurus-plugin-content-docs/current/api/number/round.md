---
id: round
title: round
description: 'Rounds number to precision.'
---

# `round`

Rounds number to precision.

## 参数

| 参数        | 类型  | 描述                                     |
| ----------- | ----- | ---------------------------------------- |
| `number`    | `any` | - The number to round                    |
| `precision` | `any` | - The precision to round to (default: 0) |

## 返回值

- **类型**: `any`
- **描述**: Returns the rounded number

## 示例

```typescript
* round(4.006) // => 4
 * round(4.006, 2) // => 4.01
 * round(4060, -2) // => 4100
```

## 交互式示例

```tsx live
function roundExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`round` Example</h4>
      <p>Rounds number to precision.</p>
    </div>
  );
}
```

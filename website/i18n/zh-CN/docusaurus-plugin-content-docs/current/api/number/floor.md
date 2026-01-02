---
id: floor
title: floor
description: 'Rounds number down to precision.'
---

# `floor`

Rounds number down to precision.

## 参数

| 参数        | 类型  | 描述                                          |
| ----------- | ----- | --------------------------------------------- |
| `number`    | `any` | - The number to round down                    |
| `precision` | `any` | - The precision to round down to (default: 0) |

## 返回值

- **类型**: `any`
- **描述**: Returns the rounded down number

## 示例

```typescript
* floor(4.006) // => 4
 * floor(4.006, 2) // => 4.00
 * floor(4060, -2) // => 4000
```

## 交互式示例

```tsx live
function floorExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`floor` Example</h4>
      <p>Rounds number down to precision.</p>
    </div>
  );
}
```

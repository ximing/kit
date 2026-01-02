---
id: clamp
title: clamp
description: 'Clamps number within the inclusive lower and upper bounds.'
---

# `clamp`

Clamps number within the inclusive lower and upper bounds.

## 参数

| 参数     | 类型  | 描述                  |
| -------- | ----- | --------------------- |
| `number` | `any` | - The number to clamp |
| `lower`  | `any` | - The lower bound     |
| `upper`  | `any` | - The upper bound     |

## 返回值

- **类型**: `any`
- **描述**: Returns the clamped number

## 示例

```typescript
* clamp(10, 5, 15) // => 10
 * clamp(3, 5, 15) // => 5
 * clamp(20, 5, 15) // => 15
```

## 交互式示例

```tsx live
function clampExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`clamp` Example</h4>
      <p>Clamps number within the inclusive lower and upper bounds.</p>
    </div>
  );
}
```

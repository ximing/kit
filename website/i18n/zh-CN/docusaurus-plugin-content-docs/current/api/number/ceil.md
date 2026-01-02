---
id: ceil
title: ceil
description: 'Rounds number up to precision.'
---

# `ceil`

Rounds number up to precision.

## 参数

| 参数        | 类型  | 描述                                        |
| ----------- | ----- | ------------------------------------------- |
| `number`    | `any` | - The number to round up                    |
| `precision` | `any` | - The precision to round up to (default: 0) |

## 返回值

- **类型**: `any`
- **描述**: Returns the rounded up number

## 示例

```typescript
* ceil(4.006) // => 5
 * ceil(4.006, 2) // => 4.01
 * ceil(4060, -2) // => 4100
```

## 交互式示例

```tsx live
function ceilExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`ceil` Example</h4>
      <p>Rounds number up to precision.</p>
    </div>
  );
}
```

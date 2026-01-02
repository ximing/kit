---
id: isNull
title: isNull
description: 'Checks if value is null.'
---

# `isNull`

Checks if value is null.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is null, else false

## 示例

```typescript
* isNull(null) // => true
 * isNull(undefined) // => false
 * isNull(0) // => false
 * isNull('') // => false
```

## 交互式示例

```tsx live
function isNullExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isNull` Example</h4>
      <p>Checks if value is null.</p>
    </div>
  );
}
```

---
id: isUndefined
title: isUndefined
description: 'Checks if value is undefined.'
---

# `isUndefined`

Checks if value is undefined.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is undefined, else false

## 示例

```typescript
* isUndefined(undefined) // => true
 * isUndefined(void 0) // => true
 * isUndefined(null) // => false
 * isUndefined(0) // => false
```

## 交互式示例

```tsx live
function isUndefinedExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isUndefined` Example</h4>
      <p>Checks if value is undefined.</p>
    </div>
  );
}
```

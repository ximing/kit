---
id: isNil
title: isNil
description: 'Checks if value is null or undefined.'
---

# `isNil`

Checks if value is null or undefined.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is null or undefined, else false

## 示例

```typescript
* isNil(null) // => true
 * isNil(undefined) // => true
 * isNil(void 0) // => true
 * isNil(0) // => false
 * isNil('') // => false
```

## 交互式示例

```tsx live
function isNilExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isNil` Example</h4>
      <p>Checks if value is null or undefined.</p>
    </div>
  );
}
```

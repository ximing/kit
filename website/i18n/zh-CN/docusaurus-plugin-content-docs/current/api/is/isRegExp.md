---
id: isRegExp
title: isRegExp
description: 'Checks if value is a RegExp object.'
---

# `isRegExp`

Checks if value is a RegExp object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a RegExp object, else false

## 示例

```typescript
* isRegExp(/abc/) // => true
 * isRegExp(new RegExp('abc')) // => true
 * isRegExp('/abc/') // => false
```

## 交互式示例

```tsx live
function isRegExpExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isRegExp` Example</h4>
      <p>Checks if value is a RegExp object.</p>
    </div>
  );
}
```

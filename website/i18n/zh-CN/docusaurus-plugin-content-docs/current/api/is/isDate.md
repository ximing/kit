---
id: isDate
title: isDate
description: 'Checks if value is a Date object.'
---

# `isDate`

Checks if value is a Date object.

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to check |

## 返回值

- **类型**: `any`
- **描述**: Returns true if value is a Date object, else false

## 示例

```typescript
* isDate(new Date()) // => true
 * isDate(Date.now()) // => false
 * isDate('2023-01-01') // => false
```

## 交互式示例

```tsx live
function isDateExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`isDate` Example</h4>
      <p>Checks if value is a Date object.</p>
    </div>
  );
}
```

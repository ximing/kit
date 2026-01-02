---
id: lowerFirst
title: lowerFirst
description: 'Converts the first character of string to lower case.'
---

# `lowerFirst`

Converts the first character of string to lower case.

## 参数

| 参数  | 类型  | 描述                    |
| ----- | ----- | ----------------------- |
| `str` | `any` | - The string to convert |

## 返回值

- **类型**: `any`
- **描述**: The string with first character lower cased

## 示例

```typescript
* lowerFirst('Fred') // => 'fred'
 * lowerFirst('FRED') // => 'fRED'
```

## 交互式示例

```tsx live
function lowerFirstExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`lowerFirst` Example</h4>
      <p>Converts the first character of string to lower case.</p>
    </div>
  );
}
```

---
id: upperFirst
title: upperFirst
description: 'Converts the first character of string to upper case.'
---

# `upperFirst`

Converts the first character of string to upper case.

## 参数

| 参数  | 类型  | 描述                    |
| ----- | ----- | ----------------------- |
| `str` | `any` | - The string to convert |

## 返回值

- **类型**: `any`
- **描述**: The string with first character upper cased

## 示例

```typescript
* upperFirst('fred') // => 'Fred'
 * upperFirst('FRED') // => 'FRED'
```

## 交互式示例

```tsx live
function upperFirstExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`upperFirst` Example</h4>
      <p>Converts the first character of string to upper case.</p>
    </div>
  );
}
```

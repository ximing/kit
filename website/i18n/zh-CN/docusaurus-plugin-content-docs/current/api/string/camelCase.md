---
id: camelCase
title: camelCase
description: 'Converts string to camel case.'
---

# `camelCase`

Converts string to camel case.

## 参数

| 参数  | 类型  | 描述                    |
| ----- | ----- | ----------------------- |
| `str` | `any` | - The string to convert |

## 返回值

- **类型**: `any`
- **描述**: The camel cased string

## 示例

```typescript
* camelCase('Foo Bar') // => 'fooBar'
 * camelCase('--foo-bar--') // => 'fooBar'
 * camelCase('foo_bar') // => 'fooBar'
```

## 交互式示例

```tsx live
function camelCaseExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`camelCase` Example</h4>
      <p>Converts string to camel case.</p>
    </div>
  );
}
```

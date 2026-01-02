---
id: kebabCase
title: kebabCase
description: 'Converts string to kebab case.'
---

# `kebabCase`

Converts string to kebab case.

## 参数

| 参数  | 类型  | 描述                    |
| ----- | ----- | ----------------------- |
| `str` | `any` | - The string to convert |

## 返回值

- **类型**: `any`
- **描述**: The kebab cased string

## 示例

```typescript
* kebabCase('Foo Bar') // => 'foo-bar'
 * kebabCase('fooBar') // => 'foo-bar'
 * kebabCase('foo_bar') // => 'foo-bar'
```

## 交互式示例

```tsx live
function kebabCaseExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`kebabCase` Example</h4>
      <p>Converts string to kebab case.</p>
    </div>
  );
}
```

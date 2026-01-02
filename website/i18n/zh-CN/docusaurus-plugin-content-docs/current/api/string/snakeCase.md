---
id: snakeCase
title: snakeCase
description: 'Converts string to snake case.'
---

# `snakeCase`

Converts string to snake case.

## 参数

| 参数  | 类型  | 描述                    |
| ----- | ----- | ----------------------- |
| `str` | `any` | - The string to convert |

## 返回值

- **类型**: `any`
- **描述**: The snake cased string

## 示例

```typescript
* snakeCase('Foo Bar') // => 'foo_bar'
 * snakeCase('fooBar') // => 'foo_bar'
 * snakeCase('foo-bar') // => 'foo_bar'
```

## 交互式示例

```tsx live
function snakeCaseExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`snakeCase` Example</h4>
      <p>Converts string to snake case.</p>
    </div>
  );
}
```

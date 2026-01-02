---
id: pascalCase
title: pascalCase
description: 'Converts string to pascal case.'
---

# `pascalCase`

Converts string to pascal case.

## 参数

| 参数  | 类型  | 描述                    |
| ----- | ----- | ----------------------- |
| `str` | `any` | - The string to convert |

## 返回值

- **类型**: `any`
- **描述**: The pascal cased string

## 示例

```typescript
* pascalCase('foo bar') // => 'FooBar'
 * pascalCase('--foo-bar--') // => 'FooBar'
 * pascalCase('foo_bar') // => 'FooBar'
```

## 交互式示例

```tsx live
function pascalCaseExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`pascalCase` Example</h4>
      <p>Converts string to pascal case.</p>
    </div>
  );
}
```

---
id: template
title: template
description: 'Replaces template placeholders with values from the data object.'
---

# `template`

Replaces template placeholders with values from the data object.

## 参数

| 参数   | 类型  | 描述                                      |
| ------ | ----- | ----------------------------------------- |
| `str`  | `any` | - The template string                     |
| `data` | `any` | - The data object with placeholder values |

## 返回值

- **类型**: `any`
- **描述**: The template string with placeholders replaced

## 示例

```typescript
* template('Hello <%= name %>', { name: 'World' }) // => 'Hello World'
 * template('${name} is ${age} years old', { name: 'John', age: 30 }) // => 'John is 30 years old'
```

## 交互式示例

```tsx live
function templateExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`template` Example</h4>
      <p>Replaces template placeholders with values from the data object.</p>
    </div>
  );
}
```

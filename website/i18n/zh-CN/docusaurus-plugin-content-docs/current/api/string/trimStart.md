---
id: trimStart
title: trimStart
description: 'Removes leading whitespace or specified characters from string.'
---

# `trimStart`

Removes leading whitespace or specified characters from string.

## 参数

| 参数    | 类型  | 描述                       |
| ------- | ----- | -------------------------- |
| `str`   | `any` | - The string to trim       |
| `chars` | `any` | - The characters to remove |

## 返回值

- **类型**: `any`
- **描述**: The trimmed string

## 示例

```typescript
* trimStart('  abc  ') // => 'abc  '
 * trimStart('-_-abc-_-', '-_') // => 'abc-_-'
```

## 交互式示例

```tsx live
function trimStartExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`trimStart` Example</h4>
      <p>Removes leading whitespace or specified characters from string.</p>
    </div>
  );
}
```

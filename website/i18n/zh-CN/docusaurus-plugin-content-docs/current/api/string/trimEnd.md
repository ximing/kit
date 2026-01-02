---
id: trimEnd
title: trimEnd
description: 'Removes trailing whitespace or specified characters from string.'
---

# `trimEnd`

Removes trailing whitespace or specified characters from string.

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
* trimEnd('  abc  ') // => '  abc'
 * trimEnd('-_-abc-_-', '-_') // => '-_-abc'
```

## 交互式示例

```tsx live
function trimEndExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`trimEnd` Example</h4>
      <p>Removes trailing whitespace or specified characters from string.</p>
    </div>
  );
}
```

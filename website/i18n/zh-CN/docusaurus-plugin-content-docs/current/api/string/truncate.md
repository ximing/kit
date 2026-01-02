---
id: truncate
title: truncate
description: "Truncates string if it's longer than the given maximum string length."
---

# `truncate`

Truncates string if it's longer than the given maximum string length.

## 参数

| 参数      | 类型  | 描述                                                                |
| --------- | ----- | ------------------------------------------------------------------- |
| `str`     | `any` | - The string to truncate                                            |
| `options` | `any` | - The options object                                                |
| `options` | `any` | .length - The maximum string length (default: 30)                   |
| `options` | `any` | .omission - The string to indicate text is omitted (default: '...') |

## 返回值

- **类型**: `any`
- **描述**: The truncated string

## 示例

```typescript
* truncate('Hi-Diddly-Ho there, Flanders!') // => 'Hi-Diddly-Ho there, Flanders!'
 * truncate('Hi-Diddly-Ho there, Flanders!', { length: 20 }) // => 'Hi-Diddly-Ho ther...'
 * truncate('Hi-Diddly-Ho there, Flanders!', { length: 20, omission: ' [...]' }) // => 'Hi-Diddly-Ho [...]'
```

## 交互式示例

```tsx live
function truncateExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`truncate` Example</h4>
      <p>Truncates string if it's longer than the given maximum string length.</p>
    </div>
  );
}
```

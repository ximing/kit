---
id: compact
title: compact
description: 'Removes falsy values from an array'
---

# `compact`

Removes falsy values from an array

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `array` | `any` | The array to compact |

## 返回值

- **类型**: `any`
- **描述**: A new array with falsy values removed

## 示例

```typescript
* compact([0, 1, false, 2, '', 3, null, undefined, 4]); // [1, 2, 3, 4]
```

## 交互式示例

```tsx live
function compactExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`compact` Example</h4>
      <p>Removes falsy values from an array</p>
    </div>
  );
}
```

---
id: entries
title: entries
description: 'Creates an array of own enumerable string keyed-value pairs for object'
---

# `entries`

Creates an array of own enumerable string keyed-value pairs for object

## 参数

| 参数  | 类型  | 描述                  |
| ----- | ----- | --------------------- |
| `obj` | `any` | - The object to query |

## 返回值

- **类型**: `any`
- **描述**: Returns the key-value pairs

## 示例

```typescript
* entries({ a: 1, b: 2, c: 3 }); // [['a', 1], ['b', 2], ['c', 3]]
```

## 交互式示例

```tsx live
function entriesExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`entries` Example</h4>
      <p>Creates an array of own enumerable string keyed-value pairs for object</p>
    </div>
  );
}
```

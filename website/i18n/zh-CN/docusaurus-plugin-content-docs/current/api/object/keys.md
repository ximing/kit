---
id: keys
title: keys
description: 'Creates an array of the own enumerable property names of object'
---

# `keys`

Creates an array of the own enumerable property names of object

## 参数

| 参数  | 类型  | 描述                  |
| ----- | ----- | --------------------- |
| `obj` | `any` | - The object to query |

## 返回值

- **类型**: `any`
- **描述**: Returns the array of property names

## 示例

```typescript
* keys({ a: 1, b: 2, c: 3 }); // ['a', 'b', 'c']
```

## 交互式示例

```tsx live
function keysExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`keys` Example</h4>
      <p>Creates an array of the own enumerable property names of object</p>
    </div>
  );
}
```

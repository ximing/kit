---
id: has
title: has
description: 'Checks if path is a direct or inherited property of object'
---

# `has`

Checks if path is a direct or inherited property of object

## 参数

| 参数   | 类型  | 描述                                         |
| ------ | ----- | -------------------------------------------- |
| `obj`  | `any` | - The object to query                        |
| `path` | `any` | - The path to check (can be string or array) |

## 返回值

- **类型**: `any`
- **描述**: Returns true if path exists, else false

## 示例

```typescript
* const obj = { a: { b: { c: 3 } } };
 * has(obj, 'a.b.c'); // true
 * has(obj, ['a', 'b', 'c']); // true
 * has(obj, 'a.b.d'); // false
```

## 交互式示例

```tsx live
function hasExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`has` Example</h4>
      <p>Checks if path is a direct or inherited property of object</p>
    </div>
  );
}
```

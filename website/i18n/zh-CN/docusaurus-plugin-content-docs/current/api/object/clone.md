---
id: clone
title: clone
description: 'Creates a shallow copy of value'
---

# `clone`

Creates a shallow copy of value

## 参数

| 参数    | 类型  | 描述                 |
| ------- | ----- | -------------------- |
| `value` | `any` | - The value to clone |

## 返回值

- **类型**: `any`
- **描述**: Returns the cloned value

## 示例

```typescript
* const obj = { a: 1, b: { c: 2 } };
 * const cloned = clone(obj);
 * cloned.a = 10;
 * console.log(obj.a); // 1
 * console.log(cloned.b === obj.b); // true (shallow copy)
```

## 交互式示例

```tsx live
function cloneExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`clone` Example</h4>
      <p>Creates a shallow copy of value</p>
    </div>
  );
}
```

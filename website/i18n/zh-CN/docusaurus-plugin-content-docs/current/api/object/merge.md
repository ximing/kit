---
id: merge
title: merge
description: 'Merges source objects into target object (shallow merge)'
---

# `merge`

Merges source objects into target object (shallow merge)

## 参数

| 参数      | 类型  | 描述                 |
| --------- | ----- | -------------------- |
| `target`  | `any` | - The target object  |
| `sources` | `any` | - The source objects |

## 返回值

- **类型**: `any`
- **描述**: Returns the target object

## 示例

```typescript
* const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * merge(obj1, obj2); // { a: 1, b: { d: 3 }, e: 4 }
```

## 交互式示例

```tsx live
function mergeExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`merge` Example</h4>
      <p>Merges source objects into target object (shallow merge)</p>
    </div>
  );
}
```

---
id: mergeDeep
title: mergeDeep
description: 'Recursively merges source objects into target object (deep merge)'
---

# `mergeDeep`

Recursively merges source objects into target object (deep merge)

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
* const obj1 = { a: 1, b: { c: 2, d: 3 } };
 * const obj2 = { b: { d: 4, e: 5 }, f: 6 };
 * mergeDeep(obj1, obj2); // { a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 }
```

## 交互式示例

```tsx live
function mergeDeepExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`mergeDeep` Example</h4>
      <p>Recursively merges source objects into target object (deep merge)</p>
    </div>
  );
}
```

---
id: cloneDeep
title: cloneDeep
description: 'Creates a deep copy of value'
---

# `cloneDeep`

Creates a deep copy of value

## 参数

| 参数    | 类型  | 描述                             |
| ------- | ----- | -------------------------------- |
| `value` | `any` | - The value to recursively clone |

## 返回值

- **类型**: `any`
- **描述**: Returns the deep cloned value

## 示例

```typescript
* const obj = { a: 1, b: { c: 2 } };
 * const cloned = cloneDeep(obj);
 * cloned.b.c = 10;
 * console.log(obj.b.c); // 2
 * console.log(cloned.b === obj.b); // false (deep copy)
```

## 交互式示例

```tsx live
function cloneDeepExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`cloneDeep` Example</h4>
      <p>Creates a deep copy of value</p>
    </div>
  );
}
```

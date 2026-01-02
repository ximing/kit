---
id: omit
title: omit
description: 'Creates an object composed of properties that are not omitted'
---

# `omit`

Creates an object composed of properties that are not omitted

## 参数

| 参数   | 类型  | 描述                        |
| ------ | ----- | --------------------------- |
| `obj`  | `any` | - The source object         |
| `keys` | `any` | - The property keys to omit |

## 返回值

- **类型**: `any`
- **描述**: Returns the new object

## 示例

```typescript
* const obj = { a: 1, b: 2, c: 3 };
 * omit(obj, ['a', 'c']); // { b: 2 }
```

## 交互式示例

```tsx live
function omitExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`omit` Example</h4>
      <p>Creates an object composed of properties that are not omitted</p>
    </div>
  );
}
```

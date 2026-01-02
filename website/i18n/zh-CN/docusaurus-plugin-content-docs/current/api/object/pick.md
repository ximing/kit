---
id: pick
title: pick
description: 'Creates an object composed of the picked object properties'
---

# `pick`

Creates an object composed of the picked object properties

## 参数

| 参数   | 类型  | 描述                        |
| ------ | ----- | --------------------------- |
| `obj`  | `any` | - The source object         |
| `keys` | `any` | - The property keys to pick |

## 返回值

- **类型**: `any`
- **描述**: Returns the new object

## 示例

```typescript
* const obj = { a: 1, b: 2, c: 3 };
 * pick(obj, ['a', 'c']); // { a: 1, c: 3 }
```

## 交互式示例

```tsx live
function pickExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`pick` Example</h4>
      <p>Creates an object composed of the picked object properties</p>
    </div>
  );
}
```

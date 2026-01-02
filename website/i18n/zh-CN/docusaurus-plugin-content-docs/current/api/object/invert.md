---
id: invert
title: invert
description: 'Creates an object composed of the inverted keys and values of object'
---

# `invert`

Creates an object composed of the inverted keys and values of object

## 参数

| 参数  | 类型  | 描述                   |
| ----- | ----- | ---------------------- |
| `obj` | `any` | - The object to invert |

## 返回值

- **类型**: `any`
- **描述**: Returns the new inverted object

## 示例

```typescript
* invert({ a: 1, b: 2, c: 1 }); // { '1': 'c', '2': 'b' }
```

## 交互式示例

```tsx live
function invertExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`invert` Example</h4>
      <p>Creates an object composed of the inverted keys and values of object</p>
    </div>
  );
}
```

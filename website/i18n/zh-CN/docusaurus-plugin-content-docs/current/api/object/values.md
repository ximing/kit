---
id: values
title: values
description: 'Creates an array of the own enumerable property values of object'
---

# `values`

Creates an array of the own enumerable property values of object

## 参数

| 参数  | 类型  | 描述                  |
| ----- | ----- | --------------------- |
| `obj` | `any` | - The object to query |

## 返回值

- **类型**: `any`
- **描述**: Returns the array of property values

## 示例

```typescript
* values({ a: 1, b: 2, c: 3 }); // [1, 2, 3]
```

## 交互式示例

```tsx live
function valuesExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`values` Example</h4>
      <p>Creates an array of the own enumerable property values of object</p>
    </div>
  );
}
```

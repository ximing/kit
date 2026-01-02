---
id: findIndex
title: findIndex
description: 'Finds the index of the first element that matches the predicate'
---

# `findIndex`

Finds the index of the first element that matches the predicate

## 参数

| 参数        | 类型  | 描述                              |
| ----------- | ----- | --------------------------------- |
| `array`     | `any` | The array to search               |
| `predicate` | `any` | The function to test each element |

## 返回值

- **类型**: `any`
- **描述**: The index of the first matching element, or -1 if not found

## 示例

```typescript
* findIndex([1, 2, 3, 4], (item) => item > 2); // 2
 * findIndex([1, 2, 3], (item) => item > 5); // -1
```

## 交互式示例

```tsx live
function findIndexExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`findIndex` Example</h4>
      <p>Finds the index of the first element that matches the predicate</p>
    </div>
  );
}
```

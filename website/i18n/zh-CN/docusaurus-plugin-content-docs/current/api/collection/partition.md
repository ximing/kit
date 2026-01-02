---
id: partition
title: partition
description: 'Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsy for'
---

# `partition`

Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsy for

## 参数

| 参数         | 类型  | 描述                                 |
| ------------ | ----- | ------------------------------------ |
| `collection` | `any` | - The collection to iterate over     |
| `predicate`  | `any` | - The function invoked per iteration |

## 返回值

- **类型**: `any`
- **描述**: Returns the array of grouped elements

## 示例

```typescript
* const users = [
 *   { name: 'John', active: true },
 *   { name: 'Jane', active: false },
 *   { name: 'Bob', active: true }
 * ];
 * partition(users, 'active');
 * // => [[{name: 'John', active: true}, {name: 'Bob', active: true}], [{name: 'Jane', active: false}]]
```

## 交互式示例

```tsx live
function partitionExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`partition` Example</h4>
      <p>
        Creates an array of elements split into two groups, the first of which contains elements predicate returns
        truthy for, the second of which contains elements predicate returns falsy for
      </p>
    </div>
  );
}
```

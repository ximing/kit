---
id: sortBy
title: sortBy
description: 'Creates an array of elements, sorted in ascending order by the results of running each element thru iteratee'
---

# `sortBy`

Creates an array of elements, sorted in ascending order by the results of running each element thru iteratee

## 参数

| 参数         | 类型  | 描述                             |
| ------------ | ----- | -------------------------------- |
| `collection` | `any` | - The collection to iterate over |
| `iteratees`  | `any` | - The iteratees to sort by       |

## 返回值

- **类型**: `any`
- **描述**: Returns the new sorted array

## 示例

```typescript
* const users = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 25 }
 * ];
 * sortBy(users, 'age');
 * // => [{name: 'Jane', age: 25}, {name: 'John', age: 30}]
```

## 交互式示例

```tsx live
function sortByExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`sortBy` Example</h4>
      <p>
        Creates an array of elements, sorted in ascending order by the results of running each element thru iteratee
      </p>
    </div>
  );
}
```

---
id: keyBy
title: keyBy
description: 'Creates an object composed from the elements of collection keyed by the results of running each element thru iteratee'
---

# `keyBy`

Creates an object composed from the elements of collection keyed by the results of running each element thru iteratee

## 参数

| 参数         | 类型  | 描述                             |
| ------------ | ----- | -------------------------------- |
| `collection` | `any` | - The collection to iterate over |
| `iteratee`   | `any` | - The iteratee to transform keys |

## 返回值

- **类型**: `any`
- **描述**: Returns the composed aggregate object

## 示例

```typescript
* const users = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' }
 * ];
 * keyBy(users, 'id');
 * // => { '1': {id: 1, name: 'John'}, '2': {id: 2, name: 'Jane'} }
```

## 交互式示例

```tsx live
function keyByExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`keyBy` Example</h4>
      <p>
        Creates an object composed from the elements of collection keyed by the results of running each element thru
        iteratee
      </p>
    </div>
  );
}
```

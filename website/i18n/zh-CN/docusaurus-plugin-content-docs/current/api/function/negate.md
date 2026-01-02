---
id: negate
title: negate
description: 'Creates a function that negates the result of the predicate func.'
---

# `negate`

Creates a function that negates the result of the predicate func.

## 参数

| 参数        | 类型  | 描述                      |
| ----------- | ----- | ------------------------- |
| `predicate` | `any` | - The predicate to negate |

## 返回值

- **类型**: `any`
- **描述**: Returns the new negated function

## 示例

```typescript
* const isEven = (n: number) => n % 2 === 0;
 * const isOdd = negate(isEven);
 * isOdd(3); // => true
 * isOdd(4); // => false
 *
 *
```

```typescript
* const users = [
 *   { name: 'Alice', active: true },
 *   { name: 'Bob', active: false }
 * ];
 * const isActive = (user: typeof users[0]) => user.active;
 * users.filter(negate(isActive)); // => [{ name: 'Bob', active: false }]
```

## 交互式示例

```tsx live
function negateExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`negate` Example</h4>
      <p>Creates a function that negates the result of the predicate func.</p>
    </div>
  );
}
```

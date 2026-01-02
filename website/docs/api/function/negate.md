---
id: negate
title: negate
description: 'Creates a function that negates the result of the predicate func.'
---

# `negate`

Creates a function that negates the result of the predicate func.

## Parameters

| Parameter   | Type  | Description               |
| ----------- | ----- | ------------------------- |
| `predicate` | `any` | - The predicate to negate |

## Returns

- **Type**: `any`
- **Description**: Returns the new negated function

## Examples

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

## Interactive Example

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

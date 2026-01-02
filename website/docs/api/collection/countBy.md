---
id: countBy
title: countBy
description: 'Creates an object composed from the elements of collection grouped by the results of running each element thru iteratee, with counts'
---

# `countBy`

Creates an object composed from the elements of collection grouped by the results of running each element thru iteratee, with counts

## Parameters

| Parameter    | Type  | Description                      |
| ------------ | ----- | -------------------------------- |
| `collection` | `any` | - The collection to iterate over |
| `iteratee`   | `any` | - The iteratee to transform keys |

## Returns

- **Type**: `any`
- **Description**: Returns the composed aggregate object with counts

## Examples

```typescript
* const users = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 30 },
 *   { name: 'Bob', age: 25 }
 * ];
 * countBy(users, 'age');
 * // => { '30': 2, '25': 1 }
```

## Interactive Example

```tsx live
function countByExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`countBy` Example</h4>
      <p>
        Creates an object composed from the elements of collection grouped by the results of running each element thru
        iteratee, with counts
      </p>
    </div>
  );
}
```

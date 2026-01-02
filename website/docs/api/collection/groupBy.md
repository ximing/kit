---
id: groupBy
title: groupBy
description: 'Creates an object composed from the elements of collection grouped by the results of running each element thru iteratee'
---

# `groupBy`

Creates an object composed from the elements of collection grouped by the results of running each element thru iteratee

## Parameters

| Parameter    | Type  | Description                      |
| ------------ | ----- | -------------------------------- |
| `collection` | `any` | - The collection to iterate over |
| `iteratee`   | `any` | - The iteratee to transform keys |

## Returns

- **Type**: `any`
- **Description**: Returns the composed aggregate object

## Examples

```typescript
* const users = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 30 },
 *   { name: 'Bob', age: 25 }
 * ];
 * groupBy(users, 'age');
 * // => { '30': [{name: 'John', age: 30}, {name: 'Jane', age: 30}], '25': [{name: 'Bob', age: 25}] }
```

## Interactive Example

```tsx live
function groupByExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`groupBy` Example</h4>
      <p>
        Creates an object composed from the elements of collection grouped by the results of running each element thru
        iteratee
      </p>
    </div>
  );
}
```

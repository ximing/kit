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
function CountByExample() {
  const [groupBy, setGroupBy] = useState('age');

  const users = [
    { name: 'John', age, dept: 'Engineering' },
    { name: 'Jane', age, dept: 'Marketing' },
    { name: 'Bob', age, dept: 'Engineering' },
    { name: 'Alice', age, dept: 'Marketing' },
    { name: 'Charlie', age, dept: 'Sales' },
  ];

  const result = countBy(users, groupBy as any);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection CountBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Group by: </label>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="age">Age</option>
          <option value="dept">Department</option>
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Users:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(users, null, 2)}
        </pre>
        <p>
          <strong>Count by {groupBy}:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

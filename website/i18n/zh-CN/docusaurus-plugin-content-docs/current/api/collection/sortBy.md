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
function SortByExample() {
  const [sortField, setSortField] = useState('age');

  const users = [
    { name: 'John', age, salary: 60000 },
    { name: 'Jane', age, salary: 75000 },
    { name: 'Bob', age, salary: 55000 },
    { name: 'Alice', age, salary: 70000 },
  ];

  const result = sortBy(users, sortField as any);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection SortBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Sort by: </label>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="salary">Salary</option>
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Original Users:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(users, null, 2)}
        </pre>
        <p>
          <strong>Sorted by {sortField} (ascending):</strong>
        </p>
        <pre
          style={{
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '300px',
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

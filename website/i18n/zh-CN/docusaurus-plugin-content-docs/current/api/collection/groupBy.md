---
id: groupBy
title: groupBy
description: 'Creates an object composed from the elements of collection grouped by the results of running each element thru iteratee'
---

# `groupBy`

Creates an object composed from the elements of collection grouped by the results of running each element thru iteratee

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
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 30 },
 *   { name: 'Bob', age: 25 }
 * ];
 * groupBy(users, 'age');
 * // => { '30': [{name: 'John', age: 30}, {name: 'Jane', age: 30}], '25': [{name: 'Bob', age: 25}] }
```

## 交互式示例

```tsx live
function GroupByExample() {
  const [groupBy, setGroupBy] = useState('age');

  const users = [
    { name: 'John', age, dept: 'Engineering' },
    { name: 'Jane', age, dept: 'Marketing' },
    { name: 'Bob', age, dept: 'Engineering' },
    { name: 'Alice', age, dept: 'Marketing' },
  ];

  const result = groupBy(users, groupBy as any);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection GroupBy Example</h3>
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
          <strong>Grouped by {groupBy}:</strong>
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

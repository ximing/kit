---
id: orderBy
title: orderBy
description: 'This method is like sortBy except that it allows specifying the sort orders of the iteratees to sort by'
---

# `orderBy`

This method is like sortBy except that it allows specifying the sort orders of the iteratees to sort by

## 参数

| 参数         | 类型  | 描述                                             |
| ------------ | ----- | ------------------------------------------------ |
| `collection` | `any` | - The collection to iterate over                 |
| `iteratees`  | `any` | - The iteratees to sort by                       |
| `orders`     | `any` | - The sort orders of iteratees ('asc' or 'desc') |

## 返回值

- **类型**: `any`
- **描述**: Returns the new sorted array

## 示例

```typescript
* const users = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 25 }
 * ];
 * orderBy(users, ['age'], ['desc']);
 * // => [{name: 'John', age: 30}, {name: 'Jane', age: 25}]
```

## 交互式示例

```tsx live
function OrderByExample() {
  const [sortField, setSortField] = useState('age');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const users = [
    { name: 'John', age, salary: 60000 },
    { name: 'Jane', age, salary: 75000 },
    { name: 'Bob', age, salary: 55000 },
    { name: 'Alice', age, salary: 70000 },
  ];

  const result = orderBy(users, sortField as any, [sortOrder]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection OrderBy Example</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Sort by: </label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            style={{ width: '100%', padding: '5px', fontSize: '14px' }}
          >
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="salary">Salary</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Order: </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            style={{ width: '100%', padding: '5px', fontSize: '14px' }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Original Users:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(users, null, 2)}
        </pre>
        <p>
          <strong>
            Ordered by {sortField} ({sortOrder}):
          </strong>
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

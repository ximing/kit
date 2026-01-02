---
id: partition
title: partition
description: "Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsy for"
---

# `partition`

Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsy for

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `collection` | `any` | - The collection to iterate over |
| `predicate` | `any` | - The function invoked per iteration |

## 返回值

- **类型**: `any`
- **描述**: Returns the array of grouped elements

## 示例

```typescript
* const users = [
 *   { name: 'John', active: true },
 *   { name: 'Jane', active: false },
 *   { name: 'Bob', active: true }
 * ];
 * partition(users, 'active');
 * // => [[{name: 'John', active: true}, {name: 'Bob', active: true}], [{name: 'Jane', active: false}]]
```

## 交互式示例

```tsx live
function PartitionExample() {
  const [partitionBy, setPartitionBy] = useState('active');
  
  const users = [
    { name: 'John', active, age: 30 },
    { name: 'Jane', active, age: 25 },
    { name: 'Bob', active, age: 35 },
    { name: 'Alice', active, age: 28 },
    { name: 'Charlie', active, age: 32 },
  ];

  const [trueGroup, falseGroup] = partition(users, partitionBy as any);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection Partition Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Partition by: </label>
        <select
          value={partitionBy}
          onChange={(e) => setPartitionBy(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="active">Active</option>
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Original Users:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(users, null, 2)}
        </pre>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <p>
              <strong>True Group (active=true):</strong>
            </p>
            <pre style={{ backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px', overflow: 'auto', maxHeight: '200px' }}>
              {JSON.stringify(trueGroup, null, 2)}
            </pre>
          </div>
          <div>
            <p>
              <strong>False Group (active=false):</strong>
            </p>
            <pre style={{ backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', overflow: 'auto', maxHeight: '200px' }}>
              {JSON.stringify(falseGroup, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
```


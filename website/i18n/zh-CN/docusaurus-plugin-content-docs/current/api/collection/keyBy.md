---
id: keyBy
title: keyBy
description: "Creates an object composed from the elements of collection keyed by the results of running each element thru iteratee"
---

# `keyBy`

Creates an object composed from the elements of collection keyed by the results of running each element thru iteratee

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `collection` | `any` | - The collection to iterate over |
| `iteratee` | `any` | - The iteratee to transform keys |

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
function KeyByExample() {
  const [keyField, setKeyField] = useState('id');
  
  const users = [
    { id, name: 'John', email: 'john@example.com' },
    { id, name: 'Jane', email: 'jane@example.com' },
    { id, name: 'Bob', email: 'bob@example.com' },
  ];

  const result = keyBy(users, keyField as any);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection KeyBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Key by: </label>
        <select
          value={keyField}
          onChange={(e) => setKeyField(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
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
          <strong>Keyed by {keyField}:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```


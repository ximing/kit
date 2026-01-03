---
id: get
title: get
description: 'Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.'
---

# `get`

Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.

## 参数

| 参数           | 类型  | 描述                                                       |
| -------------- | ----- | ---------------------------------------------------------- |
| `obj`          | `any` | - The object to query                                      |
| `path`         | `any` | - The path of the property to get (can be string or array) |
| `defaultValue` | `any` | - The value returned if the resolved value is undefined    |

## 返回值

- **类型**: `any`
- **描述**: Returns the resolved value

## 示例

```typescript
* const obj = { a: { b: { c: 3 } } };
 * get(obj, 'a.b.c'); // 3
 * get(obj, ['a', 'b', 'c']); // 3
 * get(obj, 'a.b.d', 'default'); // 'default'
```

## 交互式示例

```tsx live
function GetExample() {
  const [obj] = useState({ a: { b: { c: 3 } }, x: 10 });
  const [path, setPath] = useState('a.b.c');
  const [result, setResult] = useState(() => get(obj, 'a.b.c'));

  const handleGetValue = () => {
    setResult(get(obj, path, 'undefined'));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>get Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Gets a value at a specific path in an object. Returns a default value if the path doesn't exist.
      </p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Path: </label>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          style={{ padding: '5px', width: '150px' }}
          placeholder="e.g., a.b.c"
        />
        <button
          onClick={handleGetValue}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          Get Value
        </button>
      </div>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Path:</strong> {path}
        </p>
        <p>
          <strong>Result:</strong> {JSON.stringify(result)}
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Try paths like: 'a.b.c', 'x', 'a.b.d', 'a.b.c.d'
        </p>
      </div>
    </div>
  );
}
```

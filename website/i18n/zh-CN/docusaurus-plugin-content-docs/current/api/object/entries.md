---
id: entries
title: entries
description: "Creates an array of own enumerable string keyed-value pairs for object"
---

# `entries`

Creates an array of own enumerable string keyed-value pairs for object

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `obj` | `any` | - The object to query |

## 返回值

- **类型**: `any`
- **描述**: Returns the key-value pairs

## 示例

```typescript
* entries({ a: 1, b: 2, c: 3 }); // [['a', 1], ['b', 2], ['c', 3]]
```

## 交互式示例

```tsx live
function EntriesExample() {
  const [obj] = useState({ a, b, c: 3 });
  const [result] = useState(() => entries(obj));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>entries Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates an array of key-value pairs from an object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Input Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Output (entries):</strong>
        </p>
        <div style={{ marginLeft: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '3px' }}>
          {result.map((entry, index) => (
            <div key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
              [{JSON.stringify(entry[0])}, {JSON.stringify(entry[1])}]
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```


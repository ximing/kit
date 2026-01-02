---
id: cloneDeep
title: cloneDeep
description: "Creates a deep copy of value"
---

# `cloneDeep`

Creates a deep copy of value

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `value` | `any` | - The value to recursively clone |

## 返回值

- **类型**: `any`
- **描述**: Returns the deep cloned value

## 示例

```typescript
* const obj = { a: 1, b: { c: 2 } };
 * const cloned = cloneDeep(obj);
 * cloned.b.c = 10;
 * console.log(obj.b.c); // 2
 * console.log(cloned.b === obj.b); // false (deep copy)
```

## 交互式示例

```tsx live
function CloneDeepExample() {
  const [originalObj] = useState({ a, b: { c, d: { e: 3 } } });
  const [clonedObj] = useState(() => cloneDeep(originalObj));
  const [modifiedNestedValue, setModifiedNestedValue] = useState(2);

  const handleModifyDeepClone = () => {
    clonedObj.b.c = modifiedNestedValue;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>cloneDeep Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates a deep copy of an object. Nested objects and arrays are also cloned recursively.
      </p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>New value for cloned.b.c: </label>
        <input
          type="number"
          value={modifiedNestedValue}
          onChange={(e) => setModifiedNestedValue(Number(e.target.value))}
          style={{ padding: '5px', width: '80px' }}
        />
        <button
          onClick={handleModifyDeepClone}
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
          Modify Deep Clone
        </button>
      </div>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Original Object:</strong> {JSON.stringify(originalObj)}
        </p>
        <p>
          <strong>Deep Cloned Object:</strong> {JSON.stringify(clonedObj)}
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Even nested properties are completely independent. Modifying clonedObj.b.c does not affect originalObj.b.c.
        </p>
      </div>
    </div>
  );
}
```


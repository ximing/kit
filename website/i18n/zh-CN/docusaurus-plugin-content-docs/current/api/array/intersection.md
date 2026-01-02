---
id: intersection
title: intersection
description: "Creates an array of unique values that are included in all given arrays"
---

# `intersection`

Creates an array of unique values that are included in all given arrays

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `arrays` | `any` | The arrays to process |

## 返回值

- **类型**: `any`
- **描述**: A new array of unique values present in all arrays

## 示例

```typescript
* intersection([1, 2, 3], [2, 3, 4]); // [2, 3]
 * intersection([1, 2, 3], [2, 3, 4], [2, 3, 5]); // [2, 3]
```

## 交互式示例

```tsx live
function IntersectionExample() {
  const [array1, setArray1] = useState('1, 2, 3, 4');
  const [array2, setArray2] = useState('2, 3, 4, 5');

  const parseInput = (text) => {
    try {
      return text.split(',').map((s) => Number(s.trim())).filter((n) => !isNaN(n));
    } catch {
      return [];
    }
  };

  const arr1 = parseInput(array1);
  const arr2 = parseInput(array2);
  const result = intersection(arr1, arr2);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Array Intersection Example</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Array 1:</label>
          <input
            type="text"
            value={array1}
            onChange={(e) => setArray1(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            placeholder="e.g., 1, 2, 3, 4"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Array 2:</label>
          <input
            type="text"
            value={array2}
            onChange={(e) => setArray2(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            placeholder="e.g., 2, 3, 4, 5"
          />
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Array 1:</strong> {JSON.stringify(arr1)}
        </p>
        <p>
          <strong>Array 2:</strong> {JSON.stringify(arr2)}
        </p>
        <p>
          <strong>Common elements:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}
```


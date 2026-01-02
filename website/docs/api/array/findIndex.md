---
id: findIndex
title: findIndex
description: "Finds the index of the first element that matches the predicate"
---

# `findIndex`

Finds the index of the first element that matches the predicate

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `array` | `any` | The array to search |
| `predicate` | `any` | The function to test each element |

## Returns

- **Type**: `any`
- **Description**: The index of the first matching element, or -1 if not found

## Examples

```typescript
* findIndex([1, 2, 3, 4], (item) => item > 2); // 2
 * findIndex([1, 2, 3], (item) => item > 5); // -1
```

## Interactive Example

```tsx live
function FindIndexExample() {
  const [threshold, setThreshold] = useState(2);
  const array = [1, 2, 3, 4, 5];
  const result = findIndex(array, (item) => item > threshold);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Array FindIndex Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Find first element greater than: </label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Array:</strong> {JSON.stringify(array)}
        </p>
        <p>
          <strong>Threshold:</strong> {threshold}
        </p>
        <p>
          <strong>Index of first element &gt; {threshold}:</strong> {result}
        </p>
        {result !== -1 && (
          <p>
            <strong>Element:</strong> {array[result]}
          </p>
        )}
      </div>
    </div>
  );
}
```


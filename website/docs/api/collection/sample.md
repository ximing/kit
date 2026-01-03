---
id: sample
title: sample
description: 'Gets a random element from collection'
---

# `sample`

Gets a random element from collection

## Parameters

| Parameter    | Type  | Description                |
| ------------ | ----- | -------------------------- |
| `collection` | `any` | - The collection to sample |

## Returns

- **Type**: `any`
- **Description**: Returns the random element

## Examples

```typescript
* const arr = [1, 2, 3, 4, 5];
 * sample(arr); // => random element from arr
```

## Interactive Example

```tsx live
function SampleExample() {
  const [samples, setSamples] = useState<number[]>([]);

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSample = () => {
    const newSample = sample(items);
    if (newSample !== undefined) {
      setSamples([...samples, newSample]);
    }
  };

  const handleClear = () => {
    setSamples([]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection Sample Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <p>
          <strong>Items:</strong> {JSON.stringify(items)}
        </p>
      </div>
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <button
          onClick={handleSample}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Get Random Sample
        </button>
        <button
          onClick={handleClear}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Samples collected ({samples.length}):</strong>
        </p>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2196F3' }}>
          {samples.length > 0 ? samples.join(', ') : 'Click "Get Random Sample" to start'}
        </p>
      </div>
    </div>
  );
}
```

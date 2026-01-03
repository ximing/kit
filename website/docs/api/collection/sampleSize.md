---
id: sampleSize
title: sampleSize
description: 'Gets n random elements at unique keys from collection up to the size of collection'
---

# `sampleSize`

Gets n random elements at unique keys from collection up to the size of collection

## Parameters

| Parameter    | Type  | Description                        |
| ------------ | ----- | ---------------------------------- |
| `collection` | `any` | - The collection to sample         |
| `n`          | `any` | - The number of elements to sample |

## Returns

- **Type**: `any`
- **Description**: Returns the array of sampled elements

## Examples

```typescript
* const arr = [1, 2, 3, 4, 5];
 * sampleSize(arr, 2); // => random 2 elements from arr
```

## Interactive Example

```tsx live
function SampleSizeExample() {
  const [sampleCount, setSampleCount] = useState(3);
  const [samples, setSamples] = useState<number[]>([]);

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSample = () => {
    const newSamples = sampleSize(items, sampleCount);
    setSamples(newSamples);
  };

  const handleClear = () => {
    setSamples([]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection SampleSize Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <p>
          <strong>Items:</strong> {JSON.stringify(items)}
        </p>
      </div>
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label>
          Sample size="number"
            min="1"
            max={items.length}
            value={sampleCount}
            onChange={(e) => setSampleCount(Math.max(1, Number(e.target.value)))}
            style={{ marginLeft: '8px', padding: '5px', fontSize: '14px', width: '60px' }}
          />
        </label>
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
          Get Samples
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
          <strong>Samples ({samples.length}):</strong>
        </p>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2196F3' }}>
          {samples.length > 0 ? samples.join(', ') : 'Click "Get Samples" to start'}
        </p>
      </div>
    </div>
  );
}
```

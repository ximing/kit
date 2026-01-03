---
id: ceil
title: ceil
description: 'Rounds number up to precision.'
---

# `ceil`

Rounds number up to precision.

## Parameters

| Parameter   | Type  | Description                                 |
| ----------- | ----- | ------------------------------------------- |
| `number`    | `any` | - The number to round up                    |
| `precision` | `any` | - The precision to round up to (default: 0) |

## Returns

- **Type**: `any`
- **Description**: Returns the rounded up number

## Examples

```typescript
* ceil(4.006) // => 5
 * ceil(4.006, 2) // => 4.01
 * ceil(4060, -2) // => 4100
```

## Interactive Example

```tsx live
function CeilExample() {
  const [number, setNumber] = useState(4.006);
  const [precision, setPrecision] = useState(0);
  const result = ceil(number, precision);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Number Ceil Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Number: </label>
          <input
            type="number"
            step="0.001"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '120px' }}
          />
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>Precision: </label>
          <input
            type="number"
            value={precision}
            onChange={(e) => setPrecision(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '120px' }}
          />
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> ceil({number}, {precision})
        </p>
        <p>
          <strong>Result:</strong> {result}
        </p>
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p>
          <strong>Examples:</strong>
        </p>
        <ul>
          <li>ceil(4.006) → 5</li>
          <li>ceil(4.006, 2) → 4.01</li>
          <li>ceil(4060, -2) → 4100</li>
        </ul>
      </div>
    </div>
  );
}
```

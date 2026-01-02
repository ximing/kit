---
id: round
title: round
description: "Rounds number to precision."
---

# `round`

Rounds number to precision.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `number` | `any` | - The number to round |
| `precision` | `any` | - The precision to round to (default: 0) |

## Returns

- **Type**: `any`
- **Description**: Returns the rounded number

## Examples

```typescript
* round(4.006) // => 4
 * round(4.006, 2) // => 4.01
 * round(4060, -2) // => 4100
```

## Interactive Example

```tsx live
function RoundExample() {
  const [number, setNumber] = useState(4.006);
  const [precision, setPrecision] = useState(0);
  const result = round(number, precision);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Number Round Example</h3>
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
          <strong>Input:</strong> round({number}, {precision})
        </p>
        <p>
          <strong>Result:</strong> {result}
        </p>
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>round(4.006) → 4</li>
          <li>round(4.006, 2) → 4.01</li>
          <li>round(4060, -2) → 4100</li>
        </ul>
      </div>
    </div>
  );
}
```


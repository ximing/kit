---
id: random
title: random
description: "Produces a random number between the inclusive lower and upper bounds. If only one argument is provided, a number between 0 and the given number is returned."
---

# `random`

Produces a random number between the inclusive lower and upper bounds.
If only one argument is provided, a number between 0 and the given number is returned.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `lower` | `any` | - The lower bound or upper bound if upper is not provided |
| `upper` | `any` | - The upper bound |
| `floating` | `any` | - Specify returning a floating-point number |

## Returns

- **Type**: `any`
- **Description**: Returns the random number

## Examples

```typescript
* random(5) // => random number between 0 and 5
 * random(5, 10) // => random number between 5 and 10
 * random(5, 10, true) // => random floating-point number between 5 and 10
```

## Interactive Example

```tsx live
function RandomExample() {
  const [lower, setLower] = useState(5);
  const [upper, setUpper] = useState(10);
  const [floating, setFloating] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const generateRandom = () => {
    const value = random(lower, upper, floating);
    setResult(value);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Random Number Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Lower Bound: </label>
          <input
            type="number"
            value={lower}
            onChange={(e) => setLower(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Upper Bound: </label>
          <input
            type="number"
            value={upper}
            onChange={(e) => setUpper(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={floating}
              onChange={(e) => setFloating(e.target.checked)}
            />
            {' '}Floating-point number
          </label>
        </div>
        <button
          onClick={generateRandom}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Generate Random Number
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> random({lower}, {upper}, {String(floating)})
        </p>
        {result !== null && (
          <p>
            <strong>Result:</strong>{' '}
            <span style={{ fontSize: '18px', color: '#28a745' }}>{result}</span>
          </p>
        )}
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>random(5) → random integer between 0 and 5</li>
          <li>random(5, 10) → random integer between 5 and 10</li>
          <li>random(5, 10, true) → random float between 5 and 10</li>
        </ul>
      </div>
    </div>
  );
}
```


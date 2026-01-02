---
id: sum
title: sum
description: "Computes the sum of the values in array."
---

# `sum`

Computes the sum of the values in array.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `numbers` | `any` | - The array of numbers to sum |

## Returns

- **Type**: `any`
- **Description**: Returns the sum

## Examples

```typescript
* sum([1, 2, 3, 4]) // => 10
 * sum([]) // => 0
 * sum([1.5, 2.5, 3]) // => 7
```

## Interactive Example

```tsx live
function SumExample() {
  const [input, setInput] = useState('1, 2, 3, 4');
  
  const numbers = input
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s !== '')
    .map(Number)
    .filter((n) => !isNaN(n));
  
  const result = sum(numbers);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Sum Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px', display: 'block', marginBottom: '5px' }}>
          Enter numbers (comma-separated):
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 1, 2, 3, 4"
          style={{ padding: '5px', fontSize: '14px', width: '300px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input Array:</strong> {JSON.stringify(numbers)}
        </p>
        <p>
          <strong>Sum:</strong> {result}
        </p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          {numbers.join(' + ')} = {result}
        </p>
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>sum([1, 2, 3, 4]) → 10</li>
          <li>sum([]) → 0</li>
          <li>sum([1.5, 2.5, 3]) → 7</li>
        </ul>
      </div>
    </div>
  );
}
```


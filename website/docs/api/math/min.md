---
id: min
title: min
description: 'Computes the minimum value of array. If array is empty or falsey, undefined is returned.'
---

# `min`

Computes the minimum value of array.
If array is empty or falsey, undefined is returned.

## Parameters

| Parameter | Type  | Description                                    |
| --------- | ----- | ---------------------------------------------- |
| `numbers` | `any` | - The array of numbers to get the minimum from |

## Returns

- **Type**: `any`
- **Description**: Returns the minimum value

## Examples

```typescript
* min([1, 2, 3, 4]) // => 1
 * min([]) // => undefined
 * min([1.5, 2.5, 3]) // => 1.5
```

## Interactive Example

```tsx live
function MinExample() {
  const [numbers, setNumbers] = useState([5, 2, 8, 1, 9, 3]);
  const [newNumber, setNewNumber] = useState('');
  const result = min(numbers);

  const handleAddNumber = () => {
    const num = Number(newNumber);
    if (!isNaN(num) && newNumber.trim() !== '') {
      setNumbers([...numbers, num]);
      setNewNumber('');
    }
  };

  const handleRemoveNumber = (index) => {
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setNumbers([5, 2, 8, 1, 9, 3]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Math Min Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddNumber()}
          placeholder="Enter a number"
          style={{ padding: '5px', fontSize: '14px', marginRight: '10px' }}
        />
        <button onClick={handleAddNumber} style={{ padding: '5px 15px', fontSize: '14px', marginRight: '10px' }}>
          Add
        </button>
        <button onClick={handleReset} style={{ padding: '5px 15px', fontSize: '14px' }}>
          Reset
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Numbers:</strong>{' '}
          {numbers.map((num, index) => (
            <span key={index}>
              {num}
              <button
                onClick={() => handleRemoveNumber(index)}
                style={{
                  marginLeft: '5px',
                  marginRight: '10px',
                  padding: '2px 8px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </span>
          ))}
          {numbers.length === 0 && <span style={{ color: '#999' }}>Empty array</span>}
        </p>
        <p>
          <strong>Minimum Value:</strong>{' '}
          <span style={{ fontSize: '18px', color: '#1976d2', fontWeight: 'bold' }}>
            {result !== undefined ? result : 'undefined'}
          </span>
        </p>
      </div>
    </div>
  );
}
```

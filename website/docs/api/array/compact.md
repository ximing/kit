---
id: compact
title: compact
description: "Removes falsy values from an array"
---

# `compact`

Removes falsy values from an array

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `array` | `any` | The array to compact |

## Returns

- **Type**: `any`
- **Description**: A new array with falsy values removed

## Examples

```typescript
* compact([0, 1, false, 2, '', 3, null, undefined, 4]); // [1, 2, 3, 4]
```

## Interactive Example

```tsx live
function CompactExample() {
  const [inputText, setInputText] = useState('0, 1, false, 2, "", 3, null, undefined, 4');
  
  const parseInput = (text) => {
    try {
      return eval(`[${text}]`);
    } catch {
      return [];
    }
  };

  const array = parseInput(inputText);
  const result = compact(array);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Array Compact Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Input Array (comma-separated):</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '14px',
            fontFamily: 'monospace',
            minHeight: '60px',
          }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> {JSON.stringify(array)}
        </p>
        <p>
          <strong>Falsy values removed:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}
```


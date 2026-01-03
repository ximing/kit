---
id: padEnd
title: padEnd
description: "Pads string on the right side if it's shorter than length."
---

# `padEnd`

Pads string on the right side if it's shorter than length.

## Parameters

| Parameter | Type  | Description                                 |
| --------- | ----- | ------------------------------------------- |
| `str`     | `any` | - The string to pad                         |
| `length`  | `any` | - The padding length                        |
| `chars`   | `any` | - The string used as padding (default: ' ') |

## Returns

- **Type**: `any`
- **Description**: The padded string

## Examples

```typescript
* padEnd('abc', 6) // => 'abc   '
 * padEnd('abc', 6, '_-') // => 'abc_-_'
 * padEnd('abc', 3) // => 'abc'
```

## Interactive Example

```tsx live
function PadEndExample() {
  const [input, setInput] = useState('abc');
  const [length, setLength] = useState(6);
  const [chars, setChars] = useState('_-');
  const result = padEnd(input, length, chars);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Input String:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Pad Length: {length}</label>
        <input
          type="range"
          min="1"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Padding Characters:</label>
        <input
          type="text"
          value={chars}
          onChange={(e) => setChars(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            boxSizing: 'border-box',
          }}
          placeholder="e.g., '_-' or ' '"
        />
      </div>

      <div>
        <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Output:</p>
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '14px',
            wordBreak: 'break-all',
            border: '1px solid #ddd',
          }}
        >
          "{result}"
        </div>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>Length: {result.length}</p>
      </div>
    </div>
  );
}
```

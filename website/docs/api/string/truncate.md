---
id: truncate
title: truncate
description: "Truncates string if it's longer than the given maximum string length."
---

# `truncate`

Truncates string if it's longer than the given maximum string length.

## Parameters

| Parameter | Type  | Description                                                         |
| --------- | ----- | ------------------------------------------------------------------- |
| `str`     | `any` | - The string to truncate                                            |
| `options` | `any` | - The options object                                                |
| `options` | `any` | .length - The maximum string length (default: 30)                   |
| `options` | `any` | .omission - The string to indicate text is omitted (default: '...') |

## Returns

- **Type**: `any`
- **Description**: The truncated string

## Examples

```typescript
* truncate('Hi-Diddly-Ho there, Flanders!') // => 'Hi-Diddly-Ho there, Flanders!'
 * truncate('Hi-Diddly-Ho there, Flanders!', { length: 20 }) // => 'Hi-Diddly-Ho ther...'
 * truncate('Hi-Diddly-Ho there, Flanders!', { length: 20, omission: ' [...]' }) // => 'Hi-Diddly-Ho [...]'
```

## Interactive Example

```tsx live
function TruncateExample() {
  const [input, setInput] = useState('Hi-Diddly-Ho there, Flanders!');
  const [length, setLength] = useState(20);
  const [omission, setOmission] = useState('...');
  const result = truncate(input, { length, omission });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Input String:</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            boxSizing: 'border-box',
            fontFamily: 'monospace',
            minHeight: '60px',
          }}
          placeholder="Enter text to truncate"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Max Length: {length}</label>
        <input
          type="range"
          min="5"
          max={Math.max(50, input.length)}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Omission String:</label>
        <input
          type="text"
          value={omission}
          onChange={(e) => setOmission(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            boxSizing: 'border-box',
          }}
          placeholder="e.g., '...' or ' [...]'"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
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
          {result}
        </div>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          Original: {input.length} chars → Result: {result.length} chars
        </p>
      </div>
    </div>
  );
}
```

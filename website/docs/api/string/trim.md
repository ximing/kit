---
id: trim
title: trim
description: 'Removes leading and trailing whitespace or specified characters from string.'
---

# `trim`

Removes leading and trailing whitespace or specified characters from string.

## Parameters

| Parameter | Type  | Description                |
| --------- | ----- | -------------------------- |
| `str`     | `any` | - The string to trim       |
| `chars`   | `any` | - The characters to remove |

## Returns

- **Type**: `any`
- **Description**: The trimmed string

## Examples

```typescript
* trim('  abc  ') // => 'abc'
 * trim('-_-abc-_-', '-_') // => 'abc'
```

## Interactive Example

```tsx live
function TrimExample() {
  const [input, setInput] = useState('  abc  ');
  const [chars, setChars] = useState('');
  const result = trim(input, chars || undefined);

  const examples = [
    { input: '  abc  ', chars: '' },
    { input: '-_-abc-_-', chars: '-_' },
    { input: '***hello***', chars: '*' },
    { input: 'hello', chars: '' },
  ];

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
          placeholder="Enter text"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Characters to Trim (optional):
        </label>
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
          placeholder="Leave empty to trim whitespace"
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
          "{result}"
        </div>
      </div>

      <div>
        <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Quick Examples:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          {examples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(example.input);
                setChars(example.chars);
              }}
              style={{
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                textAlign: 'left',
              }}
            >
              <div>"{example.input}"</div>
              <div style={{ fontSize: '10px', opacity: 0.8 }}>chars: "{example.chars || 'whitespace'}"</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

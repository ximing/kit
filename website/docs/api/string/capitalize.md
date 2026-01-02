---
id: capitalize
title: capitalize
description: "Converts the first character of string to upper case and the remainder to lower case."
---

# `capitalize`

Converts the first character of string to upper case and the remainder to lower case.

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `str` | `any` | - The string to capitalize |

## Returns

- **Type**: `any`
- **Description**: The capitalized string

## Examples

```typescript
* capitalize('FRED') // => 'Fred'
 * capitalize('foo') // => 'Foo'
```

## Interactive Example

```tsx live
function CapitalizeExample() {
  const [input, setInput] = useState('hello world');
  const result = capitalize(input);

  const examples = ['hello world', 'HELLO', 'foo', 'fRED', ''];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Input:
        </label>
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
          placeholder="Enter text to capitalize"
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
          }}
        >
          {result}
        </div>
      </div>

      <div>
        <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Quick Examples:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => setInput(example)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {example || '(empty)'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```


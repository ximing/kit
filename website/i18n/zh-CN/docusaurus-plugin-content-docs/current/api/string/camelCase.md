---
id: camelCase
title: camelCase
description: 'Converts string to camel case.'
---

# `camelCase`

Converts string to camel case.

## 参数

| 参数  | 类型  | 描述                    |
| ----- | ----- | ----------------------- |
| `str` | `any` | - The string to convert |

## 返回值

- **类型**: `any`
- **描述**: The camel cased string

## 示例

```typescript
* camelCase('Foo Bar') // => 'fooBar'
 * camelCase('--foo-bar--') // => 'fooBar'
 * camelCase('foo_bar') // => 'fooBar'
```

## 交互式示例

```tsx live
function CamelCaseExample() {
  const [input, setInput] = useState('foo bar');
  const result = camelCase(input);

  const examples = ['foo bar', 'Foo Bar', '--foo-bar--', 'foo_bar', 'fooBar', 'FOO_BAR'];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Input:</label>
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
          placeholder="Enter text to convert"
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
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

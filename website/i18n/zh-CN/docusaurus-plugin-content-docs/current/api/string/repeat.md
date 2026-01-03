---
id: repeat
title: repeat
description: 'Repeats the given string n times.'
---

# `repeat`

Repeats the given string n times.

## 参数

| 参数  | 类型  | 描述                                       |
| ----- | ----- | ------------------------------------------ |
| `str` | `any` | - The string to repeat                     |
| `n`   | `any` | - The number of times to repeat the string |

## 返回值

- **类型**: `any`
- **描述**: The repeated string

## 示例

```typescript
* repeat('*', 3) // => '***'
 * repeat('abc', 2) // => 'abcabc'
 * repeat('abc', 0) // => ''
```

## 交互式示例

```tsx live
function RepeatExample() {
  const [input, setInput] = useState('*');
  const [count, setCount] = useState(3);
  const result = repeat(input, count);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>String to Repeat:</label>
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
          placeholder="Enter string"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Repeat Count: {count}</label>
        <input
          type="range"
          min="0"
          max="10"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{ width: '100%' }}
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
            minHeight: '40px',
          }}
        >
          {result}
        </div>
      </div>
    </div>
  );
}
```

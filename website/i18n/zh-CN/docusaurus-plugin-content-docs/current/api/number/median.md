---
id: median
title: median
description: 'Computes the median of the values in array.'
---

# `median`

Computes the median of the values in array.

## 参数

| 参数      | 类型  | 描述                                      |
| --------- | ----- | ----------------------------------------- |
| `numbers` | `any` | - The array of numbers to get median from |

## 返回值

- **类型**: `any`
- **描述**: Returns the median

## 示例

```typescript
* median([1, 2, 3, 4, 5]) // => 3
 * median([1, 2, 3, 4]) // => 2.5
 * median([]) // => 0
```

## 交互式示例

```tsx live
function MedianExample() {
  const [input, setInput] = useState('1, 2, 3, 4, 5');

  const numbers = input
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s !== '')
    .map(Number)
    .filter((n) => !isNaN(n));

  const result = median(numbers);
  const sorted = [...numbers].sort((a, b) => a - b);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Median Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px', display: 'block', marginBottom: '5px' }}>
          Enter numbers (comma-separated):
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 1, 2, 3, 4, 5"
          style={{ padding: '5px', fontSize: '14px', width: '300px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input Array:</strong> {JSON.stringify(numbers)}
        </p>
        <p>
          <strong>Sorted Array:</strong> {JSON.stringify(sorted)}
        </p>
        <p>
          <strong>Median:</strong> {result}
        </p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          {numbers.length % 2 === 0
            ? `Even count: (${sorted[sorted.length / 2 - 1]} + ${sorted[sorted.length / 2]}) / 2 = ${result}`
            : `Odd count: middle value is ${result}`}
        </p>
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p>
          <strong>Examples:</strong>
        </p>
        <ul>
          <li>median([1, 2, 3, 4, 5]) → 3 (middle value)</li>
          <li>median([1, 2, 3, 4]) → 2.5 (average of two middle values)</li>
          <li>median([]) → 0</li>
        </ul>
      </div>
    </div>
  );
}
```

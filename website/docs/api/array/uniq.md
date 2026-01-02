---
id: uniq
title: uniq
description: "Removes duplicate values from an array"
---

# `uniq`

Removes duplicate values from an array

## Parameters

| Parameter | Type | Description |
|---------|------|---------|
| `array` | `any` | The array to deduplicate |

## Returns

- **Type**: `any`
- **Description**: A new array with duplicate values removed

## Examples

```typescript
* uniq([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
 * uniq(['a', 'b', 'a', 'c']); // ['a', 'b', 'c']
```

## Interactive Example

```tsx live
function UniqExample() {
  const [inputText, setInputText] = useState('1, 2, 2, 3, 3, 3, 4, 4, 5');
  const [useUniqBy, setUseUniqBy] = useState(false);

  const parseInput = (text) => {
    try {
      return text.split(',').map((s) => Number(s.trim())).filter((n) => !isNaN(n));
    } catch {
      return [];
    }
  };

  const array = parseInput(inputText);
  const result = useUniqBy ? uniqBy(array, (item) => item % 2) : uniq(array);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Array Uniq Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Input Array (comma-separated):</label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
          placeholder="e.g., 1, 2, 2, 3, 3, 3"
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>
          <input
            type="checkbox"
            checked={useUniqBy}
            onChange={(e) => setUseUniqBy(e.target.checked)}
          />
          Use uniqBy (by odd/even)
        </label>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> {JSON.stringify(array)}
        </p>
        <p>
          <strong>Unique values:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}
```


---
id: padEnd
title: padEnd
description: "Pads a string on the right side if it's shorter than the specified length"
---

# `padEnd`

Pads a string on the right side if it's shorter than the specified length. Useful for formatting text alignment, creating fixed-width columns, and aligning output.

## Syntax

```typescript
function padEnd(str: string, length: number, chars?: string): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description                                    |
| --------- | -------- | -------- | ------- | ---------------------------------------------- |
| `str`     | `string` | ✅       | -       | The string to pad                              |
| `length`  | `number` | ✅       | -       | The target length of the string                |
| `chars`   | `string` | ❌       | ' '     | The string to use for padding (default: space) |

## Return Value

- **Type**: `string`
- **Description**: The padded string. If the string is already longer than or equal to the target length, returns it as-is. Non-string inputs return an empty string.

## Examples

### Basic Usage

```typescript
import { padEnd } from '@rabjs/kit';

// Example 1: Pad with spaces (default)
const str1 = padEnd('abc', 6);
console.log(str1); // 'abc   '

// Example 2: Pad with custom characters
const str2 = padEnd('abc', 6, '_-');
console.log(str2); // 'abc_-_'

// Example 3: String already meets length
const str3 = padEnd('abc', 3);
console.log(str3); // 'abc'
```

### Advanced Usage

```typescript
// Example 4: Pad with dots
const str4 = padEnd('Item', 10, '.');
console.log(str4); // 'Item......'

// Example 5: Pad with multi-character pattern
const str5 = padEnd('hello', 10, '=*');
console.log(str5); // 'hello=*=*='

// Example 6: Create table-like output
const items = ['Name', 'Age', 'City'];
const padded = items.map((item) => padEnd(item, 15, '.'));
console.log(padded.join('\n'));
// 'Name...........
//  Age............
//  City............'
```

### Practical Use Cases

```typescript
// Example 7: Format table columns
function formatTableRow(columns: string[], width: number = 20): string {
  return columns.map((col) => padEnd(col, width, ' ')).join('|');
}

console.log(formatTableRow(['Name', 'Email', 'Status']));
// 'Name                |Email               |Status              '

// Example 8: Create menu items with dots
function createMenuLine(label: string, price: number): string {
  const dotCount = 40 - label.length - String(price).length;
  return `${label}${'.'.repeat(dotCount)}${price}`;
}

console.log(createMenuLine('Coffee', 3.5)); // 'Coffee.................................3.5'
console.log(createMenuLine('Espresso', 2.0)); // 'Espresso...............................2'

// Example 9: Format log output
function formatLogLine(level: string, message: string): string {
  const paddedLevel = padEnd(`[${level}]`, 10);
  return `${paddedLevel} ${message}`;
}

console.log(formatLogLine('INFO', 'Application started'));
// '[INFO]     Application started'

// Example 10: Create aligned labels
function createLabelValue(label: string, value: string): string {
  return `${padEnd(label, 20)}: ${value}`;
}

console.log(createLabelValue('Username', 'john_doe'));
// 'Username            : john_doe'
console.log(createLabelValue('Email', 'john@example.com'));
// 'Email               : john@example.com'
```

## Interactive Example

```tsx live
function PadEndExample() {
  const [input, setInput] = React.useState('abc');
  const [length, setLength] = React.useState(6);
  const [chars, setChars] = React.useState('_-');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(padEnd(input, parseInt(length) || 0, chars || ' '));
  }, [input, length, chars]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>padEnd Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Input String:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to pad"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>Target Length:</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          min="0"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>Padding Characters:</label>
        <input
          type="text"
          value={chars}
          onChange={(e) => setChars(e.target.value)}
          placeholder="e.g., _- or ."
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <strong>Result:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', borderRadius: '4px' }}>
          '{result}'
        </pre>
      </div>
    </div>
  );
}
```

## Notes

- ⚠️ **Edge Cases**: Non-string inputs return an empty string
- ⚠️ **Empty Padding**: If `chars` is empty, the string is returned as-is
- 💡 **Pattern Repetition**: The padding pattern repeats as needed to reach the target length
- 💡 **Performance Tip**: The function is efficient with O(n) complexity
- 🔒 **Type Safety**: Maintains consistent string type throughout
- 📚 **Best Practice**: Use for creating fixed-width columns, table formatting, and aligned output

## Related Functions

- [`padStart`](./padStart) - Pad on the left side
- [`trim`](./trim) - Remove leading and trailing characters
- [`truncate`](./truncate) - Truncate strings to maximum length

## Version History

- **v0.0.1** - Initial version

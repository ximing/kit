---
id: padStart
title: padStart
description: "Pads a string on the left side if it's shorter than the specified length"
---

# `padStart`

Pads a string on the left side if it's shorter than the specified length. Useful for formatting numbers with leading zeros, aligning text, and creating fixed-width strings.

## Syntax

```typescript
function padStart(str: string, length: number, chars?: string): string;
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
import { padStart } from '@rabjs/kit';

// Example 1: Pad with spaces (default)
const str1 = padStart('abc', 6);
console.log(str1); // '   abc'

// Example 2: Pad with custom characters
const str2 = padStart('abc', 6, '_-');
console.log(str2); // '_-_abc'

// Example 3: String already meets length
const str3 = padStart('abc', 3);
console.log(str3); // 'abc'
```

### Advanced Usage

```typescript
// Example 4: Pad numbers with leading zeros
const str4 = padStart('5', 3, '0');
console.log(str4); // '005'

// Example 5: Pad with multi-character pattern
const str5 = padStart('hello', 10, '=*');
console.log(str5); // '=*=*hello'

// Example 6: Multiple padding patterns
const nums = ['1', '42', '123'];
const padded = nums.map((n) => padStart(n, 3, '0'));
console.log(padded); // ['001', '042', '123']
```

### Practical Use Cases

```typescript
// Example 7: Format time values
function formatTime(hours: number, minutes: number): string {
  return `${padStart(String(hours), 2, '0')}:${padStart(String(minutes), 2, '0')}`;
}

console.log(formatTime(9, 5)); // '09:05'
console.log(formatTime(14, 30)); // '14:30'

// Example 8: Format product codes
function formatProductCode(code: string): string {
  return `PROD-${padStart(code, 5, '0')}`;
}

console.log(formatProductCode('123')); // 'PROD-00123'
console.log(formatProductCode('5')); // 'PROD-00005'

// Example 9: Create aligned output
function createAlignedList(items: string[]): string {
  const maxLength = Math.max(...items.map((i) => i.length));
  return items.map((item) => padStart(item, maxLength, '.')).join('\n');
}

console.log(createAlignedList(['short', 'medium text', 'x']));
// 'short......
//  medium text
//  x..........'

// Example 10: Format invoice numbers
function formatInvoice(number: number): string {
  return `INV-${padStart(String(number), 6, '0')}`;
}

console.log(formatInvoice(42)); // 'INV-000042'
console.log(formatInvoice(1234)); // 'INV-001234'
```

## Interactive Example

```tsx live
function PadStartExample() {
  const [input, setInput] = React.useState('abc');
  const [length, setLength] = React.useState(6);
  const [chars, setChars] = React.useState('_-');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(padStart(input, parseInt(length) || 0, chars || ' '));
  }, [input, length, chars]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>padStart Interactive Example</h4>
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
          placeholder="e.g., _- or 0"
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
- 📚 **Best Practice**: Use for formatting numbers, creating fixed-width output, and aligning text

## Related Functions

- [`padEnd`](./padEnd) - Pad on the right side
- [`trim`](./trim) - Remove leading and trailing characters
- [`truncate`](./truncate) - Truncate strings to maximum length

## Version History

- **v1.0.0** - Initial version

---
id: repeat
title: repeat
description: 'Repeats the given string n times'
---

# `repeat`

Repeats the given string n times. Useful for generating separators, creating patterns, and duplicating strings.

## Syntax

```typescript
function repeat(str: string, n: number): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description                                                               |
| --------- | -------- | -------- | ------- | ------------------------------------------------------------------------- |
| `str`     | `string` | ✅       | -       | The string to repeat                                                      |
| `n`       | `number` | ✅       | -       | The number of times to repeat the string (must be a non-negative integer) |

## Return Value

- **Type**: `string`
- **Description**: The repeated string. If n is 0 or negative, returns an empty string. Non-string inputs or non-integer n return an empty string.

## Examples

### Basic Usage

```typescript
import { repeat } from '@rabjs/kit';

// Example 1: Repeat a character
const str1 = repeat('*', 3);
console.log(str1); // '***'

// Example 2: Repeat a string
const str2 = repeat('abc', 2);
console.log(str2); // 'abcabc'

// Example 3: Zero repetitions
const str3 = repeat('abc', 0);
console.log(str3); // ''
```

### Advanced Usage

```typescript
// Example 4: Repeat with larger number
const str4 = repeat('=', 10);
console.log(str4); // '=========='

// Example 5: Repeat multi-character strings
const str5 = repeat('-> ', 3);
console.log(str5); // '-> -> -> '

// Example 6: Create patterns
const str6 = repeat('ab', 5);
console.log(str6); // 'ababababab'
```

### Practical Use Cases

```typescript
// Example 7: Create separator lines
function createSeparator(char: string = '-', length: number = 50): string {
  return repeat(char, Math.ceil(length / char.length)).slice(0, length);
}

console.log(createSeparator()); // '---...---' (50 dashes)
console.log(createSeparator('=', 20)); // '===================='
console.log(createSeparator('*=', 15)); // '*=*=*=*=*=*=*=*'

// Example 8: Create indentation
function createIndent(level: number, indentStr: string = '  '): string {
  return repeat(indentStr, level);
}

console.log(createIndent(0) + 'Level 0'); // 'Level 0'
console.log(createIndent(1) + 'Level 1'); // '  Level 1'
console.log(createIndent(3) + 'Level 3'); // '      Level 3'

// Example 9: Generate test data
function generatePattern(pattern: string, repetitions: number): string {
  return repeat(pattern, repetitions);
}

console.log(generatePattern('123', 4)); // '123123123123'
console.log(generatePattern('a', 10)); // 'aaaaaaaaaa'

// Example 10: Create visual elements
function createProgressBar(filled: number, total: number = 20): string {
  const filledPart = repeat('█', filled);
  const emptyPart = repeat('░', total - filled);
  return `[${filledPart}${emptyPart}] ${filled}/${total}`;
}

console.log(createProgressBar(5, 20)); // '[█████░░░░░░░░░░░░░░] 5/20'
console.log(createProgressBar(15, 20)); // '[███████████████░░░░░] 15/20'
```

## Interactive Example

```tsx live
function RepeatExample() {
  const [input, setInput] = React.useState('*');
  const [count, setCount] = React.useState(5);
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(repeat(input, parseInt(count) || 0));
  }, [input, count]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>repeat Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>String to Repeat:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter string"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>Repeat Count:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          min="0"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <strong>Result:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', borderRadius: '4px' }}>
          {result}
        </pre>
      </div>
    </div>
  );
}
```

## Notes

- ⚠️ **Edge Cases**: Non-string inputs return an empty string
- ⚠️ **Edge Cases**: Non-integer or negative n returns an empty string
- ⚠️ **Edge Cases**: n must be finite
- 💡 **Performance Tip**: The function is efficient with O(n\*m) complexity where n is the repeat count and m is string length
- 💡 **Large Counts**: Be careful with very large repeat counts to avoid memory issues
- 🔒 **Type Safety**: Maintains consistent string type throughout
- 📚 **Best Practice**: Use for creating separators, patterns, and visual elements

## Related Functions

- [`padStart`](./padStart) - Pad on the left side
- [`padEnd`](./padEnd) - Pad on the right side
- [`template`](./template) - Replace template placeholders

## Version History

- **v1.0.0** - Initial version

---
id: trim
title: trim
description: 'Removes leading and trailing whitespace or specified characters from a string'
---

# `trim`

Removes leading and trailing whitespace or specified characters from a string. By default, it removes whitespace; you can specify custom characters to remove instead.

## Syntax

```typescript
function trim(str: string, chars?: string): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description                                                |
| --------- | -------- | -------- | ------- | ---------------------------------------------------------- |
| `str`     | `string` | ✅       | -       | The string to trim                                         |
| `chars`   | `string` | ❌       | -       | Characters to remove (if not provided, removes whitespace) |

## Return Value

- **Type**: `string`
- **Description**: The trimmed string with leading and trailing characters removed. Non-string inputs return an empty string.

## Examples

### Basic Usage

```typescript
import { trim } from '@rabjs/kit';

// Example 1: Trim whitespace (default)
const str1 = trim('  abc  ');
console.log(str1); // 'abc'

// Example 2: Trim specific characters
const str2 = trim('-_-abc-_-', '-_');
console.log(str2); // 'abc'

// Example 3: Trim tabs and newlines
const str3 = trim('\t\nabc\n\t');
console.log(str3); // 'abc'
```

### Advanced Usage

```typescript
// Example 4: Trim custom prefix/suffix
const str4 = trim('***hello***', '*');
console.log(str4); // 'hello'

// Example 5: Trim multiple character types
const str5 = trim('---===text===---', '-=');
console.log(str5); // 'text'

// Example 6: Only whitespace at edges is trimmed
const str6 = trim('  a  b  c  ');
console.log(str6); // 'a  b  c'
```

### Practical Use Cases

```typescript
// Example 7: Clean user input
function cleanUserInput(input: string): string {
  return trim(input);
}

console.log(cleanUserInput('  John Doe  ')); // 'John Doe'
console.log(cleanUserInput('\n\tAlice\t\n')); // 'Alice'

// Example 8: Remove URL protocol
function removeUrlProtocol(url: string): string {
  return trim(url, '/');
}

console.log(removeUrlProtocol('///example.com///')); // 'example.com'

// Example 9: Parse CSV-like data
function parseValue(value: string): string {
  return trim(value, ' "');
}

console.log(parseValue('  "hello world"  ')); // 'hello world'
console.log(parseValue('"name"')); // 'name'

// Example 10: Clean log messages
function formatLogMessage(message: string): string {
  return trim(message, ' \n\t');
}

console.log(formatLogMessage('  \n  Error occurred  \n  ')); // 'Error occurred'
```

## Interactive Example

```tsx live
function TrimExample() {
  const [input, setInput] = React.useState('  hello world  ');
  const [chars, setChars] = React.useState('');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(trim(input, chars || undefined));
  }, [input, chars]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>trim Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Input String:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to trim"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Characters to Trim (leave empty for whitespace):
        </label>
        <input
          type="text"
          value={chars}
          onChange={(e) => setChars(e.target.value)}
          placeholder="e.g., -_ or leave empty"
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
- ⚠️ **Character Escaping**: Special regex characters in the `chars` parameter are automatically escaped
- 💡 **Default Behavior**: If no `chars` provided, uses native JavaScript `trim()` which removes whitespace
- 💡 **Performance Tip**: The function is efficient with O(n) complexity
- 🔒 **Type Safety**: Maintains consistent string type throughout
- 📚 **Best Practice**: Use for cleaning user input and normalizing strings

## Related Functions

- [`trimStart`](./trimStart) - Remove leading characters only
- [`trimEnd`](./trimEnd) - Remove trailing characters only
- [`template`](./template) - Replace template placeholders
- [`truncate`](./truncate) - Truncate strings to maximum length

## Version History

- **v1.0.0** - Initial version

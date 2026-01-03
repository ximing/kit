---
id: trimStart
title: trimStart
description: 'Removes leading whitespace or specified characters from a string'
---

# `trimStart`

Removes leading whitespace or specified characters from the start of a string. Also known as `trimLeft`. This is useful when you only want to remove characters from the beginning of a string.

## Syntax

```typescript
function trimStart(str: string, chars?: string): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description                                                |
| --------- | -------- | -------- | ------- | ---------------------------------------------------------- |
| `str`     | `string` | ✅       | -       | The string to trim                                         |
| `chars`   | `string` | ❌       | -       | Characters to remove (if not provided, removes whitespace) |

## Return Value

- **Type**: `string`
- **Description**: The string with leading characters removed. Non-string inputs return an empty string.

## Examples

### Basic Usage

```typescript
import { trimStart } from '@rabjs/kit';

// Example 1: Trim leading whitespace (default)
const str1 = trimStart('  abc  ');
console.log(str1); // 'abc  '

// Example 2: Trim leading specific characters
const str2 = trimStart('-_-abc-_-', '-_');
console.log(str2); // 'abc-_-'

// Example 3: Trim leading tabs and newlines
const str3 = trimStart('\t\nabc\n\t');
console.log(str3); // 'abc\n\t'
```

### Advanced Usage

```typescript
// Example 4: Trim leading custom prefix
const str4 = trimStart('***hello***', '*');
console.log(str4); // 'hello***'

// Example 5: Trim multiple leading character types
const str5 = trimStart('---===text===---', '-=');
console.log(str5); // 'text===---'

// Example 6: Only leading characters are trimmed
const str6 = trimStart('  a  b  c  ');
console.log(str6); // 'a  b  c  '
```

### Practical Use Cases

```typescript
// Example 7: Remove leading indentation
function removeIndentation(line: string): string {
  return trimStart(line, ' \t');
}

console.log(removeIndentation('    code here')); // 'code here'
console.log(removeIndentation('\t\tindented')); // 'indented'

// Example 8: Remove leading URL slashes
function normalizeUrl(url: string): string {
  return trimStart(url, '/');
}

console.log(normalizeUrl('///example.com')); // 'example.com'
console.log(normalizeUrl('/path/to/page')); // 'path/to/page'

// Example 9: Parse command-line arguments
function parseArgument(arg: string): string {
  return trimStart(arg, '-');
}

console.log(parseArgument('--verbose')); // 'verbose'
console.log(parseArgument('---flag')); // '-flag'

// Example 10: Clean message prefixes
function stripMessagePrefix(message: string): string {
  return trimStart(message, '[!] ');
}

console.log(stripMessagePrefix('[!] [!] Warning')); // 'Warning'
```

## Interactive Example

```tsx live
function TrimStartExample() {
  const [input, setInput] = React.useState('  hello world  ');
  const [chars, setChars] = React.useState('');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(trimStart(input, chars || undefined));
  }, [input, chars]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>trimStart Interactive Example</h4>
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
- ⚠️ **Also known as**: `trimLeft` in some libraries
- 💡 **Default Behavior**: If no `chars` provided, uses native JavaScript `trimStart()` which removes whitespace
- 💡 **Performance Tip**: The function is efficient with O(n) complexity
- 🔒 **Type Safety**: Maintains consistent string type throughout
- 📚 **Best Practice**: Use for removing leading whitespace, prefixes, and indentation

## Related Functions

- [`trim`](./trim) - Remove leading and trailing characters
- [`trimEnd`](./trimEnd) - Remove trailing characters only
- [`truncate`](./truncate) - Truncate strings to maximum length

## Version History

- **v1.0.0** - Initial version

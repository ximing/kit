---
id: trimEnd
title: trimEnd
description: 'Removes trailing whitespace or specified characters from a string'
---

# `trimEnd`

Removes trailing whitespace or specified characters from the end of a string. Also known as `trimRight`. This is useful when you only want to remove characters from the end of a string.

## Syntax

```typescript
function trimEnd(str: string, chars?: string): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description                                                |
| --------- | -------- | -------- | ------- | ---------------------------------------------------------- |
| `str`     | `string` | ✅       | -       | The string to trim                                         |
| `chars`   | `string` | ❌       | -       | Characters to remove (if not provided, removes whitespace) |

## Return Value

- **Type**: `string`
- **Description**: The string with trailing characters removed. Non-string inputs return an empty string.

## Examples

### Basic Usage

```typescript
import { trimEnd } from '@rabjs/kit';

// Example 1: Trim trailing whitespace (default)
const str1 = trimEnd('  abc  ');
console.log(str1); // '  abc'

// Example 2: Trim trailing specific characters
const str2 = trimEnd('-_-abc-_-', '-_');
console.log(str2); // '-_-abc'

// Example 3: Trim trailing tabs and newlines
const str3 = trimEnd('\t\nabc\n\t');
console.log(str3); // '\t\nabc'
```

### Advanced Usage

```typescript
// Example 4: Trim trailing custom suffix
const str4 = trimEnd('hello***', '*');
console.log(str4); // 'hello'

// Example 5: Trim multiple trailing character types
const str5 = trimEnd('---===text===---', '-=');
console.log(str5); // '---===text'

// Example 6: Only trailing characters are trimmed
const str6 = trimEnd('  a  b  c  ');
console.log(str6); // '  a  b  c'
```

### Practical Use Cases

```typescript
// Example 7: Remove trailing newlines
function removeTrailingNewlines(text: string): string {
  return trimEnd(text, '\n\r');
}

console.log(removeTrailingNewlines('Hello\n\n')); // 'Hello'
console.log(removeTrailingNewlines('World\r\n')); // 'World'

// Example 8: Remove trailing slashes from paths
function normalizePath(path: string): string {
  return trimEnd(path, '/');
}

console.log(normalizePath('/home/user/')); // '/home/user'
console.log(normalizePath('/var/log///')); // '/var/log'

// Example 9: Remove trailing punctuation
function cleanSentence(sentence: string): string {
  return trimEnd(sentence, '.,!?;:');
}

console.log(cleanSentence('Hello world!!!')); // 'Hello world'
console.log(cleanSentence('What??')); // 'What'

// Example 10: Remove trailing commas from lists
function cleanList(list: string): string {
  return trimEnd(list, ',');
}

console.log(cleanList('apple,banana,orange,')); // 'apple,banana,orange'
```

## Interactive Example

```tsx live
function TrimEndExample() {
  const [input, setInput] = React.useState('  hello world  ');
  const [chars, setChars] = React.useState('');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(trimEnd(input, chars || undefined));
  }, [input, chars]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>trimEnd Interactive Example</h4>
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
- ⚠️ **Also known as**: `trimRight` in some libraries
- 💡 **Default Behavior**: If no `chars` provided, uses native JavaScript `trimEnd()` which removes whitespace
- 💡 **Performance Tip**: The function is efficient with O(n) complexity
- 🔒 **Type Safety**: Maintains consistent string type throughout
- 📚 **Best Practice**: Use for removing trailing whitespace, suffixes, and line endings

## Related Functions

- [`trim`](./trim) - Remove leading and trailing characters
- [`trimStart`](./trimStart) - Remove leading characters only
- [`truncate`](./truncate) - Truncate strings to maximum length

## Version History

- **v1.0.0** - Initial version

---
id: upperFirst
title: upperFirst
description: 'Converts the first character of a string to upper case'
---

# `upperFirst`

Converts the first character of a string to upper case while leaving the remainder unchanged. This is useful when you only want to capitalize the first letter without modifying the rest of the string.

## Syntax

```typescript
function upperFirst(str: string): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description           |
| --------- | -------- | -------- | ------- | --------------------- |
| `str`     | `string` | ✅       | -       | The string to convert |

## Return Value

- **Type**: `string`
- **Description**: The string with the first character converted to upper case. Empty strings and non-strings are returned as-is.

## Examples

### Basic Usage

```typescript
import { upperFirst } from '@rabjs/kit';

// Example 1: Uppercase first character
const str1 = upperFirst('fred');
console.log(str1); // 'Fred'

// Example 2: Already uppercase
const str2 = upperFirst('FRED');
console.log(str2); // 'FRED'

// Example 3: Mixed case
const str3 = upperFirst('fRED');
console.log(str3); // 'FRED'
```

### Advanced Usage

```typescript
// Example 4: Process list of words
const words = ['hello', 'WORLD', 'fOO'];
const processed = words.map(upperFirst);
console.log(processed); // ['Hello', 'WORLD', 'FOO']

// Example 5: Format acronyms with first letter
function formatAcronym(acronym: string): string {
  return upperFirst(acronym.toLowerCase());
}

console.log(formatAcronym('API')); // 'Api'
console.log(formatAcronym('html')); // 'Html'
```

### Practical Use Cases

```typescript
// Example 6: Capitalize sentence starts
function startSentence(text: string): string {
  return upperFirst(text);
}

console.log(startSentence('the quick brown fox')); // 'The quick brown fox'
console.log(startSentence('hello WORLD')); // 'Hello WORLD'

// Example 7: Format display names preserving case
function formatDisplayName(name: string): string {
  return upperFirst(name);
}

console.log(formatDisplayName('mCDonald')); // 'MCDonald'
console.log(formatDisplayName('oConnell')); // 'OConnell'

// Example 8: Generate labels from codes
function generateLabel(code: string): string {
  return upperFirst(code.replace(/_/g, ' '));
}

console.log(generateLabel('user_profile')); // 'User profile'
console.log(generateLabel('api_key')); // 'Api key'
```

## Interactive Example

```tsx live
function UpperFirstExample() {
  const [input, setInput] = React.useState('hello world');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(upperFirst(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>upperFirst Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Input String:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert"
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

- ⚠️ **Edge Cases**: Empty strings are returned as-is
- ⚠️ **Edge Cases**: Non-string inputs are returned as-is
- ⚠️ **Difference from capitalize**: This function only affects the first character, the rest remains unchanged
- 💡 **Performance Tip**: The function is very efficient with O(n) complexity
- 🔒 **Type Safety**: Maintains consistent string type throughout the conversion
- 📚 **Best Practice**: Use when you need to preserve the case of the rest of the string

## Related Functions

- [`lowerFirst`](./lowerFirst) - Convert the first character to lower case
- [`capitalize`](./capitalize) - Capitalize first character and lowercase the rest
- [`camelCase`](./camelCase) - Convert to camelCase (firstName)
- [`pascalCase`](./pascalCase) - Convert to PascalCase (FirstName)

## Version History

- **v1.0.0** - Initial version

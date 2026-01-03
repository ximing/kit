---
id: capitalize
title: capitalize
description: 'Converts the first character to upper case and the remainder to lower case'
---

# `capitalize`

Converts the first character of a string to upper case and the remainder to lower case. This is useful for normalizing strings to a standard format.

## Syntax

```typescript
function capitalize(str: string): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description              |
| --------- | -------- | -------- | ------- | ------------------------ |
| `str`     | `string` | ✅       | -       | The string to capitalize |

## Return Value

- **Type**: `string`
- **Description**: The capitalized string with the first character in upper case and the rest in lower case. Empty strings and non-strings are returned as-is.

## Examples

### Basic Usage

```typescript
import { capitalize } from '@rabjs/kit';

// Example 1: Capitalize a lowercase string
const str1 = capitalize('fred');
console.log(str1); // 'Fred'

// Example 2: Normalize an uppercase string
const str2 = capitalize('FRED');
console.log(str2); // 'Fred'

// Example 3: Mixed case string
const str3 = capitalize('fReD');
console.log(str3); // 'Fred'
```

### Advanced Usage

```typescript
// Example 4: Capitalize names from a list
const names = ['john', 'JANE', 'bOb'];
const capitalizedNames = names.map(capitalize);
console.log(capitalizedNames); // ['John', 'Jane', 'Bob']

// Example 5: Format user input
function formatUserName(input: string): string {
  return capitalize(input.trim());
}

console.log(formatUserName('  alice  ')); // 'Alice'
console.log(formatUserName('CHARLIE')); // 'Charlie'
```

### Practical Use Cases

```typescript
// Example 6: Display formatted names in UI
function displayUserName(firstName: string, lastName: string): string {
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
}

console.log(displayUserName('john', 'DOE')); // 'John Doe'
console.log(displayUserName('JANE', 'smith')); // 'Jane Smith'

// Example 7: Normalize sentence starts
function normalizeSentence(sentence: string): string {
  const words = sentence.split(' ');
  return [capitalize(words[0]), ...words.slice(1)].join(' ');
}

console.log(normalizeSentence('hello WORLD')); // 'Hello WORLD'
console.log(normalizeSentence('tHE QUICK BROWN FOX')); // 'The QUICK BROWN FOX'

// Example 8: Form field display
const formData = {
  status: 'active',
  role: 'admin',
  type: 'premium',
};

const displayLabels = Object.fromEntries(
  Object.entries(formData).map(([key, value]) => [key, capitalize(value as string)]),
);
console.log(displayLabels);
// { status: 'Active', role: 'Admin', type: 'Premium' }
```

## Interactive Example

```tsx live
function CapitalizeExample() {
  const [input, setInput] = React.useState('hello world');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(capitalize(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>capitalize Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Input String:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to capitalize"
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
- 💡 **Performance Tip**: The function is very efficient with O(n) complexity
- 🔒 **Type Safety**: Maintains consistent string type throughout the conversion
- 📚 **Best Practice**: Use for normalizing user-facing text and display names

## Related Functions

- [`upperFirst`](./upperFirst) - Only capitalize the first character
- [`lowerFirst`](./lowerFirst) - Only lowercase the first character
- [`camelCase`](./camelCase) - Convert to camelCase (firstName)
- [`pascalCase`](./pascalCase) - Convert to PascalCase (FirstName)

## Version History

- **v1.0.0** - Initial version

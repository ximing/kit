---
id: camelCase
title: camelCase
description: 'Converts string to camel case (firstName, lastName, etc.)'
---

# `camelCase`

Converts a string to camel case format (e.g., firstName, lastName). This is commonly used for JavaScript variable names, object properties, and API field names.

## Syntax

```typescript
function camelCase(str: string): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description                         |
| --------- | -------- | -------- | ------- | ----------------------------------- |
| `str`     | `string` | ✅       | -       | The string to convert to camel case |

## Return Value

- **Type**: `string`
- **Description**: The converted camel case string. If the input is not a string, returns an empty string.

## Examples

### Basic Usage

```typescript
import { camelCase } from '@rabjs/kit';

// Example 1: Convert space-separated words
const str1 = camelCase('Foo Bar');
console.log(str1); // 'fooBar'

// Example 2: Convert kebab-case to camelCase
const str2 = camelCase('--foo-bar--');
console.log(str2); // 'fooBar'

// Example 3: Convert snake_case to camelCase
const str3 = camelCase('foo_bar');
console.log(str3); // 'fooBar'
```

### Advanced Usage

```typescript
// Example 4: Convert PascalCase to camelCase
const str4 = camelCase('FooBar');
console.log(str4); // 'fooBar'

// Example 5: Mixed separators
const str5 = camelCase('foo-bar_baz qux');
console.log(str5); // 'fooBarBazQux'

// Example 6: API field name conversion
function normalizeApiResponse(data: Record<string, any>) {
  const normalized: Record<string, any> = {};
  for (const key in data) {
    normalized[camelCase(key)] = data[key];
  }
  return normalized;
}

const response = {
  first_name: 'John',
  last_name: 'Doe',
  'user-id': 123,
};
const normalized = normalizeApiResponse(response);
console.log(normalized);
// { firstName: 'John', lastName: 'Doe', userId: 123 }
```

### Practical Use Cases

```typescript
// Example 7: TypeScript interface field naming
interface ApiUser {
  first_name: string;
  last_name: string;
  email_address: string;
}

function mapApiToModel(apiUser: ApiUser) {
  return {
    firstName: apiUser.first_name,
    lastName: apiUser.last_name,
    emailAddress: apiUser.email_address,
  };
}

// Example 8: Converting configuration keys
const config = {
  'api-url': 'https://api.example.com',
  'api-timeout': 5000,
  'api-retries': 3,
};

const camelConfig = Object.fromEntries(Object.entries(config).map(([key, value]) => [camelCase(key), value]));
console.log(camelConfig);
// { apiUrl: 'https://api.example.com', apiTimeout: 5000, apiRetries: 3 }
```

## Interactive Example

```tsx live
function CamelCaseExample() {
  const [input, setInput] = React.useState('hello-world-foo-bar');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(camelCase(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>camelCase Interactive Example</h4>
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

- ⚠️ **Edge Cases**: Non-string inputs return an empty string
- ⚠️ **Edge Cases**: Empty strings remain empty
- 💡 **Performance Tip**: The function uses regex operations which are efficient for typical string lengths
- 🔒 **Type Safety**: Maintains consistent string type throughout the conversion
- 📚 **Best Practice**: Use camelCase for JavaScript identifiers, object keys, and API field names

## Related Functions

- [`pascalCase`](./pascalCase) - Convert to PascalCase (FirstName)
- [`kebabCase`](./kebabCase) - Convert to kebab-case (first-name)
- [`snakeCase`](./snakeCase) - Convert to snake_case (first_name)
- [`capitalize`](./capitalize) - Capitalize the first character

## Version History

- **v1.0.0** - Initial version

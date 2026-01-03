---
id: snakeCase
title: snakeCase
description: 'Converts string to snake case (first_name, last_name, etc.)'
---

# `snakeCase`

Converts a string to snake case format (e.g., first_name, last_name). This is commonly used for database column names, API parameters, and Python variable names.

## Syntax

```typescript
function snakeCase(str: string): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description                         |
| --------- | -------- | -------- | ------- | ----------------------------------- |
| `str`     | `string` | ✅       | -       | The string to convert to snake case |

## Return Value

- **Type**: `string`
- **Description**: The converted snake case string. If the input is not a string, returns an empty string.

## Examples

### Basic Usage

```typescript
import { snakeCase } from '@rabjs/kit';

// Example 1: Convert space-separated words
const str1 = snakeCase('Foo Bar');
console.log(str1); // 'foo_bar'

// Example 2: Convert camelCase to snake_case
const str2 = snakeCase('fooBar');
console.log(str2); // 'foo_bar'

// Example 3: Convert kebab-case to snake_case
const str3 = snakeCase('foo-bar');
console.log(str3); // 'foo_bar'
```

### Advanced Usage

```typescript
// Example 4: Convert PascalCase to snake_case
const str4 = snakeCase('FooBar');
console.log(str4); // 'foo_bar'

// Example 5: Mixed separators
const str5 = snakeCase('foo-bar_baz qux');
console.log(str5); // 'foo_bar_baz_qux'

// Example 6: Database column name generation
function generateColumnName(name: string): string {
  return snakeCase(name);
}

console.log(generateColumnName('firstName')); // 'first_name'
console.log(generateColumnName('LastUpdated')); // 'last_updated'
```

### Practical Use Cases

```typescript
// Example 7: API parameter naming
function createApiParam(name: string): string {
  return snakeCase(name);
}

console.log(createApiParam('pageSize')); // 'page_size'
console.log(createApiParam('sortOrder')); // 'sort_order'

// Example 8: Environment variable naming
function createEnvVarName(name: string): string {
  return snakeCase(name).toUpperCase();
}

console.log(createEnvVarName('apiKey')); // 'API_KEY'
console.log(createEnvVarName('dbPassword')); // 'DB_PASSWORD'

// Example 9: Database schema mapping
const jsModel = {
  firstName: 'John',
  lastName: 'Doe',
  emailAddress: 'john@example.com',
};

const dbRecord = Object.fromEntries(Object.entries(jsModel).map(([key, value]) => [snakeCase(key), value]));
console.log(dbRecord);
// { first_name: 'John', last_name: 'Doe', email_address: 'john@example.com' }
```

## Interactive Example

```tsx live
function SnakeCaseExample() {
  const [input, setInput] = React.useState('helloWorldFooBar');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(snakeCase(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>snakeCase Interactive Example</h4>
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
- 📚 **Best Practice**: Use snake_case for database columns, API parameters, and environment variables

## Related Functions

- [`camelCase`](./camelCase) - Convert to camelCase (firstName)
- [`pascalCase`](./pascalCase) - Convert to PascalCase (FirstName)
- [`kebabCase`](./kebabCase) - Convert to kebab-case (first-name)
- [`capitalize`](./capitalize) - Capitalize the first character

## Version History

- **v1.0.0** - Initial version

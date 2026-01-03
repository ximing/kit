---
id: pascalCase
title: pascalCase
description: 'Converts string to pascal case (FirstName, LastName, etc.)'
---

# `pascalCase`

Converts a string to pascal case format (e.g., FirstName, LastName). This is commonly used for class names, component names, and type definitions.

## Syntax

```typescript
function pascalCase(str: string): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description                          |
| --------- | -------- | -------- | ------- | ------------------------------------ |
| `str`     | `string` | ✅       | -       | The string to convert to pascal case |

## Return Value

- **Type**: `string`
- **Description**: The converted pascal case string. If the input is not a string, returns an empty string.

## Examples

### Basic Usage

```typescript
import { pascalCase } from '@rabjs/kit';

// Example 1: Convert space-separated words
const str1 = pascalCase('foo bar');
console.log(str1); // 'FooBar'

// Example 2: Convert kebab-case to PascalCase
const str2 = pascalCase('--foo-bar--');
console.log(str2); // 'FooBar'

// Example 3: Convert snake_case to PascalCase
const str3 = pascalCase('foo_bar');
console.log(str3); // 'FooBar'
```

### Advanced Usage

```typescript
// Example 4: Convert camelCase to PascalCase
const str4 = pascalCase('fooBar');
console.log(str4); // 'FooBar'

// Example 5: Mixed separators
const str5 = pascalCase('foo-bar_baz qux');
console.log(str5); // 'FooBarBazQux'

// Example 6: Component name generation
function generateComponentName(name: string): string {
  return pascalCase(name);
}

console.log(generateComponentName('user-profile')); // 'UserProfile'
console.log(generateComponentName('navigation_menu')); // 'NavigationMenu'
```

### Practical Use Cases

```typescript
// Example 7: Class name generation
function createClassName(name: string): string {
  return `${pascalCase(name)}Component`;
}

console.log(createClassName('user-list')); // 'UserListComponent'
console.log(createClassName('data_table')); // 'DataTableComponent'

// Example 8: Type/Interface naming
function generateTypeName(name: string): string {
  return `I${pascalCase(name)}`;
}

console.log(generateTypeName('user-model')); // 'IUserModel'
console.log(generateTypeName('api_response')); // 'IApiResponse'

// Example 9: Enum value generation
const apiEndpoints = {
  'get-users': '/api/users',
  'post-user': '/api/users',
  delete_user: '/api/users/:id',
};

const enumEndpoints = Object.fromEntries(Object.entries(apiEndpoints).map(([key, value]) => [pascalCase(key), value]));
console.log(enumEndpoints);
// { GetUsers: '/api/users', PostUser: '/api/users', DeleteUser: '/api/users/:id' }
```

## Interactive Example

```tsx live
function PascalCaseExample() {
  const [input, setInput] = React.useState('hello-world-foo-bar');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(pascalCase(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>pascalCase Interactive Example</h4>
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
- 📚 **Best Practice**: Use PascalCase for class names, component names, and type definitions

## Related Functions

- [`camelCase`](./camelCase) - Convert to camelCase (firstName)
- [`kebabCase`](./kebabCase) - Convert to kebab-case (first-name)
- [`snakeCase`](./snakeCase) - Convert to snake_case (first_name)
- [`capitalize`](./capitalize) - Capitalize the first character

## Version History

- **v0.0.1** - Initial version

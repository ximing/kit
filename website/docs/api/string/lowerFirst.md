---
id: lowerFirst
title: lowerFirst
description: 'Converts the first character of a string to lower case'
---

# `lowerFirst`

Converts the first character of a string to lower case while leaving the remainder unchanged. This is useful for converting PascalCase identifiers to camelCase or normalizing capitalized strings.

## Syntax

```typescript
function lowerFirst(str: string): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description           |
| --------- | -------- | -------- | ------- | --------------------- |
| `str`     | `string` | ✅       | -       | The string to convert |

## Return Value

- **Type**: `string`
- **Description**: The string with the first character converted to lower case. Empty strings and non-strings are returned as-is.

## Examples

### Basic Usage

```typescript
import { lowerFirst } from '@rabjs/kit';

// Example 1: Lowercase first character
const str1 = lowerFirst('Fred');
console.log(str1); // 'fred'

// Example 2: Already lowercase
const str2 = lowerFirst('fred');
console.log(str2); // 'fred'

// Example 3: Mixed case
const str3 = lowerFirst('FRED');
console.log(str3); // 'fRED'
```

### Advanced Usage

```typescript
// Example 4: Convert PascalCase to camelCase
const names = ['User', 'Admin', 'Product'];
const camelNames = names.map(lowerFirst);
console.log(camelNames); // ['user', 'admin', 'product']

// Example 5: Process class names
function getInstanceName(className: string): string {
  return lowerFirst(className);
}

console.log(getInstanceName('UserService')); // 'userService'
console.log(getInstanceName('ApiClient')); // 'apiClient'
```

### Practical Use Cases

```typescript
// Example 6: Convert type names to variable names
function createVariableName(typeName: string): string {
  return lowerFirst(typeName);
}

console.log(createVariableName('HttpRequest')); // 'httpRequest'
console.log(createVariableName('DatabaseConnection')); // 'databaseConnection'

// Example 7: Format error messages
function formatErrorType(errorType: string): string {
  return lowerFirst(errorType);
}

console.log(formatErrorType('ValidationError')); // 'validationError'
console.log(formatErrorType('NetworkError')); // 'networkError'

// Example 8: Convert enum keys to object keys
const StatusEnum = {
  Active: 'active',
  Inactive: 'inactive',
  Pending: 'pending',
};

const statusMap = Object.fromEntries(
  Object.keys(StatusEnum).map((key) => [lowerFirst(key), StatusEnum[key as keyof typeof StatusEnum]]),
);
console.log(statusMap);
// { active: 'active', inactive: 'inactive', pending: 'pending' }
```

## Interactive Example

```tsx live
function LowerFirstExample() {
  const [input, setInput] = React.useState('Hello World');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(lowerFirst(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>lowerFirst Interactive Example</h4>
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
- ⚠️ **Opposite of upperFirst**: This function only affects the first character, the rest remains unchanged
- 💡 **Performance Tip**: The function is very efficient with O(n) complexity
- 🔒 **Type Safety**: Maintains consistent string type throughout the conversion
- 📚 **Best Practice**: Use when converting PascalCase to camelCase or normalizing class names

## Related Functions

- [`upperFirst`](./upperFirst) - Convert the first character to upper case
- [`capitalize`](./capitalize) - Capitalize first character and lowercase the rest
- [`camelCase`](./camelCase) - Convert to camelCase (firstName)
- [`pascalCase`](./pascalCase) - Convert to PascalCase (FirstName)

## Version History

- **v0.0.1** - Initial version

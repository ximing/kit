---
id: kebabCase
title: kebabCase
description: 'Converts string to kebab case (first-name, last-name, etc.)'
---

# `kebabCase`

Converts a string to kebab case format (e.g., first-name, last-name). This is commonly used for CSS class names, URL slugs, and hyphenated identifiers.

## Syntax

```typescript
function kebabCase(str: string): string;
```

## Parameters

| Parameter | Type     | Required | Default | Description                         |
| --------- | -------- | -------- | ------- | ----------------------------------- |
| `str`     | `string` | ✅       | -       | The string to convert to kebab case |

## Return Value

- **Type**: `string`
- **Description**: The converted kebab case string. If the input is not a string, returns an empty string.

## Examples

### Basic Usage

```typescript
import { kebabCase } from '@rabjs/kit';

// Example 1: Convert space-separated words
const str1 = kebabCase('Foo Bar');
console.log(str1); // 'foo-bar'

// Example 2: Convert camelCase to kebab-case
const str2 = kebabCase('fooBar');
console.log(str2); // 'foo-bar'

// Example 3: Convert snake_case to kebab-case
const str3 = kebabCase('foo_bar');
console.log(str3); // 'foo-bar'
```

### Advanced Usage

```typescript
// Example 4: Convert PascalCase to kebab-case
const str4 = kebabCase('FooBar');
console.log(str4); // 'foo-bar'

// Example 5: Mixed separators
const str5 = kebabCase('foo-bar_baz qux');
console.log(str5); // 'foo-bar-baz-qux'

// Example 6: CSS class name generation
function generateClassName(name: string): string {
  return `btn-${kebabCase(name)}`;
}

console.log(generateClassName('primaryButton')); // 'btn-primary-button'
console.log(generateClassName('DisabledState')); // 'btn-disabled-state'
```

### Practical Use Cases

```typescript
// Example 7: URL slug generation
function createUrlSlug(title: string): string {
  return kebabCase(title);
}

console.log(createUrlSlug('Welcome To My Blog')); // 'welcome-to-my-blog'
console.log(createUrlSlug('JavaScript Tips & Tricks')); // 'javascript-tips-tricks'

// Example 8: HTML data attribute naming
function createDataAttribute(name: string): string {
  return `data-${kebabCase(name)}`;
}

console.log(createDataAttribute('userId')); // 'data-user-id'
console.log(createDataAttribute('userName')); // 'data-user-name'

// Example 9: Event name formatting
const eventNames = {
  onUserClick: 'on-user-click',
  onDataUpdate: 'on-data-update',
  onFormSubmit: 'on-form-submit',
};

const normalizedEvents = Object.fromEntries(Object.entries(eventNames).map(([key, _]) => [key, kebabCase(key)]));
console.log(normalizedEvents);
// { onUserClick: 'on-user-click', onDataUpdate: 'on-data-update', onFormSubmit: 'on-form-submit' }
```

## Interactive Example

```tsx live
function KebabCaseExample() {
  const [input, setInput] = React.useState('helloWorldFooBar');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(kebabCase(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>kebabCase Interactive Example</h4>
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
- 📚 **Best Practice**: Use kebab-case for CSS class names, URL slugs, and data attributes

## Related Functions

- [`camelCase`](./camelCase) - Convert to camelCase (firstName)
- [`pascalCase`](./pascalCase) - Convert to PascalCase (FirstName)
- [`snakeCase`](./snakeCase) - Convert to snake_case (first_name)
- [`capitalize`](./capitalize) - Capitalize the first character

## Version History

- **v1.0.0** - Initial version

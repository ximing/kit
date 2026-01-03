---
id: template
title: template
description: 'Replaces template placeholders with values from a data object'
---

# `template`

Replaces template placeholders with values from a data object. Supports multiple placeholder formats: `<%= %>`, `${}`, and `{}`. This is useful for creating dynamic strings, email templates, and message formatting.

## Syntax

```typescript
function template(str: string, data?: Record<string, any>): string;
```

## Parameters

| Parameter | Type                  | Required | Default | Description                             |
| --------- | --------------------- | -------- | ------- | --------------------------------------- |
| `str`     | `string`              | ✅       | -       | The template string with placeholders   |
| `data`    | `Record<string, any>` | ❌       | -       | The data object with placeholder values |

## Return Value

- **Type**: `string`
- **Description**: The template string with placeholders replaced by corresponding values from the data object. If a placeholder key is not found, it's replaced with an empty string.

## Supported Placeholder Formats

- `<%= key %>` - ERB-style placeholders
- `${ key }` - Template literal style
- `{ key }` - Curly brace style

## Examples

### Basic Usage

```typescript
import { template } from '@rabjs/kit';

// Example 1: ERB-style placeholders
const str1 = template('Hello <%= name %>', { name: 'World' });
console.log(str1); // 'Hello World'

// Example 2: Template literal style
const str2 = template('${name} is ${age} years old', { name: 'John', age: 30 });
console.log(str2); // 'John is 30 years old'

// Example 3: Curly brace style
const str3 = template('Welcome, {name}!', { name: 'Alice' });
console.log(str3); // 'Welcome, Alice!'
```

### Advanced Usage

```typescript
// Example 4: Mixed placeholder formats
const str4 = template('User: <%= user %>, Age: ${age}, Status: {status}', { user: 'Bob', age: 25, status: 'active' });
console.log(str4); // 'User: Bob, Age: 25, Status: active'

// Example 5: Missing keys (replaced with empty string)
const str5 = template('Hello <%= name %>, your email is <%= email %>', { name: 'John' });
console.log(str5); // 'Hello John, your email is '

// Example 6: No data provided
const str6 = template('Hello <%= name %>');
console.log(str6); // 'Hello '
```

### Practical Use Cases

```typescript
// Example 7: Email template
function generateEmailBody(user: { name: string; email: string; orderId: string }) {
  const emailTemplate = `
    Dear <%= name %>,
    
    Thank you for your order. Your order ID is: <%= orderId %>
    A confirmation email has been sent to <%= email %>.
    
    Best regards,
    The Team
  `;
  return template(emailTemplate, user);
}

console.log(
  generateEmailBody({
    name: 'John Doe',
    email: 'john@example.com',
    orderId: 'ORD-12345',
  }),
);

// Example 8: Dynamic message formatting
function formatMessage(message: string, variables: Record<string, any>): string {
  return template(message, variables);
}

const message = 'Hello {firstName}, you have {count} new messages from {sender}';
const result = formatMessage(message, {
  firstName: 'Alice',
  count: 5,
  sender: 'Bob',
});
console.log(result); // 'Hello Alice, you have 5 new messages from Bob'

// Example 9: SQL query builder (for illustration only)
function buildQuery(template: string, params: Record<string, any>): string {
  return template(template, params);
}

const queryTemplate = 'SELECT * FROM users WHERE id = ${id} AND name = ${name}';
const query = buildQuery(queryTemplate, { id: 123, name: 'John' });
console.log(query); // 'SELECT * FROM users WHERE id = 123 AND name = John'
```

## Interactive Example

```tsx live
function TemplateExample() {
  const [template, setTemplate] = React.useState('Hello <%= name %>, you have ${count} messages');
  const [name, setName] = React.useState('Alice');
  const [count, setCount] = React.useState('5');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(template(template, { name, count }));
  }, [template, name, count]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>template Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Template String:</label>
        <input
          type="text"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          placeholder="Enter template with <%= name %>, ${key}, or {key}"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>Count:</label>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="Enter count"
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

- ⚠️ **Edge Cases**: Missing keys in data are replaced with empty strings
- ⚠️ **Edge Cases**: Non-string inputs return an empty string
- ⚠️ **No data provided**: Returns the template string as-is
- 💡 **Multiple Formats**: All three placeholder formats can be mixed in the same template
- 💡 **Performance Tip**: Efficient for typical template strings
- 🔒 **Type Safety**: Maintains consistent string type throughout
- 📚 **Best Practice**: Use for email templates, dynamic messages, and user-facing strings

## Related Functions

- [`truncate`](./truncate) - Truncate strings to a maximum length
- [`camelCase`](./camelCase) - Convert to camelCase
- [`capitalize`](./capitalize) - Capitalize first character

## Version History

- **v0.0.1** - Initial version

---
id: truncate
title: truncate
description: "Truncates a string if it's longer than the specified maximum length"
---

# `truncate`

Truncates a string if it's longer than the specified maximum length. Useful for displaying text summaries, previews, and limiting text in UI components.

## Syntax

```typescript
function truncate(
  str: string,
  options?: {
    length?: number;
    omission?: string;
  },
): string;
```

## Parameters

| Parameter          | Type     | Required | Default | Description                                |
| ------------------ | -------- | -------- | ------- | ------------------------------------------ |
| `str`              | `string` | ✅       | -       | The string to truncate                     |
| `options`          | `object` | ❌       | -       | Configuration options                      |
| `options.length`   | `number` | ❌       | 30      | Maximum string length (including omission) |
| `options.omission` | `string` | ❌       | '...'   | String to indicate text is omitted         |

## Return Value

- **Type**: `string`
- **Description**: The truncated string. If the input is shorter than the specified length, returns it as-is. Non-string inputs return an empty string.

## Examples

### Basic Usage

```typescript
import { truncate } from '@rabjs/kit';

// Example 1: Default truncation
const str1 = truncate('Hi-Diddly-Ho there, Flanders!');
console.log(str1); // 'Hi-Diddly-Ho there, Flanders!' (no truncation, 31 chars > 30)

// Example 2: Truncate with custom length
const str2 = truncate('Hi-Diddly-Ho there, Flanders!', { length: 20 });
console.log(str2); // 'Hi-Diddly-Ho ther...'

// Example 3: Custom omission string
const str3 = truncate('Hi-Diddly-Ho there, Flanders!', { length: 20, omission: ' [...]' });
console.log(str3); // 'Hi-Diddly-Ho [...]'
```

### Advanced Usage

```typescript
// Example 4: Truncate with different omission
const str4 = truncate('The quick brown fox jumps over the lazy dog', {
  length: 25,
  omission: '...',
});
console.log(str4); // 'The quick brown fox ju...'

// Example 5: Very short length
const str5 = truncate('Hello World', { length: 5 });
console.log(str5); // 'He...'

// Example 6: Omission longer than length
const str6 = truncate('Hello', { length: 3, omission: '[...]' });
console.log(str6); // '' (length - omission.length = 3 - 5 = -2, max(0, -2) = 0)
```

### Practical Use Cases

```typescript
// Example 7: Truncate product descriptions
function formatProductDescription(description: string, maxLength: number = 50): string {
  return truncate(description, { length: maxLength });
}

console.log(formatProductDescription('This is a high-quality product with amazing features'));
// 'This is a high-quality product with...'

// Example 8: Tweet-like text preview
function createTweetPreview(text: string): string {
  return truncate(text, { length: 140, omission: '... (read more)' });
}

console.log(
  createTweetPreview(
    'This is a very long tweet that needs to be truncated for preview purposes on social media platforms',
  ),
);
// 'This is a very long tweet that needs to be truncated for preview purposes on social... (read more)'

// Example 9: Table cell content truncation
function formatTableCell(content: string): string {
  return truncate(content, { length: 25, omission: '...' });
}

const cells = [
  'Very long product name that needs truncation',
  'Short text',
  'Another very long description for display',
];

const truncatedCells = cells.map(formatTableCell);
console.log(truncatedCells);
// ['Very long product name...', 'Short text', 'Another very long descrip...']

// Example 10: Comment preview
function getCommentPreview(comment: string): string {
  return truncate(comment, { length: 100, omission: '... (see full comment)' });
}

const comment = 'This is a very long comment that provides detailed feedback about the product quality and features';
console.log(getCommentPreview(comment));
// 'This is a very long comment that provides detailed feedback about the product quality... (see full comment)'
```

## Interactive Example

```tsx live
function TruncateExample() {
  const [input, setInput] = React.useState('Hi-Diddly-Ho there, Flanders! This is a long string.');
  const [length, setLength] = React.useState(30);
  const [omission, setOmission] = React.useState('...');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(truncate(input, { length: parseInt(length) || 30, omission }));
  }, [input, length, omission]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>truncate Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Input String:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to truncate"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>Max Length:</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          min="1"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <label style={{ display: 'block', marginBottom: '5px' }}>Omission String:</label>
        <input
          type="text"
          value={omission}
          onChange={(e) => setOmission(e.target.value)}
          placeholder="Enter omission string"
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

- ⚠️ **Edge Cases**: If omission string is longer than the specified length, the result may be empty
- ⚠️ **Edge Cases**: Non-string inputs return an empty string
- 💡 **Performance Tip**: The function is efficient with O(n) complexity
- 💡 **Optimal Omission**: Use '...' for general purposes, or customize for specific UI needs
- 🔒 **Type Safety**: Maintains consistent string type throughout
- 📚 **Best Practice**: Use for text previews, table cells, and UI components with space constraints

## Related Functions

- [`template`](./template) - Replace template placeholders with values
- [`trim`](./trim) - Remove leading and trailing whitespace
- [`camelCase`](./camelCase) - Convert to camelCase

## Version History

- **v1.0.0** - Initial version

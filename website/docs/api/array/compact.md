---
id: compact
title: compact
description: 'Removes falsy values from an array'
---

# `compact`

Removes all falsy values from an array. Falsy values include `false`, `null`, `0`, `""`, `undefined`, and `NaN`.

## Syntax

```typescript
function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[];
```

## Parameters

| Parameter | Type                                             | Required | Default | Description          |
| --------- | ------------------------------------------------ | -------- | ------- | -------------------- |
| `array`   | `(T \| null \| undefined \| false \| 0 \| '')[]` | ✅       | -       | The array to compact |

## Return Value

- **Type**: `T[]`
- **Description**: A new array with all falsy values removed. Returns an empty array if input is not an array.

## Examples

### Basic Usage

```typescript
import { compact } from '@rabjs/kit';

// Example 1: Removing falsy values from mixed array
const mixed = [0, 1, false, 2, '', 3, null, undefined, 4, NaN];
const cleaned = compact(mixed);
console.log(cleaned); // [1, 2, 3, 4]

// Example 2: Cleaning string array
const strings = ['hello', '', 'world', null, 'foo', undefined];
const cleanStrings = compact(strings);
console.log(cleanStrings); // ['hello', 'world', 'foo']

// Example 3: Filtering numbers
const numbers = [0, 10, 0, 20, null, 30];
const validNumbers = compact(numbers);
console.log(validNumbers); // [10, 20, 30]
```

### Advanced Usage

```typescript
// Example 4: Processing form data
interface FormData {
  name?: string;
  email?: string;
  phone?: string;
}

function collectFormFields(data: FormData): string[] {
  const fields = [data.name, data.email, data.phone];
  return compact(fields);
}

const form1 = { name: 'Alice', email: '', phone: '123456' };
console.log(collectFormFields(form1)); // ['Alice', '123456']

const form2 = { name: 'Bob' };
console.log(collectFormFields(form2)); // ['Bob']

// Example 5: Cleaning API responses
interface ApiResponse {
  id: number;
  name: string;
  description?: string | null;
  tags?: string[] | null;
}

function cleanApiData(items: ApiResponse[]) {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    metadata: compact([item.description, item.tags]),
  }));
}
```

### Real-world Applications

```typescript
// Example 6: Filter validation errors
function validateUser(user: any): string[] {
  const errors: (string | undefined)[] = [
    !user.name ? 'Name is required' : undefined,
    !user.email ? 'Email is required' : undefined,
    user.age && user.age < 18 ? 'Must be 18+' : undefined,
  ];
  return compact(errors);
}

const user1 = { name: '', email: 'test@example.com', age: 16 };
console.log(validateUser(user1)); // ['Name is required', 'Must be 18+']

// Example 7: Combine with array operations
const userInputs = ['apple', '', 'banana', null, 'cherry', undefined, ''];
const processedInputs = compact(userInputs)
  .map((s) => s.trim())
  .filter((s) => s.length > 0)
  .map((s) => s.toLowerCase());
console.log(processedInputs); // ['apple', 'banana', 'cherry']

// Example 8: Clean database query results
interface QueryResult {
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
}

function extractValidIds(results: QueryResult[]): number[] {
  const ids = results.map((r) => r.userId);
  return compact(ids);
}
```

## Interactive Example

```tsx live
function CompactExample() {
  const [input, setInput] = React.useState('1,0,2,false,3,null,,4,undefined');
  const [result, setResult] = React.useState(null);

  const handleCompact = () => {
    try {
      // Parse input string to array with various falsy values
      const array = input.split(',').map((item) => {
        const trimmed = item.trim();
        if (trimmed === '') return '';
        if (trimmed === 'null') return null;
        if (trimmed === 'undefined') return undefined;
        if (trimmed === 'false') return false;
        if (trimmed === '0') return 0;
        if (trimmed === 'NaN') return NaN;
        if (!isNaN(Number(trimmed))) return Number(trimmed);
        return trimmed;
      });
      const compacted = compact(array);
      setResult({
        original: array,
        compacted: compacted,
      });
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleCompact();
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>compact Interactive Example</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>Input (comma-separated, try: null, undefined, false, 0, ''): </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: '5px', marginTop: '5px' }}
        />
      </div>
      <div>
        <strong>Result:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## Notes

- ⚠️ **Falsy Values**: The function removes: `false`, `null`, `0`, `""`, `undefined`, and `NaN`
- ⚠️ **Edge Case**: Empty arrays `[]` and empty objects `{}` are NOT considered falsy and will be kept
- ⚠️ **Edge Case**: When input is not an array, returns an empty array
- 💡 **Performance**: O(n) time complexity, efficient for large arrays
- 🔒 **Type Safety**: TypeScript ensures proper type inference for the returned array
- 📚 **Best Practice**: Useful for cleaning user input, API responses, and form data
- ⚡ **Use Case**: Prefer `compact` over manual filtering when you need to remove all falsy values at once

## Related Functions

- [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - JavaScript's native filter for custom conditions
- [`uniq`](./uniq) - Removes duplicate values from an array
- [`flatten`](./flatten) - Flattens nested arrays

## Version History

- **v1.0.0** - Initial release

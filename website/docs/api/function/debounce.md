---
id: debounce
title: debounce
description: 'Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked'
---

# `debounce`

Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked. This is commonly used for handling high-frequency events like window resizing, input field changes, or API requests during user interactions.

## Syntax

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait?: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  },
): T & { cancel: () => void; flush: () => void };
```

## Parameters

| Parameter          | Type                                | Required | Default     | Description                                                        |
| ------------------ | ----------------------------------- | -------- | ----------- | ------------------------------------------------------------------ |
| `func`             | `T extends (...args: any[]) => any` | ✅       | -           | The function to debounce                                           |
| `wait`             | `number`                            | ❌       | `0`         | The number of milliseconds to delay invocation                     |
| `options`          | `object`                            | ❌       | `{}`        | Configuration options                                              |
| `options.leading`  | `boolean`                           | ❌       | `false`     | Specify invoking on the leading edge of the timeout                |
| `options.trailing` | `boolean`                           | ❌       | `true`      | Specify invoking on the trailing edge of the timeout               |
| `options.maxWait`  | `number`                            | ❌       | `undefined` | The maximum time func is allowed to be delayed before it's invoked |

## Returns

- **Type**: `T & { cancel: () => void; flush: () => void }`
- **Description**: A debounced function with `cancel()` and `flush()` methods. The `cancel()` method cancels pending invocations, and `flush()` immediately invokes the pending function.

## Examples

### Basic Usage

```typescript
import { debounce } from '@rabjs/kit';

// Example 1: Simple debounce with default options
const logMessage = debounce(() => {
  console.log('User stopped typing');
}, 500);

// Simulate user typing
logMessage(); // Timer starts
logMessage(); // Timer resets
logMessage(); // Timer resets
// After 500ms of inactivity: logs 'User stopped typing'

// Example 2: Search input debounce
const search = debounce((query: string) => {
  console.log(`Searching for: ${query}`);
  // Make API call here
}, 300);

search('java'); // Timer starts
search('javas'); // Timer resets
search('javascri'); // Timer resets
search('javascript'); // Timer resets
// After 300ms: logs 'Searching for: javascript'
```

### Advanced Usage

```typescript
// Example 3: Debounce with leading edge
const handleWindowResize = debounce(
  () => {
    console.log('Window resized');
  },
  250,
  { leading: true, trailing: true },
);

handleWindowResize(); // Logs immediately (leading edge)
handleWindowResize(); // Timer resets
// After 250ms: logs again (trailing edge)

// Example 4: Using cancel and flush methods
const debouncedSave = debounce((data: any) => {
  console.log('Saving:', data);
}, 1000);

debouncedSave({ name: 'Alice' });
debouncedSave({ name: 'Bob' });

// Cancel pending invocation
debouncedSave.cancel();
// Nothing will be saved

// Or flush to save immediately
debouncedSave({ name: 'Charlie' });
debouncedSave.flush(); // Saves immediately: 'Saving: { name: "Charlie" }'
```

### Real-World Application

```typescript
// Example 5: Auto-save form with debounce
function AutoSaveForm() {
  const saveForm = debounce(
    async (formData: Record<string, any>) => {
      try {
        const response = await fetch('/api/save', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        console.log('Form saved successfully');
      } catch (error) {
        console.error('Failed to save form:', error);
      }
    },
    1500,
    { maxWait: 5000 },
  ); // Auto-save after 1.5s or 5s max

  const handleInputChange = (field: string, value: any) => {
    const formData = { [field]: value };
    saveForm(formData);
  };

  return {
    handleInputChange,
    cancelSave: () => saveForm.cancel(),
    forceSave: () => saveForm.flush(),
  };
}

// Usage
const form = AutoSaveForm();
form.handleInputChange('email', 'user@example.com');
form.handleInputChange('email', 'user@example.com'); // Resets timer
// After 1.5s of inactivity: saves the form
```

## Interactive Example

```tsx live
function DebounceExample() {
  const [input, setInput] = React.useState('');
  const [searchResults, setSearchResults] = React.useState('');
  const [callCount, setCallCount] = React.useState(0);

  const handleSearch = React.useMemo(() => {
    return debounce((query) => {
      setSearchResults(`Searched for: "${query}"`);
      setCallCount((prev) => prev + 1);
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    handleSearch(value);
  };

  const handleCancel = () => {
    handleSearch.cancel();
    setSearchResults('Search cancelled');
  };

  const handleFlush = () => {
    handleSearch.flush();
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>Debounce Interactive Example</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Type to search (debounced after 500ms):</label>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type something..."
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleCancel} style={{ marginRight: '10px', padding: '5px 10px' }}>
          Cancel
        </button>
        <button onClick={handleFlush} style={{ padding: '5px 10px' }}>
          Flush Now
        </button>
      </div>
      <div style={{ background: 'white', padding: '10px', borderRadius: '4px' }}>
        <strong>Result:</strong> {searchResults}
      </div>
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>Function called: {callCount} times</div>
    </div>
  );
}
```

## Notes

- ⚠️ **Timing**: The debounce timer is reset every time the debounced function is called. Only when the function hasn't been called for the specified `wait` time will it execute.
- 💡 **Performance Tip**: Use debounce for high-frequency events like scroll, resize, or input changes to reduce unnecessary function invocations and improve performance.
- 🔒 **Leading vs Trailing**: Set `leading: true` to invoke immediately on the first call, then wait. Set `trailing: true` (default) to invoke after the wait period.
- 🐛 **Common Mistake**: Forgetting to use the returned debounced function instead of the original function. Always use the result of `debounce()`.
- 📚 **Best Practice**: Always call `cancel()` when the component unmounts to prevent memory leaks and unexpected invocations.

## Related Functions

- [`throttle`](./throttle) - Similar to debounce but invokes at most once per wait interval
- [`once`](./once) - Restricts a function to execute only once
- [`memoize`](./memoize) - Caches function results based on arguments

## Version History

- **v1.0.0** - Initial version

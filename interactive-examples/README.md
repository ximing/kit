# Interactive Examples

This directory contains interactive React components that demonstrate the usage of functions from `@rabjs/kit`.

## Directory Structure

```
interactive-examples/
├── array/           # Array manipulation functions
├── collection/      # Collection functions
├── date/           # Date functions
├── function/       # Function utilities
├── is/             # Type checking functions
├── math/           # Math functions
├── number/         # Number functions
├── object/         # Object manipulation functions
├── promise/        # Promise utilities
├── string/         # String manipulation functions
├── types/          # Type utilities
├── index.ts        # Main export file
└── README.md       # This file
```

## Creating Interactive Examples

### File Naming Convention

- **File name**: Use the function name, e.g., `chunk.tsx`, `debounce.tsx`
- **Component name**: Use `{FunctionName}Example` format
- **Default export**: Each file must export a default function component

### Basic Structure

```typescript
/**
 * Interactive example for {functionName} function
 *
 * @category {category}
 * @functionName {functionName}
 * @complexity {simple|medium|complex}
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt {date}
 */

import React, { useState } from 'react';
import { {functionName} } from '@rabjs/kit';

export default function {FunctionName}Example() {
  // Component implementation
  return (
    <div style={{ padding: '20px' }}>
      {/* UI content */}
    </div>
  );
}
```

## Design Principles

1. **Simplicity**: Code should be concise and easy to understand
2. **Functionality**: Demonstrate the core functionality and usage of the function
3. **Interactivity**: Provide user interactions (inputs, buttons, etc.) to demonstrate different scenarios
4. **Readability**: Output results should be clear and easy to read
5. **Browser Compatibility**: All code must run in modern browsers

## Common Patterns

### Simple Function Pattern (Data Transformation)

```tsx
export default function ChunkExample() {
  const input = [1, 2, 3, 4, 5];
  const output = chunk(input, 2);

  return (
    <div>
      <p>Input: {JSON.stringify(input)}</p>
      <p>Output: {JSON.stringify(output)}</p>
    </div>
  );
}
```

### Complex Function Pattern (With State)

```tsx
export default function DebounceExample() {
  const [count, setCount] = useState(0);
  const debouncedFn = debounce(() => setCount((c) => c + 1), 500);

  return (
    <div>
      <button onClick={debouncedFn}>Click</button>
      <p>Count: {count}</p>
    </div>
  );
}
```

### Async Function Pattern (Promise)

```tsx
export default function DelayExample() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await delay(1000);
    setResult('Done!');
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Execute'}
      </button>
      {result && <p>{result}</p>}
    </div>
  );
}
```

## Review Checklist

Before submitting an example, ensure:

- ✅ Code syntax is correct
- ✅ Code runs in the browser
- ✅ Function is correctly imported
- ✅ Core functionality is demonstrated
- ✅ User interactions are reasonable
- ✅ Output is clear and easy to read
- ✅ Code style is consistent

## Optimization Areas

- Improve UI/UX design
- Optimize code readability
- Add more interactive options
- Improve error handling
- Add helpful comments

## Maintenance

When a function is updated:
1. Update the corresponding example component
2. Review and test the example
3. Update the metadata comment
4. Update the index file if needed
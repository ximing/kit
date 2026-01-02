---
sidebar_position: 1
---

# Getting Started

Welcome to **@rabjs/kit** documentation!

@rabjs/kit is a comprehensive TypeScript utility library with 100+ helper functions. It provides powerful tools for working with arrays, objects, strings, functions, numbers, dates, promises, and more.

## Why Choose @rabjs/kit?

- 📦 **Complete Toolkit**: 100+ carefully crafted utility functions
- 🎯 **Full TypeScript Support**: Written entirely in TypeScript with complete type inference
- ⚡ **Tree-shaking Friendly**: Supports ES modules for minimal bundle size
- 📚 **Comprehensive Docs**: Every function has detailed documentation and examples
- 🧪 **Fully Tested**: All functions are thoroughly tested
- 🔄 **Lodash Compatible**: Similar API to lodash, easy to get started

## Quick Example

```typescript
import { chunk, isEmpty, pick } from '@rabjs/kit';

// Array operations
const chunked = chunk([1, 2, 3, 4, 5], 2);
// => [[1, 2], [3, 4], [5]]

// Type checking
isEmpty([]);
// => true

// Object operations
pick({ a: 1, b: 2, c: 3 }, 'a', 'b');
// => { a: 1, b: 2 }
```

## Next Steps

- 📖 Check out the [Installation Guide](./installation.md) to get started
- 💡 Read [Usage Guide](./usage.md) to learn the basics
- 🔧 Browse [API Documentation](/docs/api/array) to explore all functions
- 📝 See [TypeScript Support](./typescript.md) for type system details

Happy coding!

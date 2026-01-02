---
sidebar_position: 2
---

# Installation

## Using npm

```bash
npm install @rabjs/kit
```

## Using pnpm

```bash
pnpm add @rabjs/kit
```

## Using yarn

```bash
yarn add @rabjs/kit
```

## Using bun

```bash
bun add @rabjs/kit
```

## Verify Installation

Create a simple test file to verify the installation:

```typescript
import { chunk } from '@rabjs/kit';

console.log(chunk([1, 2, 3, 4], 2));
// Output: [[1, 2], [3, 4]]
```

## Browser Usage

@rabjs/kit can also be used in the browser via CDN:

```html
<script src="https://unpkg.com/@rabjs/kit"></script>
<script>
  const { chunk } = window.rabjs.kit;
  console.log(chunk([1, 2, 3, 4], 2));
</script>
```

## Next Steps

- 📖 Read [Usage Guide](./usage.md) to learn how to use it
- 🔧 Browse [API Documentation](/docs/api/array) to explore all functions

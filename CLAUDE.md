# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@rabjs/kit` - a comprehensive TypeScript utility library with 100+ helper functions across 10 categories (array, object, string, function, number, date, promise, collection, math, type checking). It's a monorepo with the main library at root and a Docusaurus documentation site in `website/`.

## Essential Commands

### Setup & Dependencies

```bash
pnpm install  # Install all dependencies (pnpm required, not npm/yarn)
```

### Building

```bash
npm run build          # Full build: clean + CJS + ESM + types
npm run build:cjs      # Build CommonJS format only
npm run build:esm      # Build ES Module format only
npm run build:types    # Generate TypeScript declarations only
npm run build:clean    # Clean dist/ directory
```

### Testing

```bash
npm test               # Run all tests with coverage (90% threshold)
npm run test:watch     # Run tests in watch mode
npm run test:ci        # Run tests in CI mode (serial execution)

# Run specific test
npx jest test/array/chunk.spec.ts
```

### Code Quality

```bash
npm run lint:check     # Check ESLint rules (zero warnings allowed)
npm run lint:fix       # Auto-fix ESLint issues
npm run prettier:check # Check code formatting
npm run prettier:fix   # Auto-format code
```

### Documentation

```bash
# Documentation site (website/ directory)
npm run docs:dev       # Start dev server at http://localhost:3000/kit/
npm run docs:build     # Build documentation site
npm run docs:serve     # Serve built documentation
npm run docs:deploy    # Deploy to GitHub Pages

# API documentation generation
npm run docs:generate  # Generate API docs from source code
```

### Release

```bash
npm run release        # Interactive release (patch/minor/major)
npm run release:patch  # Patch release
npm run release:minor  # Minor release
npm run release:major  # Major release
```

## Architecture Overview

### Monorepo Structure

- **Root**: Main library (`@rabjs/kit`) with 112 functions across 10 modules
- **website/**: Docusaurus documentation site with i18n support (English/Chinese)
- **Package manager**: pnpm workspaces (required, not npm/yarn)

### Build System (Three-Layer)

1. **Clean**: Remove old artifacts (`dist/`)
2. **Transpile**: Parallel Rollup builds for CJS (`dist/cjs/`) and ESM (`dist/esm/`)
3. **Types**: TypeScript declaration generation (`dist/types/`)

Key optimization: Zero shim code per file via Rollup's `preserveModules` mode.

### Module Organization

```
src/
├── array/      (9 functions: chunk, compact, flatten, uniq, etc.)
├── object/     (15 functions: clone, merge, pick, omit, get, set, etc.)
├── string/     (15 functions: camelCase, kebabCase, template, etc.)
├── function/   (10 functions: debounce, throttle, memoize, curry, etc.)
├── number/     (10 functions: clamp, random, range, sum, mean, etc.)
├── is/         (20 functions: isArray, isObject, isEmpty, etc.)
├── date/       (10 functions: format, parse, addDays, diffDays, etc.)
├── promise/    (8 functions: retry, timeout, parallel, series, etc.)
├── collection/ (9 functions: groupBy, sortBy, partition, etc.)
├── math/       (6 functions: max, min, maxBy, minBy, etc.)
└── types/      (shared TypeScript types)
```

### Export Strategy

Supports multiple import patterns with full tree-shaking:

```typescript
import { chunk } from '@rabjs/kit'; // Main entry
import { chunk } from '@rabjs/kit/array'; // Category entry
import { chunk } from '@rabjs/kit/array/chunk'; // Specific file
```

Package.json includes 100+ granular export paths for optimal bundling.

### Testing Requirements

- **Coverage**: 90% minimum (branches, functions, lines, statements)
- **Test files**: `test/{category}/{function}.spec.ts` (119 total files)
- **Pattern**: Test happy paths, edge cases, invalid inputs, type variations
- **Framework**: Jest 30.0.0 + ts-jest

### Code Quality Standards

- **TypeScript**: Strict mode, ES2020 target
- **ESLint**: Zero warnings policy (build fails on any warning)
- **Prettier**: Enforced formatting (120 char width, single quotes, trailing commas)
- **Pre-commit**: Husky + lint-staged for automatic formatting

## Development Workflow

### Adding New Functions

1. Create `src/{category}/{functionName}.ts` with JSDoc comments
2. Add export to `src/{category}/index.ts`
3. Create comprehensive test in `test/{category}/{functionName}.spec.ts`
4. Update package.json exports section
5. Run `npm run build && npm test` to verify

### Function Template

```typescript
/**
 * Brief description of what the function does
 * @param param1 - Description of parameter
 * @param param2 - Description of parameter
 * @returns Description of return value
 * @example
 * functionName(example, input); // expected output
 */
export function functionName<T>(param1: T[], param2: number): T[][] {
  // Input validation
  if (!Array.isArray(param1) || param2 <= 0) {
    return [];
  }

  // Implementation
  // ...
}
```

### Test Template

```typescript
describe('functionName', () => {
  it('should handle basic usage', () => {
    expect(functionName([1, 2, 3], 2)).toEqual([[1, 2], [3]]);
  });

  it('should handle edge cases', () => {
    expect(functionName([], 2)).toEqual([]);
    expect(functionName([1], 5)).toEqual([[1]]);
  });

  it('should handle invalid input', () => {
    expect(functionName(null as any, 2)).toEqual([]);
    expect(functionName([1, 2], 0)).toEqual([]);
  });
});
```

## Key Constraints

### Tree-Shaking Requirements

- No default exports (use named exports only)
- `sideEffects: false` in package.json
- Individual file exports for granular imports
- Rollup `preserveModules` to avoid bundling

### TypeScript Requirements

- Strict mode enabled
- Generic types where appropriate (`<T>`, `<K>`, etc.)
- Complete type definitions for all parameters and return values
- Source maps for debugging

### Documentation Requirements

- JSDoc comments for all public functions
- Include `@param`, `@returns`, and `@example` tags
- Update website documentation when adding new APIs
- Maintain both English and Chinese translations

## CI/CD Pipeline

### GitHub Actions

- **Linting**: ESLint + Prettier validation
- **Testing**: Jest with coverage upload to Codecov
- **Building**: Full build validation
- **Documentation**: Auto-deploy to GitHub Pages on main branch changes
- **Publishing**: Auto-publish to npm on GitHub releases

### Branch Protection

- All checks must pass before merge
- 90% test coverage required
- Zero linting warnings allowed

## Troubleshooting

### Build Issues

- Ensure using pnpm (not npm/yarn): `pnpm install`
- Clear dist: `npm run build:clean && npm run build`
- Check TypeScript configs in root directory

### Test Coverage Issues

- Run `npm test` to see coverage report
- Add tests for uncovered branches/lines
- Coverage threshold is 90% across all metrics

### Documentation Site

- Requires React 18 (not 19) for compatibility
- Start with `npm run docs:dev`
- Build issues: check `website/package.json` dependencies

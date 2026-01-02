/**
 * @rabjs/kit - A comprehensive TypeScript utility library
 * Provides 100+ helper functions for arrays, objects, strings, functions, numbers, dates, promises, and more
 * Similar to lodash but with full TypeScript support and tree-shaking friendly
 *
 * @module @rabjs/kit
 * @example
 * // Import all utilities
 * import * as kit from '@rabjs/kit';
 *
 * @example
 * // Import specific modules
 * import * as array from '@rabjs/kit/array';
 * import * as object from '@rabjs/kit/object';
 *
 * @example
 * // Import specific functions
 * import { chunk, flatten } from '@rabjs/kit/array';
 * import { clone, merge } from '@rabjs/kit/object';
 */

// Re-export from all modules
export * from './array/index';
export * from './object/index';
export * from './string/index';
export * from './function/index';
export * from './number/index';
export * from './is/index';
export * from './date/index';
export * from './promise/index';
export * from './collection/index';
export * from './math/index';

// Export types
export * from './types/index';

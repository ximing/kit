/**
 * Creates a shallow copy of value
 * @param value - The value to clone
 * @returns Returns the cloned value
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const cloned = clone(obj);
 * cloned.a = 10;
 * console.log(obj.a); // 1
 * console.log(cloned.b === obj.b); // true (shallow copy)
 */
export function clone<T>(value: T): T {
  // Handle primitives and functions
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Handle Date
  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  // Handle RegExp
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  // Handle Array
  if (Array.isArray(value)) {
    return value.slice() as T;
  }

  // Handle Map
  if (value instanceof Map) {
    return new Map(value) as T;
  }

  // Handle Set
  if (value instanceof Set) {
    return new Set(value) as T;
  }

  // Handle plain objects
  if (Object.prototype.toString.call(value) === '[object Object]') {
    return { ...value };
  }

  // For other objects, return as is
  return value;
}
/**
 * Creates a deep copy of value
 * @param value - The value to recursively clone
 * @returns Returns the deep cloned value
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const cloned = cloneDeep(obj);
 * cloned.b.c = 10;
 * console.log(obj.b.c); // 2
 * console.log(cloned.b === obj.b); // false (deep copy)
 */
export function cloneDeep<T>(value: T, hash: WeakMap<object, unknown> = new WeakMap()): T {
  // Handle primitives and functions
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Handle circular references
  if (hash.has(value)) {
    return hash.get(value) as T;
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
    const result: unknown[] = [];
    hash.set(value, result);
    for (let i = 0; i < value.length; i++) {
      result[i] = cloneDeep(value[i], hash);
    }
    return result as T;
  }

  // Handle Map
  if (value instanceof Map) {
    const result = new Map();
    hash.set(value, result);
    value.forEach((val, key) => {
      result.set(cloneDeep(key, hash), cloneDeep(val, hash));
    });
    return result as T;
  }

  // Handle Set
  if (value instanceof Set) {
    const result = new Set();
    hash.set(value, result);
    value.forEach((val) => {
      result.add(cloneDeep(val, hash));
    });
    return result as T;
  }

  // Handle plain objects
  if (Object.prototype.toString.call(value) === '[object Object]') {
    const result: Record<string, unknown> = {};
    hash.set(value, result);
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = cloneDeep((value as Record<string, unknown>)[key], hash);
      }
    }
    return result as T;
  }

  // For other objects, return as is
  return value;
}

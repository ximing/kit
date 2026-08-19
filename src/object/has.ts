/**
 * Checks if path is a direct or inherited property of object
 * @param obj - The object to query
 * @param path - The path to check (can be string or array)
 * @returns Returns true if path exists, else false
 * @example
 * const obj = { a: { b: { c: 3 } } };
 * has(obj, 'a.b.c'); // true
 * has(obj, ['a', 'b', 'c']); // true
 * has(obj, 'a.b.d'); // false
 */
export function has(obj: unknown, path: string | readonly (string | number)[]): boolean {
  if (obj == null) {
    return false;
  }

  // Convert string path to array
  const pathArray: (string | number)[] =
    typeof path === 'string'
      ? path
          .replace(/\[(\d+)\]/g, '.$1')
          .split('.')
          .filter(Boolean)
      : [...path];

  let current: unknown = obj;

  for (const key of pathArray) {
    if (current == null || (typeof current !== 'object' && typeof current !== 'function')) {
      return false;
    }
    if (!(key in Object(current))) {
      return false;
    }
    current = (current as Record<PropertyKey, unknown>)[key];
  }

  return true;
}

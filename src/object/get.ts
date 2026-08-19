/**
 * Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.
 * @param obj - The object to query
 * @param path - The path of the property to get (can be string or array)
 * @param defaultValue - The value returned if the resolved value is undefined
 * @returns Returns the resolved value
 * @example
 * const obj = { a: { b: { c: 3 } } };
 * get(obj, 'a.b.c'); // 3
 * get(obj, ['a', 'b', 'c']); // 3
 * get(obj, 'a.b.d', 'default'); // 'default'
 */
export function get<T = unknown, D = undefined>(
  obj: unknown,
  path: string | readonly (string | number)[],
  defaultValue?: D,
): T | D {
  if (obj == null) {
    return defaultValue as T | D;
  }

  // Convert string path to array
  const pathArray: (string | number)[] =
    typeof path === 'string'
      ? path
          .replace(/\[(\d+)\]/g, '.$1')
          .split('.')
          .filter(Boolean)
      : [...path];

  let result: unknown = obj;

  for (const key of pathArray) {
    if (result == null || (typeof result !== 'object' && typeof result !== 'function')) {
      return defaultValue as T | D;
    }
    result = (result as Record<PropertyKey, unknown>)[key];
  }

  return result === undefined ? (defaultValue as T | D) : (result as T);
}

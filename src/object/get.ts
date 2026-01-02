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
export function get<T = any>(
  obj: any,
  path: string | readonly (string | number)[],
  defaultValue?: T
): T {
  if (obj == null) {
    return defaultValue as T;
  }

  // Convert string path to array
  const pathArray: (string | number)[] = Array.isArray(path)
    ? [...path]
    : (path as string)
        .replace(/\[(\d+)\]/g, '.$1') // Convert array indices to dot notation
        .split('.')
        .filter(Boolean);

  let result: any = obj;

  for (const key of pathArray) {
    if (result == null) {
      return defaultValue as T;
    }
    result = result[key];
  }

  return result === undefined ? (defaultValue as T) : result;
}
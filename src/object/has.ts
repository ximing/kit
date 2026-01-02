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
export function has(obj: any, path: string | readonly (string | number)[]): boolean {
  if (obj == null) {
    return false;
  }

  // Convert string path to array
  const pathArray: (string | number)[] = Array.isArray(path)
    ? [...path]
    : (path as string)
        .replace(/\[(\d+)\]/g, '.$1') // Convert array indices to dot notation
        .split('.')
        .filter(Boolean);

  let current: any = obj;

  for (const key of pathArray) {
    if (current == null || !(key in Object(current))) {
      return false;
    }
    current = current[key];
  }

  return true;
}

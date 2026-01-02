/**
 * Sets the value at path of object. If a portion of path doesn't exist, it's created.
 * @param obj - The object to modify
 * @param path - The path of the property to set (can be string or array)
 * @param value - The value to set
 * @returns Returns the object
 * @example
 * const obj = { a: { b: { c: 3 } } };
 * set(obj, 'a.b.c', 4);
 * set(obj, ['x', 'y', 'z'], 5);
 * set(obj, 'a.b.d[0]', 6);
 */
export function set<T extends object>(obj: T, path: string | readonly (string | number)[], value: any): T {
  if (obj == null) {
    return obj;
  }

  // Convert string path to array
  const pathArray: (string | number)[] = Array.isArray(path)
    ? [...path]
    : (path as string)
        .replace(/\[(\d+)\]/g, '.$1') // Convert array indices to dot notation
        .split('.')
        .filter(Boolean);

  let current: any = obj;

  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i];
    const nextKey = pathArray[i + 1];

    // Determine if next key is array index
    const isNextKeyIndex = /^\d+$/.test(String(nextKey));

    // Create nested structure if it doesn't exist
    if (current[key] == null) {
      current[key] = isNextKeyIndex ? [] : {};
    }

    current = current[key];
  }

  // Set the final value
  const lastKey = pathArray[pathArray.length - 1];
  current[lastKey] = value;

  return obj;
}

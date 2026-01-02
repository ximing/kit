/**
 * Creates an object composed of properties that are not omitted
 * @param obj - The source object
 * @param keys - The property keys to omit
 * @returns Returns the new object
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * omit(obj, ['a', 'c']); // { b: 2 }
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Omit<T, K> {
  if (obj == null) {
    return {} as Omit<T, K>;
  }

  const result = { ...obj } as any;
  const keysSet = new Set(keys);

  for (const key of keysSet) {
    delete result[key];
  }

  return result;
}
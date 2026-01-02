/**
 * Merges source objects into target object (shallow merge)
 * @param target - The target object
 * @param sources - The source objects
 * @returns Returns the target object
 * @example
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * merge(obj1, obj2); // { a: 1, b: { d: 3 }, e: 4 }
 */
export function merge<T extends object, S extends object>(target: T, ...sources: S[]): T & S {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const result = Object(target);

  for (const source of sources) {
    if (source != null) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          result[key] = source[key];
        }
      }
    }
  }

  return result;
}

import { isPlainObject } from '../is/isPlainObject';

/**
 * Recursively merges source objects into target object (deep merge)
 * @param target - The target object
 * @param sources - The source objects
 * @returns Returns the target object
 * @example
 * const obj1 = { a: 1, b: { c: 2, d: 3 } };
 * const obj2 = { b: { d: 4, e: 5 }, f: 6 };
 * mergeDeep(obj1, obj2); // { a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 }
 */
export function mergeDeep<T extends object, S extends object>(
  target: T,
  ...sources: S[]
): T & S {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const result = Object(target);

  for (const source of sources) {
    if (source != null) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          const targetValue = result[key];
          const sourceValue = source[key];

          // If both values are plain objects, merge recursively
          if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
            result[key] = mergeDeep(
              Object(targetValue),
              sourceValue as any
            );
          } else {
            result[key] = sourceValue;
          }
        }
      }
    }
  }

  return result;
}
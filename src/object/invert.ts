/**
 * Creates an object composed of the inverted keys and values of object
 * @param obj - The object to invert
 * @returns Returns the new inverted object
 * @example
 * invert({ a: 1, b: 2, c: 1 }); // { '1': 'c', '2': 'b' }
 */
export function invert<T extends Record<string | number, string | number>>(obj: T): Record<string, string> {
  if (obj == null) {
    return {};
  }

  const result: Record<string, string> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      result[String(value)] = key;
    }
  }

  return result;
}

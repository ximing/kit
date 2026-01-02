/**
 * Converts the first character of string to upper case and the remainder to lower case.
 *
 * @param str - The string to capitalize
 * @returns The capitalized string
 *
 * @example
 * capitalize('FRED') // => 'Fred'
 * capitalize('foo') // => 'Foo'
 */
export function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

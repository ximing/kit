/**
 * Converts the first character of string to upper case.
 *
 * @param str - The string to convert
 * @returns The string with first character upper cased
 *
 * @example
 * upperFirst('fred') // => 'Fred'
 * upperFirst('FRED') // => 'FRED'
 */
export function upperFirst(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

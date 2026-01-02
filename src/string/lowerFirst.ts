/**
 * Converts the first character of string to lower case.
 *
 * @param str - The string to convert
 * @returns The string with first character lower cased
 *
 * @example
 * lowerFirst('Fred') // => 'fred'
 * lowerFirst('FRED') // => 'fRED'
 */
export function lowerFirst(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toLowerCase() + str.slice(1);
}
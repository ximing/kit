/**
 * Repeats the given string n times.
 *
 * @param str - The string to repeat
 * @param n - The number of times to repeat the string
 * @returns The repeated string
 *
 * @example
 * repeat('*', 3) // => '***'
 * repeat('abc', 2) // => 'abcabc'
 * repeat('abc', 0) // => ''
 */
export function repeat(str: string, n: number): string {
  if (typeof str !== 'string' || n <= 0) {
    return '';
  }

  if (!isFinite(n) || n !== Math.floor(n)) {
    return '';
  }

  return str.repeat(n);
}

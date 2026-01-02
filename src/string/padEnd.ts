/**
 * Pads string on the right side if it's shorter than length.
 *
 * @param str - The string to pad
 * @param length - The padding length
 * @param chars - The string used as padding (default: ' ')
 * @returns The padded string
 *
 * @example
 * padEnd('abc', 6) // => 'abc   '
 * padEnd('abc', 6, '_-') // => 'abc_-_'
 * padEnd('abc', 3) // => 'abc'
 */
export function padEnd(str: string, length: number, chars?: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  const padChars = chars ?? ' ';

  if (str.length >= length || padChars.length === 0) {
    return str;
  }

  const padLength = length - str.length;
  let padding = '';

  while (padding.length < padLength) {
    padding += padChars;
  }

  return str + padding.slice(0, padLength);
}
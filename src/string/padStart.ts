/**
 * Pads string on the left side if it's shorter than length.
 *
 * @param str - The string to pad
 * @param length - The padding length
 * @param chars - The string used as padding (default: ' ')
 * @returns The padded string
 *
 * @example
 * padStart('abc', 6) // => '   abc'
 * padStart('abc', 6, '_-') // => '_-_abc'
 * padStart('abc', 3) // => 'abc'
 */
export function padStart(str: string, length: number, chars?: string): string {
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

  return padding.slice(0, padLength) + str;
}

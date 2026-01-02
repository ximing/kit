/**
 * Removes leading and trailing whitespace or specified characters from string.
 *
 * @param str - The string to trim
 * @param chars - The characters to remove
 * @returns The trimmed string
 *
 * @example
 * trim('  abc  ') // => 'abc'
 * trim('-_-abc-_-', '-_') // => 'abc'
 */
export function trim(str: string, chars?: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  if (!chars) {
    return str.trim();
  }

  const charsRegex = new RegExp(
    `^[${chars.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&')}]+|[${chars.replace(
      /[-[\]{}()*+?.,\\^$|#\\s]/g,
      '\\$&',
    )}]+$`,
    'g',
  );

  return str.replace(charsRegex, '');
}
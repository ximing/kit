/**
 * Removes leading whitespace or specified characters from string.
 *
 * @param str - The string to trim
 * @param chars - The characters to remove
 * @returns The trimmed string
 *
 * @example
 * trimStart('  abc  ') // => 'abc  '
 * trimStart('-_-abc-_-', '-_') // => 'abc-_-'
 */
export function trimStart(str: string, chars?: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  if (!chars) {
    return str.trimStart();
  }

  const charsRegex = new RegExp(`^[${chars.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&')}]+`, 'g');

  return str.replace(charsRegex, '');
}

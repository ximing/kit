/**
 * Removes trailing whitespace or specified characters from string.
 *
 * @param str - The string to trim
 * @param chars - The characters to remove
 * @returns The trimmed string
 *
 * @example
 * trimEnd('  abc  ') // => '  abc'
 * trimEnd('-_-abc-_-', '-_') // => '-_-abc'
 */
export function trimEnd(str: string, chars?: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  if (!chars) {
    return str.trimEnd();
  }

  const charsRegex = new RegExp(`[${chars.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&')}]+$`, 'g');

  return str.replace(charsRegex, '');
}

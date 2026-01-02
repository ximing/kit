/**
 * Truncates string if it's longer than the given maximum string length.
 *
 * @param str - The string to truncate
 * @param options - The options object
 * @param options.length - The maximum string length (default: 30)
 * @param options.omission - The string to indicate text is omitted (default: '...')
 * @returns The truncated string
 *
 * @example
 * truncate('Hi-Diddly-Ho there, Flanders!') // => 'Hi-Diddly-Ho there, Flanders!'
 * truncate('Hi-Diddly-Ho there, Flanders!', { length: 20 }) // => 'Hi-Diddly-Ho ther...'
 * truncate('Hi-Diddly-Ho there, Flanders!', { length: 20, omission: ' [...]' }) // => 'Hi-Diddly-Ho [...]'
 */
export function truncate(
  str: string,
  options?: {
    length?: number;
    omission?: string;
  },
): string {
  if (typeof str !== 'string') {
    return '';
  }

  const length = options?.length ?? 30;
  const omission = options?.omission ?? '...';

  if (str.length <= length) {
    return str;
  }

  // Calculate how many characters we can keep
  const truncateLength = Math.max(length - omission.length, 0);
  return str.slice(0, truncateLength) + omission;
}

/**
 * Checks if n is between start and up to, but not including, end.
 * If end is not specified, it's set to start with start then set to 0.
 *
 * @param number - The number to check
 * @param start - The start of the range
 * @param end - The end of the range (not included)
 * @returns Returns true if number is in the range, else false
 *
 * @example
 * inRange(3, 2, 4) // => true
 * inRange(4, 2, 4) // => false
 * inRange(2, 2, 4) // => true
 */
export function inRange(number: number, start: number, end?: number): boolean {
  let min = start;
  let max = end;

  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return number >= min && number < max;
}

export default inRange;

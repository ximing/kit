/**
 * Creates an array of numbers progressing from start up to, but not including, end.
 * If step is negative, the array will be in descending order.
 *
 * @param start - The start of the range
 * @param end - The end of the range (not included)
 * @param step - The value to increment or decrement by (default: 1)
 * @returns Returns the range of numbers
 *
 * @example
 * range(0, 5) // => [0, 1, 2, 3, 4]
 * range(0, 10, 2) // => [0, 2, 4, 6, 8]
 * range(5, 0, -1) // => [5, 4, 3, 2, 1]
 */
export function range(start: number, end: number, step: number = 1): number[] {
  if (step === 0) {
    throw new Error('step cannot be zero');
  }

  const result: number[] = [];

  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }

  return result;
}

export default range;

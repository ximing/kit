/**
 * Produces a random number between the inclusive lower and upper bounds.
 * If only one argument is provided, a number between 0 and the given number is returned.
 *
 * @param lower - The lower bound or upper bound if upper is not provided
 * @param upper - The upper bound
 * @param floating - Specify returning a floating-point number
 * @returns Returns the random number
 *
 * @example
 * random(5) // => random number between 0 and 5
 * random(5, 10) // => random number between 5 and 10
 * random(5, 10, true) // => random floating-point number between 5 and 10
 */
export function random(lower: number, upper?: number, floating?: boolean): number {
  let min = lower;
  let max: number;

  if (upper === undefined) {
    max = min;
    min = 0;
  } else {
    max = upper;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  const result = Math.random() * (max - min) + min;
  return floating ? result : Math.floor(result);
}

export default random;

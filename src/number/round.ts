/**
 * Rounds number to precision.
 *
 * @param number - The number to round
 * @param precision - The precision to round to (default: 0)
 * @returns Returns the rounded number
 *
 * @example
 * round(4.006) // => 4
 * round(4.006, 2) // => 4.01
 * round(4060, -2) // => 4100
 */
export function round(number: number, precision: number = 0): number {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export default round;

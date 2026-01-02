/**
 * Rounds number up to precision.
 *
 * @param number - The number to round up
 * @param precision - The precision to round up to (default: 0)
 * @returns Returns the rounded up number
 *
 * @example
 * ceil(4.006) // => 5
 * ceil(4.006, 2) // => 4.01
 * ceil(4060, -2) // => 4100
 */
export function ceil(number: number, precision: number = 0): number {
  const factor = Math.pow(10, precision);
  return Math.ceil(number * factor) / factor;
}

export default ceil;
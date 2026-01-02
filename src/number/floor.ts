/**
 * Rounds number down to precision.
 *
 * @param number - The number to round down
 * @param precision - The precision to round down to (default: 0)
 * @returns Returns the rounded down number
 *
 * @example
 * floor(4.006) // => 4
 * floor(4.006, 2) // => 4.00
 * floor(4060, -2) // => 4000
 */
export function floor(number: number, precision: number = 0): number {
  const factor = Math.pow(10, precision);
  return Math.floor(number * factor) / factor;
}

export default floor;
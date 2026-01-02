/**
 * Clamps number within the inclusive lower and upper bounds.
 *
 * @param number - The number to clamp
 * @param lower - The lower bound
 * @param upper - The upper bound
 * @returns Returns the clamped number
 *
 * @example
 * clamp(10, 5, 15) // => 10
 * clamp(3, 5, 15) // => 5
 * clamp(20, 5, 15) // => 15
 */
export function clamp(number: number, lower: number, upper: number): number {
  if (lower > upper) {
    throw new Error('lower bound must be less than or equal to upper bound');
  }
  return Math.max(lower, Math.min(number, upper));
}

export default clamp;
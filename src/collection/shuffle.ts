/**
 * Creates an array of shuffled values, using a version of the Fisher-Yates shuffle
 * @param collection - The collection to shuffle
 * @returns Returns the new shuffled array
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * shuffle(arr); // => shuffled array
 */
export function shuffle<T>(collection: T[]): T[] {
  const result = [...collection];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

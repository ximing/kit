/**
 * Gets a random element from collection
 * @param collection - The collection to sample
 * @returns Returns the random element
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * sample(arr); // => random element from arr
 */
export function sample<T>(collection: T[]): T | undefined {
  if (collection.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
}
/**
 * Gets n random elements at unique keys from collection up to the size of collection
 * @param collection - The collection to sample
 * @param n - The number of elements to sample
 * @returns Returns the array of sampled elements
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * sampleSize(arr, 2); // => random 2 elements from arr
 */
export function sampleSize<T>(collection: T[], n: number): T[] {
  if (n <= 0 || collection.length === 0) {
    return [];
  }

  const size = Math.min(n, collection.length);
  const result: T[] = [];
  const indices = new Set<number>();

  while (indices.size < size) {
    const randomIndex = Math.floor(Math.random() * collection.length);
    if (!indices.has(randomIndex)) {
      indices.add(randomIndex);
      result.push(collection[randomIndex]);
    }
  }

  return result;
}
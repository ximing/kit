/**
 * Removes elements from an array that match the predicate
 * @param array The array to modify (mutates the array)
 * @param predicate The function to test each element
 * @returns The array of removed elements
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * remove(arr, (item) => item > 3); // [4, 5]
 * // arr is now [1, 2, 3]
 */
export function remove<T>(array: T[], predicate: (item: T, index: number) => boolean): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  const removed: T[] = [];
  let writeIndex = 0;

  for (let readIndex = 0; readIndex < array.length; readIndex++) {
    if (predicate(array[readIndex], readIndex)) {
      removed.push(array[readIndex]);
    } else {
      array[writeIndex] = array[readIndex];
      writeIndex++;
    }
  }

  // Remove the extra elements at the end
  array.length = writeIndex;

  return removed;
}

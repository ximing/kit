import {
  chunk,
  compact,
  flatten,
  flattenDeep,
  uniq,
  uniqBy,
  difference,
  intersection,
  union,
  zip,
  take,
  drop,
  findIndex,
  remove,
} from '../../src/array';

describe('array module', () => {
  describe('chunk', () => {
    it('should split array into chunks of specified size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([
        [1, 2, 3],
        [4, 5],
      ]);
    });

    it('should handle single element chunks', () => {
      expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });

    it('should handle chunk size larger than array', () => {
      expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
    });

    it('should return empty array for empty input', () => {
      expect(chunk([], 2)).toEqual([]);
    });

    it('should return empty array for invalid size', () => {
      expect(chunk([1, 2, 3], 0)).toEqual([]);
      expect(chunk([1, 2, 3], -1)).toEqual([]);
    });

    it('should return empty array for non-array input', () => {
      expect(chunk(null as any, 2)).toEqual([]);
      expect(chunk(undefined as any, 2)).toEqual([]);
    });
  });

  describe('compact', () => {
    it('should remove falsy values', () => {
      expect(compact([0, 1, false, 2, '', 3, null, undefined, 4])).toEqual([1, 2, 3, 4]);
    });

    it('should preserve truthy values', () => {
      expect(compact([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should handle empty array', () => {
      expect(compact([])).toEqual([]);
    });

    it('should handle array with only falsy values', () => {
      expect(compact([0, false, '', null, undefined])).toEqual([]);
    });

    it('should handle non-array input', () => {
      expect(compact(null as any)).toEqual([]);
      expect(compact(undefined as any)).toEqual([]);
    });

    it('should keep 0 as falsy but remove it', () => {
      expect(compact([0, 1, 2])).toEqual([1, 2]);
    });
  });

  describe('flatten', () => {
    it('should flatten array by one level by default', () => {
      expect(flatten([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, [5]]);
    });

    it('should flatten array to specified depth', () => {
      expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
      expect(flatten([1, [2, [3, [4]]]], 3)).toEqual([1, 2, 3, 4]);
    });

    it('should handle depth of 0', () => {
      expect(flatten([1, [2, 3]], 0)).toEqual([1, [2, 3]]);
    });

    it('should handle empty array', () => {
      expect(flatten([])).toEqual([]);
    });

    it('should handle non-array input', () => {
      expect(flatten(null as any)).toEqual([]);
    });
  });

  describe('flattenDeep', () => {
    it('should deeply flatten array', () => {
      expect(flattenDeep([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
    });

    it('should handle mixed depths', () => {
      expect(flattenDeep([1, [2], [[3]], [[[4]]]])).toEqual([1, 2, 3, 4]);
    });

    it('should handle empty array', () => {
      expect(flattenDeep([])).toEqual([]);
    });

    it('should handle non-array input', () => {
      expect(flattenDeep(null as any)).toEqual([]);
    });
  });

  describe('uniq', () => {
    it('should remove duplicate values', () => {
      expect(uniq([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    it('should preserve order of first occurrence', () => {
      expect(uniq([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
    });

    it('should handle strings', () => {
      expect(uniq(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty array', () => {
      expect(uniq([])).toEqual([]);
    });

    it('should handle non-array input', () => {
      expect(uniq(null as any)).toEqual([]);
    });
  });

  describe('uniqBy', () => {
    it('should remove duplicates based on predicate', () => {
      const result = uniqBy(
        [
          { id: 1, name: 'a' },
          { id: 2, name: 'b' },
          { id: 1, name: 'c' },
        ],
        (item) => item.id,
      );
      expect(result).toEqual([
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
      ]);
    });

    it('should handle string values', () => {
      const result = uniqBy(['foo', 'bar', 'foo', 'baz'], (item) => item);
      expect(result).toEqual(['foo', 'bar', 'baz']);
    });

    it('should handle empty array', () => {
      expect(uniqBy([], (item) => item)).toEqual([]);
    });

    it('should handle non-array input', () => {
      expect(uniqBy(null as any, (item) => item)).toEqual([]);
    });
  });

  describe('difference', () => {
    it('should return unique values in first array not in others', () => {
      expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
    });

    it('should handle multiple exclude arrays', () => {
      expect(difference([1, 2, 3, 4], [2, 4], [3])).toEqual([1]);
    });

    it('should remove duplicates from result', () => {
      expect(difference([1, 1, 2, 3], [2])).toEqual([1, 3]);
    });

    it('should handle empty arrays', () => {
      expect(difference([1, 2, 3], [])).toEqual([1, 2, 3]);
      expect(difference([], [1, 2, 3])).toEqual([]);
    });

    it('should handle non-array input', () => {
      expect(difference(null as any, [1, 2])).toEqual([]);
    });
  });

  describe('intersection', () => {
    it('should return common values in all arrays', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    });

    it('should handle multiple arrays', () => {
      expect(intersection([1, 2, 3], [2, 3, 4], [2, 3, 5])).toEqual([2, 3]);
    });

    it('should remove duplicates from result', () => {
      expect(intersection([1, 1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should return empty array when no common values', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([]);
    });

    it('should handle empty arrays', () => {
      expect(intersection([1, 2, 3], [])).toEqual([]);
      expect(intersection([], [1, 2, 3])).toEqual([]);
    });

    it('should handle single array', () => {
      expect(intersection([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('union', () => {
    it('should return unique values from all arrays', () => {
      expect(union([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4]);
    });

    it('should handle multiple arrays', () => {
      expect(union([1, 2], [3, 4], [2, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    it('should preserve order of first occurrence', () => {
      expect(union([3, 1, 2], [2, 1, 4])).toEqual([3, 1, 2, 4]);
    });

    it('should handle empty arrays', () => {
      expect(union([1, 2], [])).toEqual([1, 2]);
      expect(union([], [])).toEqual([]);
    });

    it('should handle no arrays', () => {
      expect(union()).toEqual([]);
    });
  });

  describe('zip', () => {
    it('should zip arrays together', () => {
      expect(zip(['a', 'b', 'c'], [1, 2, 3])).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    it('should use minimum length', () => {
      expect(zip(['a', 'b'], [1, 2, 3])).toEqual([
        ['a', 1],
        ['b', 2],
      ]);
    });

    it('should handle single array', () => {
      expect(zip([1, 2, 3])).toEqual([[1], [2], [3]]);
    });

    it('should handle empty arrays', () => {
      expect(zip([], [])).toEqual([]);
    });

    it('should handle multiple arrays', () => {
      expect(zip([1, 2], ['a', 'b'], [true, false])).toEqual([
        [1, 'a', true],
        [2, 'b', false],
      ]);
    });
  });

  describe('take', () => {
    it('should take first n elements', () => {
      expect(take([1, 2, 3, 4, 5], 2)).toEqual([1, 2]);
    });

    it('should take all elements if n is larger than array length', () => {
      expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
    });

    it('should take 1 element by default', () => {
      expect(take([1, 2, 3])).toEqual([1]);
    });

    it('should return empty array for 0', () => {
      expect(take([1, 2, 3], 0)).toEqual([]);
    });

    it('should handle empty array', () => {
      expect(take([], 2)).toEqual([]);
    });

    it('should handle non-array input', () => {
      expect(take(null as any, 2)).toEqual([]);
    });
  });

  describe('drop', () => {
    it('should drop first n elements', () => {
      expect(drop([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
    });

    it('should drop all elements if n is larger than array length', () => {
      expect(drop([1, 2, 3], 5)).toEqual([]);
    });

    it('should drop 1 element by default', () => {
      expect(drop([1, 2, 3])).toEqual([2, 3]);
    });

    it('should return original array for 0', () => {
      expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
    });

    it('should handle empty array', () => {
      expect(drop([], 2)).toEqual([]);
    });

    it('should handle non-array input', () => {
      expect(drop(null as any, 2)).toEqual([]);
    });
  });

  describe('findIndex', () => {
    it('should find index of matching element', () => {
      expect(findIndex([1, 2, 3, 4], (item) => item > 2)).toBe(2);
    });

    it('should return -1 if no match', () => {
      expect(findIndex([1, 2, 3], (item) => item > 5)).toBe(-1);
    });

    it('should pass index to predicate', () => {
      expect(findIndex([10, 20, 30], (item, index) => index === 1)).toBe(1);
    });

    it('should handle empty array', () => {
      expect(findIndex([], (item) => item > 0)).toBe(-1);
    });

    it('should handle non-array input', () => {
      expect(findIndex(null as any, (item) => item)).toBe(-1);
    });
  });

  describe('remove', () => {
    it('should remove elements matching predicate', () => {
      const arr = [1, 2, 3, 4, 5];
      const removed = remove(arr, (item) => item > 3);
      expect(removed).toEqual([4, 5]);
      expect(arr).toEqual([1, 2, 3]);
    });

    it('should return removed elements', () => {
      const arr = [1, 2, 3];
      const removed = remove(arr, (item) => item === 2);
      expect(removed).toEqual([2]);
    });

    it('should handle no matches', () => {
      const arr = [1, 2, 3];
      const removed = remove(arr, (item) => item > 10);
      expect(removed).toEqual([]);
      expect(arr).toEqual([1, 2, 3]);
    });

    it('should handle empty array', () => {
      const arr: number[] = [];
      const removed = remove(arr, (item) => item > 0);
      expect(removed).toEqual([]);
      expect(arr).toEqual([]);
    });

    it('should pass index to predicate', () => {
      const arr = [10, 20, 30];
      remove(arr, (item, index) => index === 1);
      expect(arr).toEqual([10, 30]);
    });

    it('should handle non-array input', () => {
      expect(remove(null as any, (item) => true)).toEqual([]);
    });
  });
});

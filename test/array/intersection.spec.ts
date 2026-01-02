import { intersection } from '../../src/array';

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
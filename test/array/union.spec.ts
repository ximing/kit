import { union } from '../../src/array';

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
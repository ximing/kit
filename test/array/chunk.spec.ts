import { chunk } from '../../src/array';

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
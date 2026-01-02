import { drop } from '../../src/array';

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

import { take } from '../../src/array';

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
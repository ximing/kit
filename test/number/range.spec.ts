import { range } from '../../src/number';

describe('range', () => {
  it('should create range with default step', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(1, 4)).toEqual([1, 2, 3]);
  });

  it('should create range with custom step', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    expect(range(0, 10, 3)).toEqual([0, 3, 6, 9]);
  });

  it('should create descending range', () => {
    expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
    expect(range(10, 0, -2)).toEqual([10, 8, 6, 4, 2]);
  });

  it('should handle negative ranges', () => {
    expect(range(-2, 2)).toEqual([-2, -1, 0, 1]);
    expect(range(2, -2, -1)).toEqual([2, 1, 0, -1]);
  });

  it('should return empty array for invalid ranges', () => {
    expect(range(5, 5)).toEqual([]);
    expect(range(10, 5)).toEqual([]);
  });

  it('should throw error for zero step', () => {
    expect(() => range(0, 5, 0)).toThrow();
  });
});

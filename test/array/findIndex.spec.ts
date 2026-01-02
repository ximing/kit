import { findIndex } from '../../src/array';

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

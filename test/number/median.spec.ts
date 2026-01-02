import { median } from '../../src/number';

describe('median', () => {
  it('should calculate median of odd-length array', () => {
    expect(median([1, 2, 3, 4, 5])).toBe(3);
    expect(median([5, 3, 1, 4, 2])).toBe(3);
  });

  it('should calculate median of even-length array', () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([4, 2, 1, 3])).toBe(2.5);
  });

  it('should handle single element', () => {
    expect(median([5])).toBe(5);
  });

  it('should handle empty array', () => {
    expect(median([])).toBe(0);
  });

  it('should handle negative numbers', () => {
    expect(median([-1, -2, -3])).toBe(-2);
  });

  it('should handle non-array input', () => {
    expect(median(null as any)).toBe(0);
    expect(median(undefined as any)).toBe(0);
  });
});

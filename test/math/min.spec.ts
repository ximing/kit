import { min } from '../../src/math';

describe('min', () => {
  it('should return minimum value from array', () => {
    expect(min([1, 2, 3, 4])).toBe(1);
    expect(min([4, 2, 1, 3])).toBe(1);
    expect(min([-1, -2, -3])).toBe(-3);
  });

  it('should return single element', () => {
    expect(min([5])).toBe(5);
  });

  it('should return undefined for empty array', () => {
    expect(min([])).toBe(undefined);
  });

  it('should handle floating point numbers', () => {
    expect(min([1.5, 2.5, 0.1])).toBe(0.1);
  });

  it('should handle non-array input', () => {
    expect(min(null as any)).toBe(undefined);
    expect(min(undefined as any)).toBe(undefined);
  });
});

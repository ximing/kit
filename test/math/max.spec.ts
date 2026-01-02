import { max } from '../../src/math';

describe('max', () => {
  it('should return maximum value from array', () => {
    expect(max([1, 2, 3, 4])).toBe(4);
    expect(max([4, 2, 1, 3])).toBe(4);
    expect(max([-1, -2, -3])).toBe(-1);
  });

  it('should return single element', () => {
    expect(max([5])).toBe(5);
  });

  it('should return undefined for empty array', () => {
    expect(max([])).toBe(undefined);
  });

  it('should handle floating point numbers', () => {
    expect(max([1.5, 2.5, 3.1])).toBe(3.1);
  });

  it('should handle non-array input', () => {
    expect(max(null as any)).toBe(undefined);
    expect(max(undefined as any)).toBe(undefined);
  });
});
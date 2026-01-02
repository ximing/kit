import { mean } from '../../src/number';

describe('mean', () => {
  it('should calculate mean of array', () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
    expect(mean([5])).toBe(5);
    expect(mean([])).toBe(0);
  });

  it('should calculate mean of floating point numbers', () => {
    expect(mean([1.5, 2.5, 3])).toBeCloseTo(2.333333, 5);
  });

  it('should calculate mean of negative numbers', () => {
    expect(mean([-1, -2, -3])).toBe(-2);
  });

  it('should handle non-array input', () => {
    expect(mean(null as any)).toBe(0);
    expect(mean(undefined as any)).toBe(0);
  });
});
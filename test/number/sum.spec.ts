import { sum } from '../../src/number';

describe('sum', () => {
  it('should sum array of numbers', () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
    expect(sum([1])).toBe(1);
    expect(sum([])).toBe(0);
  });

  it('should sum floating point numbers', () => {
    expect(sum([1.5, 2.5, 3])).toBe(7);
  });

  it('should sum negative numbers', () => {
    expect(sum([-1, -2, -3])).toBe(-6);
    expect(sum([-1, 2, -3])).toBe(-2);
  });

  it('should handle non-array input', () => {
    expect(sum(null as any)).toBe(0);
    expect(sum(undefined as any)).toBe(0);
  });
});

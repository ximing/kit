import { clamp } from '../../src/number';

describe('clamp', () => {
  it('should clamp number within bounds', () => {
    expect(clamp(10, 5, 15)).toBe(10);
    expect(clamp(3, 5, 15)).toBe(5);
    expect(clamp(20, 5, 15)).toBe(15);
  });

  it('should clamp negative numbers', () => {
    expect(clamp(-10, -20, 0)).toBe(-10);
    expect(clamp(-30, -20, 0)).toBe(-20);
    expect(clamp(5, -20, 0)).toBe(0);
  });

  it('should handle equal bounds', () => {
    expect(clamp(5, 10, 10)).toBe(10);
    expect(clamp(10, 10, 10)).toBe(10);
  });

  it('should throw error if lower > upper', () => {
    expect(() => clamp(5, 15, 5)).toThrow();
  });
});

import { floor } from '../../src/number';

describe('floor', () => {
  it('should floor to nearest integer', () => {
    expect(floor(4.006)).toBe(4);
    expect(floor(4)).toBe(4);
    expect(floor(3.9)).toBe(3);
  });

  it('should floor to specified precision', () => {
    expect(floor(4.006, 2)).toBe(4);
    expect(floor(4.999, 2)).toBe(4.99);
    expect(floor(1.234, 2)).toBe(1.23);
  });

  it('should floor to negative precision', () => {
    expect(floor(4060, -2)).toBe(4000);
    expect(floor(4999, -2)).toBe(4900);
  });

  it('should handle negative numbers', () => {
    expect(floor(-4.006)).toBe(-5);
    expect(floor(-4.006, 2)).toBe(-4.01);
  });
});
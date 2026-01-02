import { ceil } from '../../src/number';

describe('ceil', () => {
  it('should ceil to nearest integer', () => {
    expect(ceil(4.006)).toBe(5);
    expect(ceil(4)).toBe(4);
    expect(ceil(3.1)).toBe(4);
  });

  it('should ceil to specified precision', () => {
    expect(ceil(4.006, 2)).toBe(4.01);
    expect(ceil(4.001, 2)).toBe(4.01);
    expect(ceil(1.234, 2)).toBe(1.24);
  });

  it('should ceil to negative precision', () => {
    expect(ceil(4060, -2)).toBe(4100);
    expect(ceil(4001, -2)).toBe(4100);
  });

  it('should handle negative numbers', () => {
    expect(ceil(-4.006)).toBe(-4);
    expect(ceil(-4.006, 2)).toBe(-4);
  });
});
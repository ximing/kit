import { round } from '../../src/number';

describe('round', () => {
  it('should round to nearest integer', () => {
    expect(round(4.006)).toBe(4);
    expect(round(4.4)).toBe(4);
    expect(round(4.6)).toBe(5);
  });

  it('should round to specified precision', () => {
    expect(round(4.006, 2)).toBe(4.01);
    expect(round(1.234, 2)).toBe(1.23);
    expect(round(1.235, 2)).toBe(1.24);
  });

  it('should round to negative precision', () => {
    expect(round(4060, -2)).toBe(4100);
    expect(round(1234, -1)).toBe(1230);
  });

  it('should handle zero', () => {
    expect(round(0)).toBe(0);
    expect(round(0, 2)).toBe(0);
  });
});

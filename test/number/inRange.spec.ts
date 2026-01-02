import { inRange } from '../../src/number';

describe('inRange', () => {
  it('should check if number is in range', () => {
    expect(inRange(3, 2, 4)).toBe(true);
    expect(inRange(2, 2, 4)).toBe(true);
    expect(inRange(4, 2, 4)).toBe(false);
  });

  it('should handle single argument', () => {
    expect(inRange(3, 5)).toBe(true);
    expect(inRange(5, 5)).toBe(false);
    expect(inRange(0, 5)).toBe(true);
  });

  it('should handle reversed bounds', () => {
    expect(inRange(3, 4, 2)).toBe(true);
    expect(inRange(2, 4, 2)).toBe(true);
  });

  it('should handle negative ranges', () => {
    expect(inRange(-1, -2, 0)).toBe(true);
    expect(inRange(-2, -2, 0)).toBe(true);
    expect(inRange(0, -2, 0)).toBe(false);
  });

  it('should handle floating point numbers', () => {
    expect(inRange(2.5, 2, 3)).toBe(true);
    expect(inRange(3, 2.5, 3)).toBe(false);
  });
});
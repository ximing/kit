import { random } from '../../src/number';

describe('random', () => {
  it('should generate random number with single argument', () => {
    const result = random(10);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(10);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should generate random number between bounds', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(5, 15);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThan(15);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('should generate floating point number', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(5, 15, true);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThan(15);
    }
  });

  it('should handle reversed bounds', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(15, 5);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThan(15);
    }
  });

  it('should handle zero', () => {
    const result = random(5, 5);
    expect(result).toBe(5);
  });
});
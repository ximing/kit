import { addDays } from '../../src/date';

describe('addDays', () => {
  it('should add positive days', () => {
    const date = new Date('2024-01-15');
    const result = addDays(date, 5);
    expect(result.getDate()).toBe(20);
    expect(result.getMonth()).toBe(0);
    expect(result.getFullYear()).toBe(2024);
  });

  it('should add negative days', () => {
    const date = new Date('2024-01-15');
    const result = addDays(date, -3);
    expect(result.getDate()).toBe(12);
  });

  it('should handle month overflow', () => {
    const date = new Date('2024-01-25');
    const result = addDays(date, 10);
    expect(result.getDate()).toBe(4);
    expect(result.getMonth()).toBe(1); // February
  });

  it('should handle month underflow', () => {
    const date = new Date('2024-01-05');
    const result = addDays(date, -10);
    expect(result.getDate()).toBe(26);
    expect(result.getMonth()).toBe(11); // December of previous year
    expect(result.getFullYear()).toBe(2023);
  });

  it('should add zero days', () => {
    const date = new Date('2024-01-15');
    const result = addDays(date, 0);
    expect(result.getDate()).toBe(15);
  });

  it('should floor decimal values', () => {
    const date = new Date('2024-01-15');
    const result = addDays(date, 5.7);
    expect(result.getDate()).toBe(20);
  });

  it('should return NaN for invalid date', () => {
    const result = addDays(new Date(NaN), 5);
    expect(isNaN(result.getTime())).toBe(true);
  });

  it('should return NaN for invalid amount', () => {
    const date = new Date('2024-01-15');
    expect(isNaN(addDays(date, NaN).getTime())).toBe(true);
    expect(isNaN(addDays(date, Infinity).getTime())).toBe(true);
  });
});
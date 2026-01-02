import { addMonths } from '../../src/date';

describe('addMonths', () => {
  it('should add positive months', () => {
    const date = new Date('2024-01-15');
    const result = addMonths(date, 3);
    expect(result.getMonth()).toBe(3); // April
    expect(result.getFullYear()).toBe(2024);
  });

  it('should add negative months', () => {
    const date = new Date('2024-01-15');
    const result = addMonths(date, -2);
    expect(result.getMonth()).toBe(10); // November
    expect(result.getFullYear()).toBe(2023);
  });

  it('should handle year overflow', () => {
    const date = new Date('2024-11-15');
    const result = addMonths(date, 3);
    expect(result.getMonth()).toBe(1); // February
    expect(result.getFullYear()).toBe(2025);
  });

  it('should add zero months', () => {
    const date = new Date('2024-01-15');
    const result = addMonths(date, 0);
    expect(result.getMonth()).toBe(0);
    expect(result.getFullYear()).toBe(2024);
  });

  it('should floor decimal values', () => {
    const date = new Date('2024-01-15');
    const result = addMonths(date, 3.7);
    expect(result.getMonth()).toBe(3); // April
  });

  it('should return NaN for invalid date', () => {
    const result = addMonths(new Date(NaN), 3);
    expect(isNaN(result.getTime())).toBe(true);
  });

  it('should return NaN for invalid amount', () => {
    const date = new Date('2024-01-15');
    expect(isNaN(addMonths(date, NaN).getTime())).toBe(true);
  });
});
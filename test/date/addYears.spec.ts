import { addYears } from '../../src/date';

describe('addYears', () => {
  it('should add positive years', () => {
    const date = new Date('2024-01-15');
    const result = addYears(date, 2);
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(15);
  });

  it('should add negative years', () => {
    const date = new Date('2024-01-15');
    const result = addYears(date, -3);
    expect(result.getFullYear()).toBe(2021);
  });

  it('should add zero years', () => {
    const date = new Date('2024-01-15');
    const result = addYears(date, 0);
    expect(result.getFullYear()).toBe(2024);
  });

  it('should floor decimal values', () => {
    const date = new Date('2024-01-15');
    const result = addYears(date, 2.7);
    expect(result.getFullYear()).toBe(2026);
  });

  it('should return NaN for invalid date', () => {
    const result = addYears(new Date(NaN), 2);
    expect(isNaN(result.getTime())).toBe(true);
  });

  it('should return NaN for invalid amount', () => {
    const date = new Date('2024-01-15');
    expect(isNaN(addYears(date, NaN).getTime())).toBe(true);
  });
});

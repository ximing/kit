import { diffMonths } from '../../src/date';

describe('diffMonths', () => {
  it('should calculate positive difference', () => {
    const date1 = new Date('2024-04-15');
    const date2 = new Date('2024-01-15');
    expect(diffMonths(date1, date2)).toBe(3);
  });

  it('should calculate negative difference', () => {
    const date1 = new Date('2024-01-15');
    const date2 = new Date('2024-04-15');
    expect(diffMonths(date1, date2)).toBe(-3);
  });

  it('should return 0 for same month', () => {
    const date1 = new Date('2024-01-20');
    const date2 = new Date('2024-01-15');
    expect(diffMonths(date1, date2)).toBe(0);
  });

  it('should handle year boundaries', () => {
    const date1 = new Date('2025-02-15');
    const date2 = new Date('2024-01-15');
    expect(diffMonths(date1, date2)).toBe(13);
  });

  it('should return NaN for invalid date1', () => {
    const date2 = new Date('2024-01-15');
    expect(isNaN(diffMonths(new Date(NaN), date2))).toBe(true);
  });

  it('should return NaN for invalid date2', () => {
    const date1 = new Date('2024-04-15');
    expect(isNaN(diffMonths(date1, new Date(NaN)))).toBe(true);
  });
});
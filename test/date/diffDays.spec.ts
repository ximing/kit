import { diffDays } from '../../src/date';

describe('diffDays', () => {
  it('should calculate positive difference', () => {
    const date1 = new Date('2024-01-20');
    const date2 = new Date('2024-01-15');
    expect(diffDays(date1, date2)).toBe(5);
  });

  it('should calculate negative difference', () => {
    const date1 = new Date('2024-01-15');
    const date2 = new Date('2024-01-20');
    expect(diffDays(date1, date2)).toBe(-5);
  });

  it('should return 0 for same date', () => {
    const date = new Date('2024-01-15');
    expect(diffDays(date, date)).toBe(0);
  });

  it('should handle different times on same day', () => {
    const date1 = new Date('2024-01-15T23:59:59');
    const date2 = new Date('2024-01-15T00:00:00');
    expect(diffDays(date1, date2)).toBe(0);
  });

  it('should handle month boundaries', () => {
    const date1 = new Date('2024-02-01');
    const date2 = new Date('2024-01-31');
    expect(diffDays(date1, date2)).toBe(1);
  });

  it('should return NaN for invalid date1', () => {
    const date2 = new Date('2024-01-15');
    expect(isNaN(diffDays(new Date(NaN), date2))).toBe(true);
  });

  it('should return NaN for invalid date2', () => {
    const date1 = new Date('2024-01-20');
    expect(isNaN(diffDays(date1, new Date(NaN)))).toBe(true);
  });
});
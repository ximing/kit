import { diffYears } from '../../src/date';

describe('diffYears', () => {
  it('should calculate positive difference', () => {
    const date1 = new Date('2026-01-15');
    const date2 = new Date('2024-01-15');
    expect(diffYears(date1, date2)).toBe(2);
  });

  it('should calculate negative difference', () => {
    const date1 = new Date('2024-01-15');
    const date2 = new Date('2026-01-15');
    expect(diffYears(date1, date2)).toBe(-2);
  });

  it('should return 0 for same year', () => {
    const date1 = new Date('2024-12-15');
    const date2 = new Date('2024-01-15');
    expect(diffYears(date1, date2)).toBe(0);
  });

  it('should return 1 for consecutive years', () => {
    const date1 = new Date('2025-01-15');
    const date2 = new Date('2024-12-31');
    expect(diffYears(date1, date2)).toBe(1);
  });

  it('should return NaN for invalid date1', () => {
    const date2 = new Date('2024-01-15');
    expect(isNaN(diffYears(new Date(NaN), date2))).toBe(true);
  });

  it('should return NaN for invalid date2', () => {
    const date1 = new Date('2026-01-15');
    expect(isNaN(diffYears(date1, new Date(NaN)))).toBe(true);
  });
});

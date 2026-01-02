import { isDate } from '../../src/is';

describe('isDate', () => {
  it('should return true for Date objects', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date('2023-01-01'))).toBe(true);
  });

  it('should return false for non-Date values', () => {
    expect(isDate(Date.now())).toBe(false);
    expect(isDate('2023-01-01')).toBe(false);
    expect(isDate(1234567890)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate(null)).toBe(false);
  });
});

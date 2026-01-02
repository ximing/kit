import { format } from '../../src/date';

describe('format', () => {
  it('should format date with default format', () => {
    const date = new Date(2024, 0, 15, 14, 30, 45, 123);
    const result = format(date);
    expect(result).toBe('2024-01-15 14:30:45');
  });

  it('should format date with custom format', () => {
    const date = new Date(2024, 0, 15, 14, 30, 45, 123);
    expect(format(date, 'YYYY/MM/DD')).toBe('2024/01/15');
    expect(format(date, 'DD-MM-YYYY')).toBe('15-01-2024');
    expect(format(date, 'MM/DD/YYYY HH:mm')).toBe('01/15/2024 14:30');
  });

  it('should format date with milliseconds', () => {
    const date = new Date(2024, 0, 15, 14, 30, 45, 123);
    const result = format(date, 'YYYY-MM-DD HH:mm:ss.SSS');
    expect(result).toContain('2024-01-15');
    expect(result).toContain('14:30:45');
    expect(result).toContain('123');
  });

  it('should pad single digit values with leading zeros', () => {
    const date = new Date(2024, 0, 5, 9, 5, 3, 5);
    const result = format(date);
    expect(result).toBe('2024-01-05 09:05:03');
  });

  it('should return empty string for invalid date', () => {
    expect(format(new Date('invalid'))).toBe('');
    expect(format(new Date(NaN))).toBe('');
  });

  it('should handle multiple occurrences of same token', () => {
    const date = new Date(2024, 0, 15, 14, 30, 45, 123);
    const result = format(date, 'YYYY-YYYY-MM-MM-DD-DD');
    expect(result).toBe('2024-2024-01-01-15-15');
  });
});

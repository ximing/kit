import { endOfDay } from '../../src/date';

describe('endOfDay', () => {
  it('should set time to end of day', () => {
    const date = new Date('2024-01-15T14:30:45.123Z');
    const result = endOfDay(date);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it('should preserve date components', () => {
    const date = new Date('2024-01-15T14:30:45.123Z');
    const result = endOfDay(date);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(15);
  });

  it('should not modify original date', () => {
    const date = new Date('2024-01-15T14:30:45.123Z');
    const originalTime = date.getTime();
    endOfDay(date);
    expect(date.getTime()).toBe(originalTime);
  });

  it('should return NaN for invalid date', () => {
    const result = endOfDay(new Date(NaN));
    expect(isNaN(result.getTime())).toBe(true);
  });

  it('should work with already end-of-day date', () => {
    const date = new Date('2024-01-15T23:59:59.999Z');
    const result = endOfDay(date);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });
});

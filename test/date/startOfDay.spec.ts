import { startOfDay } from '../../src/date';

describe('startOfDay', () => {
  it('should set time to start of day', () => {
    const date = new Date('2024-01-15T14:30:45.123Z');
    const result = startOfDay(date);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it('should preserve date components', () => {
    const date = new Date('2024-01-15T14:30:45.123Z');
    const result = startOfDay(date);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(15);
  });

  it('should not modify original date', () => {
    const date = new Date('2024-01-15T14:30:45.123Z');
    const originalTime = date.getTime();
    startOfDay(date);
    expect(date.getTime()).toBe(originalTime);
  });

  it('should return NaN for invalid date', () => {
    const result = startOfDay(new Date(NaN));
    expect(isNaN(result.getTime())).toBe(true);
  });

  it('should work with already start-of-day date', () => {
    const date = new Date('2024-01-15T00:00:00.000Z');
    const result = startOfDay(date);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });
});
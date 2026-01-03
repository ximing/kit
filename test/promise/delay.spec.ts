import { delay } from '../../src/promise';

describe('delay', () => {
  it('should delay execution', async () => {
    const start = Date.now();
    await delay(100);
    const elapsed = Date.now() - start;
    // Allow 10ms tolerance for system variance in CI environments
    expect(elapsed).toBeGreaterThanOrEqual(90);
    expect(elapsed).toBeLessThan(200);
  });

  it('should resolve with undefined by default', async () => {
    const result = await delay(10);
    expect(result).toBeUndefined();
  });

  it('should resolve with provided value', async () => {
    const result = await delay(10, 'hello');
    expect(result).toBe('hello');
  });

  it('should resolve with number value', async () => {
    const result = await delay(10, 42);
    expect(result).toBe(42);
  });

  it('should resolve with object value', async () => {
    const obj = { a: 1, b: 2 };
    const result = await delay(10, obj);
    expect(result).toEqual(obj);
  });

  it('should resolve with null value', async () => {
    const result = await delay(10, null);
    expect(result).toBeNull();
  });

  it('should handle zero delay', async () => {
    const result = await delay(0, 'instant');
    expect(result).toBe('instant');
  });

  it('should be a promise', () => {
    const result = delay(100);
    expect(result).toBeInstanceOf(Promise);
  });
});

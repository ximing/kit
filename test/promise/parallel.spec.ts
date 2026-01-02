import { parallel, delay } from '../../src/promise';

describe('parallel', () => {
  it('should execute tasks in parallel', async () => {
    const start = Date.now();
    const results = await parallel([
      () => delay(50, 'a'),
      () => delay(50, 'b'),
      () => delay(50, 'c'),
    ]);
    const elapsed = Date.now() - start;
    expect(results).toEqual(['a', 'b', 'c']);
    expect(elapsed).toBeLessThan(150); // Should be ~50ms, not 150ms
  });

  it('should respect concurrency limit', async () => {
    const start = Date.now();
    const results = await parallel(
      [
        () => delay(50, 'a'),
        () => delay(50, 'b'),
        () => delay(50, 'c'),
      ],
      2
    );
    const elapsed = Date.now() - start;
    expect(results).toEqual(['a', 'b', 'c']);
    expect(elapsed).toBeGreaterThanOrEqual(100); // Should be ~100ms with concurrency 2
  });

  it('should handle empty array', async () => {
    const results = await parallel([]);
    expect(results).toEqual([]);
  });

  it('should handle single task', async () => {
    const results = await parallel([() => Promise.resolve('single')]);
    expect(results).toEqual(['single']);
  });

  it('should preserve order', async () => {
    const results = await parallel([
      () => delay(100, 'first'),
      () => delay(50, 'second'),
      () => delay(150, 'third'),
    ]);
    expect(results).toEqual(['first', 'second', 'third']);
  });

  it('should handle synchronous tasks', async () => {
    const results = await parallel([
      () => 'a',
      () => 'b',
      () => 'c',
    ]);
    expect(results).toEqual(['a', 'b', 'c']);
  });

  it('should reject on first error', async () => {
    const tasks = [
      () => delay(50, 'a'),
      () => Promise.reject(new Error('error in task 2')),
      () => delay(50, 'c'),
    ];
    await expect(parallel(tasks)).rejects.toThrow('error in task 2');
  });

  it('should handle concurrency of 1 (sequential)', async () => {
    const start = Date.now();
    const results = await parallel(
      [
        () => delay(50, 'a'),
        () => delay(50, 'b'),
        () => delay(50, 'c'),
      ],
      1
    );
    const elapsed = Date.now() - start;
    expect(results).toEqual(['a', 'b', 'c']);
    expect(elapsed).toBeGreaterThanOrEqual(150); // Should be ~150ms
  });

  it('should handle tasks returning different types', async () => {
    const results = await parallel([
      () => Promise.resolve(42),
      () => Promise.resolve('string'),
      () => Promise.resolve({ key: 'value' }),
    ]);
    expect(results[0]).toBe(42);
    expect(results[1]).toBe('string');
    expect(results[2]).toEqual({ key: 'value' });
  });

  it('should handle concurrency larger than task count', async () => {
    const results = await parallel(
      [() => Promise.resolve('a'), () => Promise.resolve('b')],
      10
    );
    expect(results).toEqual(['a', 'b']);
  });
});
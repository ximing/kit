import { map, delay } from '../../src/promise';

describe('map', () => {
  it('should map array elements', async () => {
    const results = await map([1, 2, 3], (n) => n * 2);
    expect(results).toEqual([2, 4, 6]);
  });

  it('should map with async mapper', async () => {
    const results = await map([1, 2, 3], (n) => Promise.resolve(n * 2));
    expect(results).toEqual([2, 4, 6]);
  });

  it('should respect concurrency limit', async () => {
    const start = Date.now();
    const results = await map([1, 2, 3], () => delay(50), 2);
    const elapsed = Date.now() - start;
    expect(results.length).toBe(3);
    // Allow 10ms tolerance for system variance in CI environments
    expect(elapsed).toBeGreaterThanOrEqual(90); // Should be ~100ms with concurrency 2
  });

  it('should handle empty array', async () => {
    const results = await map([], (n) => n * 2);
    expect(results).toEqual([]);
  });

  it('should preserve order', async () => {
    const results = await map([1, 2, 3], (n) => delay(100 - n * 20, n));
    expect(results).toEqual([1, 2, 3]);
  });

  it('should pass index to mapper', async () => {
    const indices: number[] = [];
    await map([10, 20, 30], (_, index) => {
      indices.push(index);
      return Promise.resolve();
    });
    expect(indices).toEqual([0, 1, 2]);
  });

  it('should reject on error', async () => {
    const mapper = (n: number) => {
      if (n === 2) {
        return Promise.reject(new Error('error on 2'));
      }
      return Promise.resolve(n * 2);
    };
    await expect(map([1, 2, 3], mapper)).rejects.toThrow('error on 2');
  });

  it('should handle synchronous mapper', async () => {
    const results = await map([1, 2, 3], (n) => n * 2);
    expect(results).toEqual([2, 4, 6]);
  });

  it('should handle different types', async () => {
    const results = await map(['a', 'b', 'c'], (s) => Promise.resolve(s.toUpperCase()));
    expect(results).toEqual(['A', 'B', 'C']);
  });

  it('should handle concurrency of 1 (sequential)', async () => {
    const start = Date.now();
    const results = await map([1, 2, 3], () => delay(50), 1);
    const elapsed = Date.now() - start;
    expect(results.length).toBe(3);
    // Allow 20ms tolerance for system variance in CI environments
    expect(elapsed).toBeGreaterThanOrEqual(130); // Should be ~150ms
  });

  it('should handle concurrency larger than array length', async () => {
    const results = await map([1, 2], (n) => n * 2, 10);
    expect(results).toEqual([2, 4]);
  });

  it('should handle objects in array', async () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const results = await map(input, (obj) => Promise.resolve({ ...obj, processed: true }));
    expect(results).toEqual([
      { id: 1, processed: true },
      { id: 2, processed: true },
      { id: 3, processed: true },
    ]);
  });
});

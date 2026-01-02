import { filter, delay } from '../../src/promise';

describe('filter', () => {
  it('should filter array elements', async () => {
    const results = await filter([1, 2, 3, 4, 5], (n) => n % 2 === 0);
    expect(results).toEqual([2, 4]);
  });

  it('should filter with async predicate', async () => {
    const results = await filter([1, 2, 3, 4, 5], (n) => Promise.resolve(n % 2 === 0));
    expect(results).toEqual([2, 4]);
  });

  it('should respect concurrency limit', async () => {
    const start = Date.now();
    const results = await filter([1, 2, 3, 4, 5], () => delay(50, true), 2);
    const elapsed = Date.now() - start;
    expect(results.length).toBe(5);
    expect(elapsed).toBeGreaterThanOrEqual(150); // Should be ~150ms with concurrency 2
  });

  it('should handle empty array', async () => {
    const results = await filter([], (n) => n > 0);
    expect(results).toEqual([]);
  });

  it('should preserve order', async () => {
    const results = await filter([1, 2, 3, 4, 5], (n) => Promise.resolve(n % 2 === 0));
    expect(results).toEqual([2, 4]);
  });

  it('should pass index to predicate', async () => {
    const indices: number[] = [];
    await filter([10, 20, 30], (_, index) => {
      indices.push(index);
      return Promise.resolve(true);
    });
    expect(indices).toEqual([0, 1, 2]);
  });

  it('should reject on error', async () => {
    const predicate = (n: number) => {
      if (n === 3) {
        return Promise.reject(new Error('error on 3'));
      }
      return Promise.resolve(n > 2);
    };
    await expect(filter([1, 2, 3, 4, 5], predicate)).rejects.toThrow('error on 3');
  });

  it('should handle synchronous predicate', async () => {
    const results = await filter([1, 2, 3, 4, 5], (n) => n > 2);
    expect(results).toEqual([3, 4, 5]);
  });

  it('should filter all elements', async () => {
    const results = await filter([1, 2, 3, 4, 5], () => true);
    expect(results).toEqual([1, 2, 3, 4, 5]);
  });

  it('should filter no elements', async () => {
    const results = await filter([1, 2, 3, 4, 5], () => false);
    expect(results).toEqual([]);
  });

  it('should handle concurrency of 1 (sequential)', async () => {
    const start = Date.now();
    const results = await filter([1, 2, 3], () => delay(50, true), 1);
    const elapsed = Date.now() - start;
    expect(results.length).toBe(3);
    expect(elapsed).toBeGreaterThanOrEqual(150); // Should be ~150ms
  });

  it('should handle objects in array', async () => {
    const input = [
      { id: 1, active: true },
      { id: 2, active: false },
      { id: 3, active: true },
    ];
    const results = await filter(input, (obj) => Promise.resolve(obj.active));
    expect(results).toEqual([
      { id: 1, active: true },
      { id: 3, active: true },
    ]);
  });

  it('should handle strings in array', async () => {
    const results = await filter(['apple', 'banana', 'apricot', 'cherry'], (s) => s.startsWith('a'));
    expect(results).toEqual(['apple', 'apricot']);
  });
});

import { sampleSize } from '../../src/collection';

describe('sampleSize', () => {
  it('should return n random elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = sampleSize(arr, 2);
    expect(result).toHaveLength(2);
    result.forEach((item) => {
      expect(arr).toContain(item);
    });
  });

  it('should return empty array for n <= 0', () => {
    const result = sampleSize([1, 2, 3], 0);
    expect(result).toEqual([]);
  });

  it('should return empty array for empty input', () => {
    const result = sampleSize([], 5);
    expect(result).toEqual([]);
  });

  it('should return all elements when n >= array length', () => {
    const arr = [1, 2, 3];
    const result = sampleSize(arr, 5);
    expect(result).toHaveLength(3);
    expect(result.sort()).toEqual([1, 2, 3]);
  });

  it('should not have duplicates', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = sampleSize(arr, 5);
    expect(result).toHaveLength(5);
    expect(new Set(result).size).toBe(5);
  });

  it('should work with strings', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const result = sampleSize(arr, 2);
    expect(result).toHaveLength(2);
    result.forEach((item) => {
      expect(arr).toContain(item);
    });
  });

  it('should have reasonable distribution', () => {
    const arr = [1, 2, 3, 4, 5];
    const counts: Record<number, number> = {};

    for (let i = 0; i < 1000; i++) {
      const result = sampleSize(arr, 3);
      result.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
      });
    }

    // Check that all elements were sampled
    expect(Object.keys(counts)).toHaveLength(5);

    // Check that distribution is somewhat balanced
    Object.values(counts).forEach((count) => {
      expect(count).toBeGreaterThan(400);
      expect(count).toBeLessThan(800);
    });
  });
});

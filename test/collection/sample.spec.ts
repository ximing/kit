import { sample } from '../../src/collection';

describe('sample', () => {
  it('should return a random element', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = sample(arr);
    expect(arr).toContain(result);
  });

  it('should return undefined for empty array', () => {
    const result = sample([]);
    expect(result).toBeUndefined();
  });

  it('should return the only element in single-element array', () => {
    const result = sample([42]);
    expect(result).toBe(42);
  });

  it('should work with strings', () => {
    const arr = ['a', 'b', 'c'];
    const result = sample(arr);
    expect(arr).toContain(result);
  });

  it('should work with objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const arr = [obj1, obj2];
    const result = sample(arr);
    expect(arr).toContain(result);
  });

  it('should have reasonable distribution', () => {
    const arr = [1, 2, 3, 4, 5];
    const counts: Record<number, number> = {};

    for (let i = 0; i < 1000; i++) {
      const result = sample(arr);
      counts[result!] = (counts[result!] || 0) + 1;
    }

    // Check that all elements were sampled
    expect(Object.keys(counts)).toHaveLength(5);

    // Check that distribution is somewhat balanced (rough check)
    Object.values(counts).forEach((count) => {
      expect(count).toBeGreaterThan(50);
      expect(count).toBeLessThan(350);
    });
  });
});

import { shuffle } from '../../src/collection';

describe('shuffle', () => {
  it('should return array with same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result.sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should not mutate original array', () => {
    const original = [1, 2, 3, 4, 5];
    const originalCopy = [...original];
    shuffle(original);
    expect(original).toEqual(originalCopy);
  });

  it('should handle empty array', () => {
    const result = shuffle([]);
    expect(result).toEqual([]);
  });

  it('should handle single element', () => {
    const result = shuffle([1]);
    expect(result).toEqual([1]);
  });

  it('should work with strings', () => {
    const arr = ['a', 'b', 'c'];
    const result = shuffle(arr);
    expect(result).toHaveLength(3);
    expect(result.sort()).toEqual(['a', 'b', 'c']);
  });

  it('should have reasonable randomness', () => {
    const arr = [1, 2, 3];
    const permutations = new Set<string>();
    
    for (let i = 0; i < 1000; i++) {
      const result = shuffle(arr);
      permutations.add(JSON.stringify(result));
    }

    // Should generate multiple different permutations
    expect(permutations.size).toBeGreaterThan(1);
  });

  it('should work with objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const arr = [obj1, obj2, obj3];
    
    const result = shuffle(arr);
    expect(result).toHaveLength(3);
    expect(result).toContain(obj1);
    expect(result).toContain(obj2);
    expect(result).toContain(obj3);
  });
});
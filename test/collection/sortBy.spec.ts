import { sortBy } from '../../src/collection';

describe('sortBy', () => {
  it('should sort elements by property', () => {
    const users = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Bob', age: 35 },
    ];
    const result = sortBy(users, 'age');
    expect(result[0].age).toBe(25);
    expect(result[1].age).toBe(30);
    expect(result[2].age).toBe(35);
  });

  it('should sort by function', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
    const result = sortBy(numbers, (n) => n);
    expect(result).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  it('should sort by multiple properties', () => {
    const users = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Alice', age: 25 },
    ];
    const result = sortBy(users, ['age', 'name']);
    expect(result[0].name).toBe('Alice');
    expect(result[1].name).toBe('Jane');
    expect(result[2].name).toBe('John');
  });

  it('should handle empty array', () => {
    const result = sortBy([], 'key');
    expect(result).toEqual([]);
  });

  it('should handle strings', () => {
    const items = [{ label: 'zebra' }, { label: 'apple' }, { label: 'banana' }];
    const result = sortBy(items, 'label');
    expect(result[0].label).toBe('apple');
    expect(result[1].label).toBe('banana');
    expect(result[2].label).toBe('zebra');
  });

  it('should not mutate original array', () => {
    const original = [3, 1, 2];
    const result = sortBy(original, (n) => n);
    expect(original).toEqual([3, 1, 2]);
    expect(result).toEqual([1, 2, 3]);
  });
});

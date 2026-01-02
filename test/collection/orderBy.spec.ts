import { orderBy } from '../../src/collection';

describe('orderBy', () => {
  it('should sort ascending by default', () => {
    const users = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Bob', age: 35 },
    ];
    const result = orderBy(users, 'age');
    expect(result[0].age).toBe(25);
    expect(result[1].age).toBe(30);
    expect(result[2].age).toBe(35);
  });

  it('should sort descending', () => {
    const users = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Bob', age: 35 },
    ];
    const result = orderBy(users, 'age', ['desc']);
    expect(result[0].age).toBe(35);
    expect(result[1].age).toBe(30);
    expect(result[2].age).toBe(25);
  });

  it('should sort by multiple properties with different orders', () => {
    const users = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Alice', age: 25 },
    ];
    const result = orderBy(users, ['age', 'name'], ['asc', 'desc']);
    expect(result[0].name).toBe('Jane');
    expect(result[1].name).toBe('Alice');
    expect(result[2].name).toBe('John');
  });

  it('should handle empty array', () => {
    const result = orderBy([], 'key', ['asc']);
    expect(result).toEqual([]);
  });

  it('should handle function iteratee', () => {
    const numbers = [3, 1, 4, 1, 5, 9];
    const result = orderBy(numbers, (n) => n, ['desc']);
    expect(result).toEqual([9, 5, 4, 3, 1, 1]);
  });

  it('should not mutate original array', () => {
    const original = [3, 1, 2];
    const result = orderBy(original, (n) => n, ['desc']);
    expect(original).toEqual([3, 1, 2]);
    expect(result).toEqual([3, 2, 1]);
  });
});

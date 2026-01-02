import { groupBy } from '../../src/collection';

describe('groupBy', () => {
  it('should group elements by property', () => {
    const users = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 25 }
    ];
    const result = groupBy(users, 'age');
    expect(result['30']).toHaveLength(2);
    expect(result['25']).toHaveLength(1);
    expect(result['30'][0].name).toBe('John');
  });

  it('should group elements by function', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const result = groupBy(numbers, (n) => n % 2 === 0 ? 'even' : 'odd');
    expect(result['even']).toEqual([2, 4, 6]);
    expect(result['odd']).toEqual([1, 3, 5]);
  });

  it('should handle empty array', () => {
    const result = groupBy([], 'key');
    expect(result).toEqual({});
  });

  it('should group with numeric keys', () => {
    const items = [
      { id: 1, type: 1 },
      { id: 2, type: 1 },
      { id: 3, type: 2 }
    ];
    const result = groupBy(items, 'type');
    expect(result[1]).toHaveLength(2);
    expect(result[2]).toHaveLength(1);
  });

  it('should group with function returning numbers', () => {
    const items = [1, 2, 3, 4, 5];
    const result = groupBy(items, (n) => Math.floor(n / 2));
    expect(result[0]).toEqual([1]);
    expect(result[1]).toEqual([2, 3]);
    expect(result[2]).toEqual([4, 5]);
  });
});
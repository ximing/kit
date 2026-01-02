import { countBy } from '../../src/collection';

describe('countBy', () => {
  it('should count elements by property', () => {
    const users = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 25 }
    ];
    const result = countBy(users, 'age');
    expect(result['30']).toBe(2);
    expect(result['25']).toBe(1);
  });

  it('should count elements by function', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const result = countBy(numbers, (n) => n % 2 === 0 ? 'even' : 'odd');
    expect(result['even']).toBe(3);
    expect(result['odd']).toBe(3);
  });

  it('should handle empty array', () => {
    const result = countBy([], 'key');
    expect(result).toEqual({});
  });

  it('should count with numeric keys', () => {
    const items = [
      { type: 1 },
      { type: 1 },
      { type: 2 }
    ];
    const result = countBy(items, 'type');
    expect(result[1]).toBe(2);
    expect(result[2]).toBe(1);
  });

  it('should count all items in same group', () => {
    const items = [1, 1, 1, 1];
    const result = countBy(items, (n) => 'all');
    expect(result['all']).toBe(4);
  });

  it('should count with function returning numbers', () => {
    const items = [1, 2, 3, 4, 5];
    const result = countBy(items, (n) => Math.floor(n / 2));
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(2);
    expect(result[2]).toBe(2);
  });
});
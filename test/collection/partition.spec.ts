import { partition } from '../../src/collection';

describe('partition', () => {
  it('should partition by property', () => {
    const users = [
      { name: 'John', active: true },
      { name: 'Jane', active: false },
      { name: 'Bob', active: true },
    ];
    const [active, inactive] = partition(users, 'active');
    expect(active).toHaveLength(2);
    expect(inactive).toHaveLength(1);
    expect(active[0].name).toBe('John');
    expect(inactive[0].name).toBe('Jane');
  });

  it('should partition by function', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const [even, odd] = partition(numbers, (n) => n % 2 === 0);
    expect(even).toEqual([2, 4, 6]);
    expect(odd).toEqual([1, 3, 5]);
  });

  it('should handle empty array', () => {
    const [trueGroup, falseGroup] = partition([], 'key');
    expect(trueGroup).toEqual([]);
    expect(falseGroup).toEqual([]);
  });

  it('should handle all truthy', () => {
    const items = [1, 2, 3];
    const [trueGroup, falseGroup] = partition(items, (n) => n > 0);
    expect(trueGroup).toEqual([1, 2, 3]);
    expect(falseGroup).toEqual([]);
  });

  it('should handle all falsy', () => {
    const items = [1, 2, 3];
    const [trueGroup, falseGroup] = partition(items, (n) => n < 0);
    expect(trueGroup).toEqual([]);
    expect(falseGroup).toEqual([1, 2, 3]);
  });

  it('should handle falsy property values', () => {
    const items = [
      { name: 'John', flag: true },
      { name: 'Jane', flag: false },
      { name: 'Bob', flag: null },
    ];
    const [trueGroup, falseGroup] = partition(items, 'flag');
    expect(trueGroup).toHaveLength(1);
    expect(falseGroup).toHaveLength(2);
  });
});

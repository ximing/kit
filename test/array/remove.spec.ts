import { remove } from '../../src/array';

describe('remove', () => {
  it('should remove elements matching predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const removed = remove(arr, (item) => item > 3);
    expect(removed).toEqual([4, 5]);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('should return removed elements', () => {
    const arr = [1, 2, 3];
    const removed = remove(arr, (item) => item === 2);
    expect(removed).toEqual([2]);
  });

  it('should handle no matches', () => {
    const arr = [1, 2, 3];
    const removed = remove(arr, (item) => item > 10);
    expect(removed).toEqual([]);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('should handle empty array', () => {
    const arr: number[] = [];
    const removed = remove(arr, (item) => item > 0);
    expect(removed).toEqual([]);
    expect(arr).toEqual([]);
  });

  it('should pass index to predicate', () => {
    const arr = [10, 20, 30];
    remove(arr, (item, index) => index === 1);
    expect(arr).toEqual([10, 30]);
  });

  it('should handle non-array input', () => {
    expect(remove(null as any, (item) => true)).toEqual([]);
  });
});

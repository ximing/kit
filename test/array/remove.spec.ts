import { describe, expect, it } from 'vitest';
import { remove } from '../../src/array/remove';

describe('remove', () => {
  it('returns matching items and does not mutate the input', () => {
    const arr = [1, 2, 3, 4, 5];
    const snapshot = [...arr];
    expect(remove(arr, (item) => item > 3)).toEqual([4, 5]);
    expect(arr).toEqual(snapshot);
  });

  it('returns an empty array when nothing matches', () => {
    const arr = [1, 2, 3];
    expect(remove(arr, (item) => item > 10)).toEqual([]);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('returns an empty array for empty input', () => {
    expect(remove([], (item) => item > 0)).toEqual([]);
  });

  it('passes index to the predicate', () => {
    const arr = [10, 20, 30];
    expect(remove(arr, (_item, index) => index === 1)).toEqual([20]);
    expect(arr).toEqual([10, 20, 30]);
  });

  it('returns [] for non-array input', () => {
    expect(remove(null as unknown as number[], () => true)).toEqual([]);
  });
});

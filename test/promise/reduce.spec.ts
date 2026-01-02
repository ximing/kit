import { reduce, delay } from '../../src/promise';

describe('reduce', () => {
  it('should reduce array to single value', async () => {
    const result = await reduce(
      [1, 2, 3, 4],
      (acc, value) => acc + value,
      0
    );
    expect(result).toBe(10);
  });

  it('should reduce with async reducer', async () => {
    const result = await reduce(
      [1, 2, 3, 4],
      (acc, value) => Promise.resolve(acc + value),
      0
    );
    expect(result).toBe(10);
  });

  it('should handle empty array', async () => {
    const result = await reduce([], (acc, value) => acc + value, 0);
    expect(result).toBe(0);
  });

  it('should use initial value', async () => {
    const result = await reduce(
      [1, 2, 3],
      (acc, value) => acc + value,
      10
    );
    expect(result).toBe(16);
  });

  it('should pass index to reducer', async () => {
    const indices: number[] = [];
    await reduce(
      [10, 20, 30],
      (acc, _, index) => {
        indices.push(index);
        return acc;
      },
      0
    );
    expect(indices).toEqual([0, 1, 2]);
  });

  it('should reduce to array', async () => {
    const result = await reduce(
      [1, 2, 3],
      (acc, value) => [...acc, value * 2],
      []
    );
    expect(result).toEqual([2, 4, 6]);
  });

  it('should reduce to object', async () => {
    const result = await reduce(
      [1, 2, 3],
      (acc, value) => ({ ...acc, [value]: value * 2 }),
      {}
    );
    expect(result).toEqual({ 1: 2, 2: 4, 3: 6 });
  });

  it('should handle async operations in reducer', async () => {
    const result = await reduce(
      [1, 2, 3],
      async (acc, value) => {
        await delay(10);
        return acc + value;
      },
      0
    );
    expect(result).toBe(6);
  });

  it('should reject on error', async () => {
    const reducer = (acc: number, value: number) => {
      if (value === 2) {
        return Promise.reject(new Error('error on 2'));
      }
      return Promise.resolve(acc + value);
    };
    await expect(reduce([1, 2, 3], reducer, 0)).rejects.toThrow('error on 2');
  });

  it('should handle single element', async () => {
    const result = await reduce([5], (acc, value) => acc + value, 10);
    expect(result).toBe(15);
  });

  it('should work with strings', async () => {
    const result = await reduce(
      ['a', 'b', 'c'],
      (acc, value) => acc + value,
      ''
    );
    expect(result).toBe('abc');
  });

  it('should work with objects', async () => {
    const items = [
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 3, value: 30 },
    ];
    const result = await reduce(
      items,
      (acc, item) => acc + item.value,
      0
    );
    expect(result).toBe(60);
  });

  it('should accumulate in order', async () => {
    const result = await reduce(
      [1, 2, 3, 4],
      (acc, value) => [...acc, value],
      []
    );
    expect(result).toEqual([1, 2, 3, 4]);
  });
});
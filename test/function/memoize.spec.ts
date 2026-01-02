import { memoize } from '../../src/function';

describe('memoize', () => {
  it('should memoize function results', () => {
    let callCount = 0;
    const memoized = memoize((n: number) => {
      callCount++;
      return n * 2;
    });

    expect(memoized(2)).toBe(4);
    expect(callCount).toBe(1);

    expect(memoized(2)).toBe(4);
    expect(callCount).toBe(1);

    expect(memoized(3)).toBe(6);
    expect(callCount).toBe(2);
  });

  it('should work with custom resolver', () => {
    let callCount = 0;
    const memoized = memoize(
      (a: number, b: number) => {
        callCount++;
        return a + b;
      },
      (a: number, b: number) => `${a}-${b}`,
    );

    expect(memoized(1, 2)).toBe(3);
    expect(callCount).toBe(1);

    expect(memoized(1, 2)).toBe(3);
    expect(callCount).toBe(1);

    expect(memoized(2, 1)).toBe(3);
    expect(callCount).toBe(2);
  });

  it('should expose cache property', () => {
    const memoized = memoize((n: number) => n * 2);

    memoized(2);
    expect(memoized.cache.has(2)).toBe(true);
    expect(memoized.cache.get(2)).toBe(4);
  });

  it('should preserve this context', () => {
    const obj = {
      multiplier: 3,
      multiply: memoize(function (this: any, n: number) {
        return n * this.multiplier;
      }),
    };

    expect(obj.multiply(2)).toBe(6);
    expect(obj.multiply(2)).toBe(6);
  });
});

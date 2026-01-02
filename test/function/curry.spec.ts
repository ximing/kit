import { curry } from '../../src/function';

describe('curry', () => {
  it('should curry a function', () => {
    const add = (a: number, b: number, c: number) => a + b + c;
    const curried = curry(add);

    expect(curried(1)(2)(3)).toBe(6);
    expect(curried(1, 2)(3)).toBe(6);
    expect(curried(1)(2, 3)).toBe(6);
    expect(curried(1, 2, 3)).toBe(6);
  });

  it('should work with custom arity', () => {
    const fn = (...args: number[]) => args.reduce((a, b) => a + b, 0);
    const curried = curry(fn, 3);

    expect(curried(1)(2)(3)).toBe(6);
    expect(curried(1, 2)(3)).toBe(6);
  });

  it('should preserve this context', () => {
    function add(this: any, a: number, b: number) {
      return (a + b) * this.multiplier;
    }
    const obj = {
      multiplier: 2,
      add: curry(add),
    };

    expect(obj.add.call(obj, 1, 2)).toBe(6);
  });
});

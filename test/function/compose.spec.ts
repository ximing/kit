import { compose } from '../../src/function';

describe('compose', () => {
  it('should compose functions from right to left', () => {
    const add1 = (x: number) => x + 1;
    const multiply2 = (x: number) => x * 2;
    const composed = compose(add1, multiply2);

    expect(composed(5)).toBe(11); // multiply2(5) = 10, add1(10) = 11
  });

  it('should work with string functions', () => {
    const toUpper = (str: string) => str.toUpperCase();
    const exclaim = (str: string) => `${str}!`;
    const shout = compose(exclaim, toUpper);

    expect(shout('hello')).toBe('HELLO!');
  });

  it('should work with single function', () => {
    const add1 = (x: number) => x + 1;
    const composed = compose(add1);

    expect(composed(5)).toBe(6);
  });

  it('should work with no functions', () => {
    const composed = compose();
    expect(composed(5)).toBe(5);
  });

  it('should work with multiple functions', () => {
    const add1 = (x: number) => x + 1;
    const multiply2 = (x: number) => x * 2;
    const subtract3 = (x: number) => x - 3;
    const composed = compose(add1, multiply2, subtract3);

    expect(composed(5)).toBe(5); // subtract3(5) = 2, multiply2(2) = 4, add1(4) = 5
  });
});

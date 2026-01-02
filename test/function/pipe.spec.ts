import { pipe } from '../../src/function';

describe('pipe', () => {
  it('should pipe functions from left to right', () => {
    const add1 = (x: number) => x + 1;
    const multiply2 = (x: number) => x * 2;
    const piped = pipe(add1, multiply2);

    expect(piped(5)).toBe(12); // add1(5) = 6, multiply2(6) = 12
  });

  it('should work with string functions', () => {
    const toUpper = (str: string) => str.toUpperCase();
    const exclaim = (str: string) => `${str}!`;
    const shout = pipe(toUpper, exclaim);

    expect(shout('hello')).toBe('HELLO!');
  });

  it('should work with single function', () => {
    const add1 = (x: number) => x + 1;
    const piped = pipe(add1);

    expect(piped(5)).toBe(6);
  });

  it('should work with no functions', () => {
    const piped = pipe();
    expect(piped(5)).toBe(5);
  });

  it('should work with multiple functions', () => {
    const add1 = (x: number) => x + 1;
    const multiply2 = (x: number) => x * 2;
    const subtract3 = (x: number) => x - 3;
    const piped = pipe(add1, multiply2, subtract3);

    expect(piped(5)).toBe(9); // add1(5) = 6, multiply2(6) = 12, subtract3(12) = 9
  });
});
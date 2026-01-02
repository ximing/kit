import { partial } from '../../src/function';

describe('partial', () => {
  it('should partially apply arguments', () => {
    const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
    const sayHelloTo = partial(greet, 'Hello');

    expect(sayHelloTo('Alice')).toBe('Hello, Alice!');
    expect(sayHelloTo('Bob')).toBe('Hello, Bob!');
  });

  it('should work with multiple partial arguments', () => {
    const add = (a: number, b: number, c: number) => a + b + c;
    const add5and10 = partial(add, 5, 10);

    expect(add5and10(15)).toBe(30);
  });

  it('should preserve this context', () => {
    const obj = {
      multiplier: 2,
      add: function (a: number, b: number) {
        return (a + b) * (this as any).multiplier;
      },
    };

    const partialAdd = partial(obj.add.bind(obj), 5);
    expect(partialAdd(10)).toBe(30);
  });
});
import { bind } from '../../src/function';

describe('bind', () => {
  it('should bind this context', () => {
    const obj = {
      name: 'Alice',
      greet(greeting: string) {
        return `${greeting}, ${(this as any).name}!`;
      },
    };

    const boundGreet = bind(obj.greet, obj, 'Hello');
    expect(boundGreet()).toBe('Hello, Alice!');
  });

  it('should work with partial arguments', () => {
    function add(this: { base: number }, a: number, b: number) {
      return this.base + a + b;
    }

    const obj = { base: 10 };
    const boundAdd = bind(add, obj, 5);

    expect(boundAdd(3)).toBe(18);
  });

  it('should work without partial arguments', () => {
    function getValue(this: { value: number }) {
      return this.value;
    }

    const obj = { value: 42 };
    const boundGetValue = bind(getValue, obj);

    expect(boundGetValue()).toBe(42);
  });
});

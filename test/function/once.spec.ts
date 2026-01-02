import { once } from '../../src/function';

describe('once', () => {
  it('should only call function once', () => {
    let callCount = 0;
    const increment = once(() => {
      callCount++;
    });

    increment();
    increment();
    increment();

    expect(callCount).toBe(1);
  });

  it('should return the result of the first call', () => {
    const getValue = once(() => 42);

    expect(getValue()).toBe(42);
    expect(getValue()).toBe(42);
    expect(getValue()).toBe(42);
  });

  it('should work with arguments', () => {
    const add = once((a: number, b: number) => a + b);

    expect(add(1, 2)).toBe(3);
    expect(add(3, 4)).toBe(3); // Still returns 3
  });

  it('should preserve this context', () => {
    const obj = {
      value: 42,
      getValue: once(function (this: any) {
        return this.value;
      }),
    };

    expect(obj.getValue()).toBe(42);
    expect(obj.getValue()).toBe(42);
  });
});

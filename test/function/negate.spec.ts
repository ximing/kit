import { negate } from '../../src/function';

describe('negate', () => {
  it('should negate a predicate', () => {
    const isEven = (n: number) => n % 2 === 0;
    const isOdd = negate(isEven);

    expect(isOdd(3)).toBe(true);
    expect(isOdd(4)).toBe(false);
  });

  it('should work with filter', () => {
    const users = [
      { name: 'Alice', active: true },
      { name: 'Bob', active: false },
      { name: 'Charlie', active: true },
    ];

    const isActive = (user: (typeof users)[0]) => user.active;
    const inactiveUsers = users.filter(negate(isActive));

    expect(inactiveUsers).toEqual([{ name: 'Bob', active: false }]);
  });

  it('should preserve this context', () => {
    const obj = {
      threshold: 5,
      isAboveThreshold: function (this: any, n: number) {
        return n > this.threshold;
      },
    };

    const isBelowOrEqual = negate(obj.isAboveThreshold.bind(obj));
    expect(isBelowOrEqual(3)).toBe(true);
    expect(isBelowOrEqual(7)).toBe(false);
  });
});

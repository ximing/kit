import { debounce } from '../../src/function';

describe('debounce', () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should debounce a function', () => {
    let callCount = 0;
    const debounced = debounce(() => {
      callCount++;
    }, 100);

    debounced();
    debounced();
    debounced();

    expect(callCount).toBe(0);

    jest.advanceTimersByTime(100);
    expect(callCount).toBe(1);
  });

  it('should debounce with leading option', () => {
    let callCount = 0;
    const debounced = debounce(
      () => {
        callCount++;
      },
      100,
      { leading: true, trailing: false },
    );

    debounced();
    expect(callCount).toBe(1);

    debounced();
    debounced();
    expect(callCount).toBe(1);

    jest.advanceTimersByTime(100);
    expect(callCount).toBe(1);
  });

  it('should debounce with trailing option', () => {
    let callCount = 0;
    const debounced = debounce(
      () => {
        callCount++;
      },
      100,
      { leading: false, trailing: true },
    );

    debounced();
    expect(callCount).toBe(0);

    jest.advanceTimersByTime(100);
    expect(callCount).toBe(1);
  });

  it('should support maxWait option', () => {
    let callCount = 0;
    const debounced = debounce(
      () => {
        callCount++;
      },
      100,
      { maxWait: 150 },
    );

    debounced();
    jest.advanceTimersByTime(50);

    debounced();
    jest.advanceTimersByTime(50);

    debounced();
    jest.advanceTimersByTime(50);

    expect(callCount).toBe(1);
  });

  it('should support cancel method', () => {
    let callCount = 0;
    const debounced = debounce(() => {
      callCount++;
    }, 100);

    debounced();
    debounced.cancel();

    jest.advanceTimersByTime(100);
    expect(callCount).toBe(0);
  });

  it('should support flush method', () => {
    let callCount = 0;
    const debounced = debounce(() => {
      callCount++;
    }, 100);

    debounced();
    debounced.flush();

    expect(callCount).toBe(1);
  });

  it('should pass arguments to the debounced function', () => {
    let result = '';
    const debounced = debounce((str: string) => {
      result = str;
    }, 100);

    debounced('hello');
    jest.advanceTimersByTime(100);

    expect(result).toBe('hello');
  });

  it('should preserve this context', () => {
    const obj = {
      value: 42,
      getValue: debounce(function (this: any) {
        return this.value;
      }, 100),
    };

    obj.getValue();
    jest.advanceTimersByTime(100);

    expect(obj.getValue()).toBe(42);
  });

  it('should handle both leading and trailing', () => {
    let callCount = 0;
    const debounced = debounce(
      () => {
        callCount++;
      },
      100,
      { leading: true, trailing: true },
    );

    debounced();
    expect(callCount).toBe(1);

    debounced();
    jest.advanceTimersByTime(100);
    expect(callCount).toBe(2);
  });

  it('should handle maxWait with multiple calls', () => {
    let callCount = 0;
    const debounced = debounce(
      () => {
        callCount++;
      },
      50,
      { maxWait: 100 },
    );

    debounced();
    jest.advanceTimersByTime(40);

    debounced();
    jest.advanceTimersByTime(40);

    debounced();
    jest.advanceTimersByTime(40);

    expect(callCount).toBeGreaterThan(0);
  });

  it('should return result from function', () => {
    const debounced = debounce(() => 'result', 100);

    debounced();
    jest.advanceTimersByTime(100);

    expect(debounced()).toBe('result');
  });

  it('should flush when no timer is set', () => {
    const debounced = debounce(() => 'result', 100);
    expect(debounced.flush()).toBeUndefined();
  });

  it('should handle cancel without timer', () => {
    const debounced = debounce(() => 'result', 100);
    debounced.cancel(); // Should not throw
    expect(debounced.flush()).toBeUndefined();
  });

  it('should handle leading false and trailing false', () => {
    let callCount = 0;
    const debounced = debounce(
      () => {
        callCount++;
      },
      100,
      { leading: false, trailing: false },
    );

    debounced();
    jest.advanceTimersByTime(100);
    expect(callCount).toBe(0);
  });

  it('should handle time going backwards', () => {
    let callCount = 0;
    const debounced = debounce(() => {
      callCount++;
    }, 100);

    debounced();
    jest.advanceTimersByTime(50);

    debounced();
    jest.advanceTimersByTime(50);

    expect(callCount).toBe(0);

    jest.advanceTimersByTime(50);
    expect(callCount).toBe(1);
  });
});

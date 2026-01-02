import { throttle } from '../../src/function';

describe('throttle', () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should throttle a function', () => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 100);

    throttled();
    expect(callCount).toBe(1);

    throttled();
    throttled();

    jest.advanceTimersByTime(100);
    expect(callCount).toBe(2); // trailing edge fires

    throttled();
    expect(callCount).toBe(3); // leading edge of new window
  });

  it('should throttle with leading option', () => {
    let callCount = 0;
    const throttled = throttle(
      () => {
        callCount++;
      },
      100,
      { leading: true, trailing: false }
    );

    throttled();
    expect(callCount).toBe(1);

    throttled();
    throttled();
    expect(callCount).toBe(1);

    jest.advanceTimersByTime(100);
    expect(callCount).toBe(1);
  });

  it('should throttle with trailing option', () => {
    let callCount = 0;
    const throttled = throttle(
      () => {
        callCount++;
      },
      100,
      { leading: false, trailing: true }
    );

    throttled();
    expect(callCount).toBe(0);

    jest.advanceTimersByTime(100);
    expect(callCount).toBe(1);
  });

  it('should throttle with both leading and trailing', () => {
    let callCount = 0;
    const throttled = throttle(
      () => {
        callCount++;
      },
      100,
      { leading: true, trailing: true }
    );

    throttled();
    expect(callCount).toBe(1);

    throttled();
    jest.advanceTimersByTime(100);
    expect(callCount).toBe(2);
  });

  it('should support cancel method', () => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 100);

    throttled();
    expect(callCount).toBe(1);

    throttled();
    throttled.cancel();

    jest.advanceTimersByTime(100);
    expect(callCount).toBe(1);
  });

  it('should support flush method', () => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 100);

    throttled();
    expect(callCount).toBe(1);

    throttled();
    throttled.flush();

    expect(callCount).toBe(2);
  });

  it('should pass arguments to the throttled function', () => {
    let result = '';
    const throttled = throttle((str: string) => {
      result = str;
    }, 100);

    throttled('hello');
    expect(result).toBe('hello');
  });

  it('should preserve this context', () => {
    const obj = {
      value: 42,
      getValue: throttle(function (this: any) {
        return this.value;
      }, 100),
    };

    expect(obj.getValue()).toBe(42);
  });

  it('should flush when no timer is set', () => {
    const throttled = throttle(() => 'result', 100);
    expect(throttled.flush()).toBeUndefined();
  });

  it('should handle rapid successive calls', () => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 100);

    throttled();
    expect(callCount).toBe(1);

    for (let i = 0; i < 5; i++) {
      throttled();
    }

    jest.advanceTimersByTime(50);
    expect(callCount).toBe(1);

    jest.advanceTimersByTime(60);
    expect(callCount).toBe(2);
  });

  it('should handle leading false and trailing false', () => {
    let callCount = 0;
    const throttled = throttle(
      () => {
        callCount++;
      },
      100,
      { leading: false, trailing: false }
    );

    throttled();
    jest.advanceTimersByTime(100);
    expect(callCount).toBe(0);
  });

  it('should handle cancel without timer', () => {
    const throttled = throttle(() => 'result', 100);
    throttled.cancel(); // Should not throw
    expect(throttled.flush()).toBeUndefined();
  });

  it('should restart timer when needed', () => {
    let callCount = 0;
    const throttled = throttle(
      () => {
        callCount++;
      },
      100,
      { leading: false, trailing: true }
    );

    throttled();
    jest.advanceTimersByTime(50);

    throttled();
    jest.advanceTimersByTime(60);

    expect(callCount).toBe(1);
  });

  it('should handle shouldInvoke return false with timer restart', () => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 100);

    throttled(); // First call
    expect(callCount).toBe(1);

    jest.advanceTimersByTime(30);
    throttled(); // Should not invoke, timer restarts

    jest.advanceTimersByTime(30);
    throttled(); // Should not invoke, timer restarts again

    jest.advanceTimersByTime(50); // Total 110ms, timer expires
    expect(callCount).toBe(2);
  });
});
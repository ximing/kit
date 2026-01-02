/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds.
 *
 * @template T - The type of the function to throttle
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to (default: 0)
 * @param options - The options object
 * @param options.leading - Specify invoking on the leading edge of the timeout (default: true)
 * @param options.trailing - Specify invoking on the trailing edge of the timeout (default: true)
 * @returns Returns the new throttled function
 *
 * @example
 * const throttled = throttle(() => console.log('Hello'), 1000);
 * throttled(); // Logs 'Hello' immediately
 * throttled(); // Ignored
 * // After 1 second, next call will be allowed
 *
 * @example
 * // Without leading edge
 * const throttled = throttle(() => console.log('Hello'), 1000, { leading: false });
 * throttled(); // Waits 1 second before logging 'Hello'
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait = 0,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {},
): T & { cancel: () => void; flush: () => void } {
  const { leading = true, trailing = true } = options;

  let timerId: ReturnType<typeof setTimeout> | undefined;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;
  let lastArgs: any[] | undefined;
  let lastThis: any;
  let result: any;

  function invokeFunc(time: number) {
    const args = lastArgs!;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastInvoke;

    return timeSinceLastCall < wait ? Math.min(timeWaiting, wait - timeSinceLastCall) : timeWaiting;
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `wait` limit.
    return (
      lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || timeSinceLastInvoke >= wait
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time: number) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // throttled at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function throttled(this: any, ...args: any[]) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      // Handle invocations in a tight loop.
      timerId = setTimeout(timerExpired, wait);
      return invokeFunc(lastCallTime);
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  throttled.cancel = cancel;
  throttled.flush = flush;

  return throttled as T & { cancel: () => void; flush: () => void };
}

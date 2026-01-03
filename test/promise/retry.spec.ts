import { retry, delay } from '../../src/promise';

describe('retry', () => {
  it('should succeed on first attempt', async () => {
    const fn = jest.fn().mockResolvedValue('success');
    const result = await retry(fn);
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry on failure and succeed', async () => {
    const fn = jest.fn().mockRejectedValueOnce(new Error('fail')).mockResolvedValueOnce('success');
    const result = await retry(fn, { maxAttempts: 3, delay: 10 });
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should fail after max attempts', async () => {
    const error = new Error('persistent failure');
    const fn = jest.fn().mockRejectedValue(error);
    await expect(retry(fn, { maxAttempts: 3, delay: 10 })).rejects.toThrow('persistent failure');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should use default maxAttempts of 3', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('fail'));
    await expect(retry(fn, { delay: 10 })).rejects.toThrow();
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should use default delay of 1000', async () => {
    const fn = jest.fn().mockRejectedValueOnce(new Error('fail')).mockResolvedValueOnce('success');
    const start = Date.now();
    await retry(fn, { maxAttempts: 2 });
    const elapsed = Date.now() - start;
    // Allow 50ms tolerance for system variance in CI environments
    expect(elapsed).toBeGreaterThanOrEqual(950);
  });

  it('should support exponential backoff', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValueOnce('success');
    const start = Date.now();
    await retry(fn, { maxAttempts: 4, delay: 50, backoff: 2 });
    const elapsed = Date.now() - start;
    // delay * (2^0 + 2^1) = 50 * 3 = 150, allow 20ms tolerance for CI environments
    expect(elapsed).toBeGreaterThanOrEqual(130);
  });

  it('should call onRetry callback on each retry', async () => {
    const onRetry = jest.fn();
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValueOnce('success');
    await retry(fn, { maxAttempts: 4, delay: 10, onRetry });
    expect(onRetry).toHaveBeenCalledTimes(2);
    expect(onRetry).toHaveBeenNthCalledWith(1, 1, expect.any(Error));
    expect(onRetry).toHaveBeenNthCalledWith(2, 2, expect.any(Error));
  });

  it('should handle non-async functions', async () => {
    let attempts = 0;
    const fn = () => {
      attempts++;
      if (attempts < 2) {
        throw new Error('fail');
      }
      return 'success';
    };
    const result = await retry(fn, { maxAttempts: 3, delay: 10 });
    expect(result).toBe('success');
  });

  it('should handle string errors', async () => {
    const fn = jest.fn().mockRejectedValue('string error');
    await expect(retry(fn, { maxAttempts: 2, delay: 10 })).rejects.toThrow('string error');
  });

  it('should handle object errors', async () => {
    const fn = jest.fn().mockRejectedValue({ code: 'ERR' });
    await expect(retry(fn, { maxAttempts: 2, delay: 10 })).rejects.toThrow();
  });
});
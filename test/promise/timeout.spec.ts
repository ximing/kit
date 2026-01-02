import { timeout, delay } from '../../src/promise';

describe('timeout', () => {
  it('should resolve if promise settles within timeout', async () => {
    const promise = delay(50, 'result');
    const result = await timeout(promise, 200);
    expect(result).toBe('result');
  });

  it('should reject if promise exceeds timeout', async () => {
    const promise = delay(200);
    await expect(timeout(promise, 50)).rejects.toThrow('Promise timeout');
  });

  it('should use custom error message', async () => {
    const promise = delay(200);
    await expect(timeout(promise, 50, 'Custom timeout error')).rejects.toThrow(
      'Custom timeout error'
    );
  });

  it('should handle rejected promises', async () => {
    const promise = Promise.reject(new Error('original error'));
    await expect(timeout(promise, 200)).rejects.toThrow('original error');
  });

  it('should handle rejected promise before timeout', async () => {
    const promise = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(new Error('delayed error'));
      }, 50);
    });
    await expect(timeout(promise, 200)).rejects.toThrow('delayed error');
  });

  it('should handle zero timeout', async () => {
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('value'), 100);
    });
    await expect(timeout(promise, 0)).rejects.toThrow('Promise timeout');
  });

  it('should handle immediate rejection', async () => {
    const promise = Promise.reject(new Error('immediate error'));
    await expect(timeout(promise, 1000)).rejects.toThrow('immediate error');
  });

  it('should work with async functions', async () => {
    const asyncFn = async () => {
      await delay(50);
      return 'success';
    };
    const result = await timeout(asyncFn(), 200);
    expect(result).toBe('success');
  });

  it('should timeout async functions', async () => {
    const asyncFn = async () => {
      await delay(200);
      return 'success';
    };
    await expect(timeout(asyncFn(), 50)).rejects.toThrow('Promise timeout');
  });
});
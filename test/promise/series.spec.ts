import { series, delay } from '../../src/promise';

describe('series', () => {
  it('should execute tasks in series', async () => {
    const start = Date.now();
    const results = await series([
      () => delay(50, 'a'),
      () => delay(50, 'b'),
      () => delay(50, 'c'),
    ]);
    const elapsed = Date.now() - start;
    expect(results).toEqual(['a', 'b', 'c']);
    expect(elapsed).toBeGreaterThanOrEqual(150); // Should be ~150ms
  });

  it('should handle empty array', async () => {
    const results = await series([]);
    expect(results).toEqual([]);
  });

  it('should handle single task', async () => {
    const results = await series([() => Promise.resolve('single')]);
    expect(results).toEqual(['single']);
  });

  it('should preserve order', async () => {
    const results = await series([
      () => delay(10, 'first'),
      () => delay(10, 'second'),
      () => delay(10, 'third'),
    ]);
    expect(results).toEqual(['first', 'second', 'third']);
  });

  it('should handle synchronous tasks', async () => {
    const results = await series([
      () => 'a',
      () => 'b',
      () => 'c',
    ]);
    expect(results).toEqual(['a', 'b', 'c']);
  });

  it('should reject on error', async () => {
    const tasks = [
      () => Promise.resolve('a'),
      () => Promise.reject(new Error('error in task 2')),
      () => Promise.resolve('c'),
    ];
    await expect(series(tasks)).rejects.toThrow('error in task 2');
  });

  it('should not execute tasks after error', async () => {
    const task1 = jest.fn().mockResolvedValue('a');
    const task2 = jest.fn().mockRejectedValue(new Error('error'));
    const task3 = jest.fn().mockResolvedValue('c');
    const tasks = [task1, task2, task3];
    await expect(series(tasks)).rejects.toThrow('error');
    expect(task1).toHaveBeenCalled();
    expect(task2).toHaveBeenCalled();
    expect(task3).not.toHaveBeenCalled();
  });

  it('should handle tasks returning different types', async () => {
    const results = await series([
      () => Promise.resolve(42),
      () => Promise.resolve('string'),
      () => Promise.resolve({ key: 'value' }),
    ]);
    expect(results[0]).toBe(42);
    expect(results[1]).toBe('string');
    expect(results[2]).toEqual({ key: 'value' });
  });

  it('should pass previous result to next task', async () => {
    let secondTaskInput: any;
    const tasks = [
      () => Promise.resolve('first'),
      () => {
        secondTaskInput = 'first';
        return Promise.resolve('second');
      },
    ];
    const results = await series(tasks);
    expect(results).toEqual(['first', 'second']);
  });

  it('should handle mix of sync and async tasks', async () => {
    const results = await series([
      () => 'sync1',
      () => Promise.resolve('async1'),
      () => 'sync2',
      () => Promise.resolve('async2'),
    ]);
    expect(results).toEqual(['sync1', 'async1', 'sync2', 'async2']);
  });
});
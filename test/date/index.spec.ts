import * as dateModule from '../../src/date';

describe('date module exports', () => {
  it('should export all date functions', () => {
    expect(typeof dateModule.format).toBe('function');
    expect(typeof dateModule.parse).toBe('function');
    expect(typeof dateModule.addDays).toBe('function');
    expect(typeof dateModule.addMonths).toBe('function');
    expect(typeof dateModule.addYears).toBe('function');
    expect(typeof dateModule.diffDays).toBe('function');
    expect(typeof dateModule.diffMonths).toBe('function');
    expect(typeof dateModule.diffYears).toBe('function');
    expect(typeof dateModule.startOfDay).toBe('function');
    expect(typeof dateModule.endOfDay).toBe('function');
  });

  it('should have correct number of exports', () => {
    const exports = Object.keys(dateModule);
    expect(exports.length).toBe(10);
  });
});

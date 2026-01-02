import { template } from '../../src/string/template';

describe('template', () => {
  it('should replace <%= placeholder %> style', () => {
    expect(template('Hello <%= name %>', { name: 'World' })).toBe('Hello World');
    expect(template('<%= greeting %>, <%= name %>!', { greeting: 'Hi', name: 'John' })).toBe('Hi, John!');
  });

  it('should replace ${ placeholder } style', () => {
    expect(template('Hello ${name}', { name: 'World' })).toBe('Hello World');
    expect(template('${greeting}, ${name}!', { greeting: 'Hi', name: 'John' })).toBe('Hi, John!');
  });

  it('should replace { placeholder } style', () => {
    expect(template('Hello {name}', { name: 'World' })).toBe('Hello World');
    expect(template('{greeting}, {name}!', { greeting: 'Hi', name: 'John' })).toBe('Hi, John!');
  });

  it('should handle missing placeholder values', () => {
    expect(template('Hello <%= name %>', {})).toBe('Hello ');
    expect(template('Hello ${name}', {})).toBe('Hello ');
    expect(template('Hello {name}', {})).toBe('Hello ');
  });

  it('should handle mixed placeholder styles', () => {
    expect(template('<%= a %> ${b} {c}', { a: '1', b: '2', c: '3' })).toBe('1 2 3');
  });

  it('should handle whitespace in placeholders', () => {
    expect(template('Hello <%=  name  %>', { name: 'World' })).toBe('Hello World');
    expect(template('Hello ${  name  }', { name: 'World' })).toBe('Hello World');
    expect(template('Hello {  name  }', { name: 'World' })).toBe('Hello World');
  });

  it('should handle empty string', () => {
    expect(template('')).toBe('');
    expect(template('', { name: 'World' })).toBe('');
  });

  it('should handle string without placeholders', () => {
    expect(template('Hello World', { name: 'John' })).toBe('Hello World');
  });

  it('should handle no data object', () => {
    expect(template('Hello <%= name %>')).toBe('Hello <%= name %>');
    expect(template('Hello ${name}')).toBe('Hello ${name}');
  });

  it('should convert values to string', () => {
    expect(template('Number: <%= num %>', { num: 42 })).toBe('Number: 42');
    expect(template('Boolean: ${bool}', { bool: true })).toBe('Boolean: true');
  });

  it('should handle multiple occurrences of same placeholder', () => {
    expect(template('<%= x %> and <%= x %>', { x: 'same' })).toBe('same and same');
  });

  it('should handle non-string input', () => {
    expect(template(null as any)).toBe('');
    expect(template(undefined as any)).toBe('');
  });
});

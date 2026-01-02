# Contributing to @rabjs/kit

Thank you for your interest in contributing to @rabjs/kit! We welcome contributions from the community.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and the expected behavior**

### Pull Requests

- Fill in the required template
- Follow the TypeScript/JavaScript styleguides
- Include appropriate test cases
- Update documentation as needed
- End all files with a newline

## Development Setup

### Prerequisites

- Node.js >= 12
- pnpm >= 7

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/kit.git`
3. Navigate to the project: `cd kit`
4. Install dependencies: `pnpm install`
5. Create a feature branch: `git checkout -b feature/your-feature`

### Development Commands

```bash
# Install dependencies
pnpm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the project
npm run build

# Check code quality
npm run lint:check

# Fix code formatting
npm run prettier:fix

# Check code formatting
npm run prettier:check
```

## Making Changes

### Code Style

We follow these coding conventions:

- Use TypeScript for all new code
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions focused and single-purpose

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Testing

- Add tests for any new functionality
- Ensure all tests pass: `npm test`
- Maintain or improve code coverage (target: 90%+)
- Tests should be in `test/{module}/{functionName}.spec.ts`

### Documentation

- Update README.md if you add or change public APIs
- Add JSDoc comments to all functions
- Include usage examples in comments
- Update CHANGELOG.md with your changes

## Styleguides

### TypeScript/JavaScript

```typescript
// Good
export function chunk<T>(array: T[], size: number): T[][] {
  /**
   * Splits array into chunks of specified size
   * @param array - The array to chunk
   * @param size - The size of each chunk
   * @returns Array of chunks
   */
  // implementation
}

// Bad
export function chunk(arr, s) {
  // implementation
}
```

### Comments

- Use `//` for single-line comments
- Use `/** */` for JSDoc comments
- Keep comments concise and meaningful

### Function Organization

- Export functions from module index files
- Group related functions together
- Keep functions in alphabetical order within modules

## Testing Guidelines

### Test Structure

```typescript
describe('functionName', () => {
  it('should do something', () => {
    // test implementation
  });

  it('should handle edge cases', () => {
    // test implementation
  });

  it('should throw error on invalid input', () => {
    // test implementation
  });
});
```

### Test Coverage

- Aim for 90%+ coverage
- Test happy paths, edge cases, and error conditions
- Test with different input types
- Test with null/undefined values

## Pull Request Process

1. Update the CHANGELOG.md with notes on your changes
2. Update the README.md if needed
3. Ensure all tests pass: `npm test`
4. Ensure code quality checks pass: `npm run lint:check` and `npm run prettier:check`
5. Create a descriptive pull request
6. Link any related issues

## Additional Notes

### Issue and Pull Request Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

### Recognition

Contributors will be recognized in the README.md and CHANGELOG.md.

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

Thank you for contributing to @rabjs/kit! 🎉

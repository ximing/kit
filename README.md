# TypeDI

![Build Status](https://github.com/ximing/typedi/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/ximing/typedi/branch/develop/graph/badge.svg)](https://codecov.io/gh/ximing/typedi)
[![npm version](https://badge.fury.io/js/%40rabjs%2Ftypedi.svg)](https://badge.fury.io/js/%40rabjs%2Ftypedi)

TypeDI is a [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) tool for TypeScript and JavaScript. With it you can build well-structured and easily testable applications in Node or in the browser.

Main features includes:

- property based injection
- constructor based injection
- singleton and transient services
- support for multiple DI containers

## Installation

> Note: This installation guide is for usage with TypeScript, if you wish to use
> TypeDI without Typescript please read the documentation about how get started.

To start using TypeDI install the required packages via NPM:

```bash
npm install typedi reflect-metadata
```

Import the `reflect-metadata` package at the **first line** of your application:

```ts
import 'reflect-metadata';

// Your other imports and initialization code
// comes here after you imported the reflect-metadata package!
```

As a last step, you need to enable emitting decorator metadata in your Typescript config. Add these two lines to your `tsconfig.json` file under the `compilerOptions` key:

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

Now you are ready to use TypeDI with Typescript!

## Basic Usage

```ts
import { Container, Service } from 'typedi';

@Service()
class ExampleInjectedService {
  printMessage() {
    console.log('I am alive!');
  }
}

@Service()
class ExampleService {
  constructor(
    // because we annotated ExampleInjectedService with the @Service()
    // decorator TypeDI will automatically inject an instance of
    // ExampleInjectedService here when the ExampleService class is requested
    // from TypeDI.
    public injectedService: ExampleInjectedService,
  ) {}
}

const serviceInstance = Container.get(ExampleService);
// we request an instance of ExampleService from TypeDI

serviceInstance.injectedService.printMessage();
// logs "I am alive!" to the console
```

## Documentation

The detailed usage guide and API documentation for the project can be found:

- at [docs.typestack.community/typedi][docs-stable]
- in the `./docs` folder of the repository

[docs-stable]: https://docs.typestack.community/typedi/
[docs-development]: https://docs.typestack.community/typedi/v/develop/

## Contributing

Please read our [contributing guidelines](./CONTRIBUTING.md) to get started.

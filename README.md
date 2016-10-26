# cko-grid

Flexible React component for displaying grids of data.

# Development

The project follows the [Airbnb ESLint standards](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

# Dependencies

The dependencies for this project are installed using [Yarn](https://github.com/yarnpkg/yarn).

To add a dependency to the project, please use `yarn add <NPM package here>`.

# Build

To build the project:

 - Clone this repository.
 - In the root of the project, run `yarn install`.

To run the project in development mode, run `npm run dev`. This will run the project in watch mode.

To build the project for production, run `npm run build`.

# Testing

The project uses the following for testing:

 - [Jest](https://facebook.github.io/jest/) as a test runner/JS unit test library.
 - [Enzyme](https://github.com/airbnb/enzyme) to provide React-specfic testing utilities.
 - [Sinon](http://sinonjs.org/) to provide mocking.
 - [Chai](http://chaijs.com/) to allow multiple styles of assertion. If you want to use chai assertions in snapshot testing, include the following snippet in your test files:
```javascript
  import chaiJestSnapshot from "chai-jest-snapshot";

  chai.use(chaiJestSnapshot);
```

To run tests for the project, run `npm test`.

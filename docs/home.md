# Setup
This project uses the following tools for development and build for production.

- [Webpack](https://webpack.js.org/) and [webpack-dev-server](https://github.com/webpack/webpack-dev-server) for bundling and providing a development static server
- Hot module replacement for faster development and debugging
- Ecmascript latest
- [Babel](https://babeljs.io/) along with [babel-plugin-transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/) for supporting class properties
- [Jest](https://facebook.github.io/jest/) along with [enzyme](https://github.com/airbnb/enzyme) for unit and integration tests
- [cypress](https://www.cypress.io/) for end-to-end tests
- [ESLint](https://eslint.org/) along with [airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb) for JS linting
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) along with [commitizen](https://github.com/commitizen/cz-cli) for changelog automatic generation

# Tech stack

Several packages were used for this development. But the most important ones would be the following:

- [ReactJS](https://reactjs.org/) for building dynamic UI
- [Redux](https://redux.js.org/docs/introduction/) for state management
- [Proptypes](https://reactjs.org/docs/typechecking-with-proptypes.html) for type checking on each component's properties
- [styled-components](https://www.styled-components.com/) for styling

# Tests 
To run unit and integration tests, you'll need to run:  
`yarn test`

To run end-to-end tests, you'll need to run:  
`yarn test:e2e` - For this, you'll need the project being served at `localhost:8080` (`yarn start`)

To check the project's test coverage, you'll need to run:  
`yarn coverage` - this will serve the test coverage in your browser  
or  
`yarn test --coverage` - this will print the coverage report in the terminal

# Users feedback
As you may notice, the application displays a popup every time an error occurs and a progress bar is presented every time a new Ajax request is performed.

This is thanks to [redux middlewares](https://redux.js.org/docs/advanced/Middleware.html). Two custom middlewares were implemented to intercept every **pending** request and every **rejected ajax request**.

These MWs can be found here:  
* [error-handler](https://gitlab.com/orenciorodolfo/soccerama/blob/master/src/store/middlewares/error-handler.js)
* [pending-requests](https://gitlab.com/orenciorodolfo/soccerama/blob/master/src/store/middlewares/pending-requests.js)

# Offline first
For giving a better experience to the user and to achieve a faster access time to the page, a very simple [Service Worker](https://developer.mozilla.org/pt-PT/docs/Web/API/Service_Worker_API) was implemented.  
This is responsible for intercepting all the requests and decide which resources can be stored and loaded from the cache.

At this time, only the minimal resources needed to load the page (with no API data) are being stored. The SW implementation can be found [here](https://gitlab.com/orenciorodolfo/soccerama/blob/master/dist/sw.js).

# Changelog generation
Every project should have a changelog so every one can have an understanding about the project's evolution at each version.  
For that we have [commitizen](https://github.com/commitizen/cz-cli) along with [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) to automatically generate a changelog from the project's history.

To generate the changelog file you'll  need to run:  
`yarn changelog`
# Cloud Co Admin Dashboard

This project is part of the larger [Cloud Co Insurance Bot Demo](https://github.com/IBM-Bluemix/insurance-bot) project.

## Overview

This project is designed with a bunch of awesome new front-end technologies, all on top of a configurable, feature-rich webpack build system that's already setup to provide hot reloading, CSS modules with Sass support, unit testing, code coverage reports, bundle splitting, and a whole lot more, while providing amazing developer tools such as Redux CLI (a generator), Redux devtools (Chrome extension), and Storybook for visually developing and testing components.

## Requirements
* node `^4.2.0`
* npm `^3.0.0`

## Running Locally

### Install dependencies, and check to see it works
```bash
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
```
If everything works, you should see the following:

<img src="http://i.imgur.com/zR7VRG6.png?2" />

## Development

#### Developer Tools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn’t require installing any packages.

## Storybook
With Storybook, you can design and code components in isolation.
```
npm run storybook
```

## Testing
To add a unit test, simply create a `.test.js` file anywhere in `~/src`. Ava will pick up on these files automatically. If you are using `redux-cli`, test files should automatically be generated when you create a component or route. If you wish to change test file locations or settings you may do so within the `ava` object in `~/package.json`.

Coverage reports will be compiled to `~/coverage` by default. If you wish to change what reporters are used and where reports are compiled, you can do so by modifying the `nyc` object in `~/package.json`.

### Root Resolve
Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. Here's an example:

```js
// current file: ~/src/views/some/nested/View.js
// What used to be this:
import SomeComponent from '../../../components/SomeComponent'

// Can now be this, HORRAY!:
import SomeComponent from 'components/SomeComponent'
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/index.js`. When adding new globals, make sure you also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|
|`__DEBUG__`|True when `process.env.NODE_ENV` is `development` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)|
|`__BASENAME__`|[history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)|
|`__CONTROLLER_API__`|The API endpoint for the Logistics Wizard Controller. It is initialized from `process.env.CONTROLLER_SERVICE` variable specified as *https://host:port*. The Controller API prefix */api/v1/* is added automatically.|

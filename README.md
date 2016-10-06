# Cloud Insurance Co. - Admin Dashboard

| **master** | [![Build Status](https://travis-ci.org/IBM-Bluemix/insurance-bot-dashboard.svg?branch=master)](https://travis-ci.org/IBM-Bluemix/insurance-bot-dashboard) |
| ----- | ----- |
| **dev** | [![Build Status](https://travis-ci.org/IBM-Bluemix/insurance-bot-dashboard.svg?branch=dev)](https://travis-ci.org/IBM-Bluemix/insurance-bot-dashboard) |

This repository is part of the larger [Cloud Insurance Co.](https://github.com/IBM-Bluemix/cloudco-insurance) project.

## Overview

The admin dashboard provides [Cloud Insurance Co.](https://github.com/IBM-Bluemix/cloudco-insurance) administrators with an overview of the ongoing activities on the site. It starts with real-time view on the chat bot conversations providing admins with insights about the interactions between the chat bot and the visitors.

This project is designed with a bunch of awesome new front-end technologies, all on top of a configurable, feature-rich webpack build system that's already setup to provide hot reloading, CSS modules with Sass support, unit testing, code coverage reports, bundle splitting, and a whole lot more, while providing amazing developer tools such as Redux CLI (a generator), Redux devtools (Chrome extension), and Storybook for visually developing and testing components.

In order to deploy the full set of microservices involved, check out the [insurance-toolchain repo][toolchain_url]. Otherwise, you can deploy just the app by following the steps here.

## Requirements
* node `^4.2.0`
* npm `^3.0.0`

## Running the app on Bluemix

1. If you do not already have a Bluemix account, [sign up here][bluemix_reg_url]

1. Download and install the [Cloud Foundry CLI][cloud_foundry_url] tool

1. The app depends on the [main website app](https://github.com/IBM-Bluemix/insurance-bot). Make sure to deploy it first.

1. Clone the app to your local environment from your terminal using the following command:

  ```
  git clone https://github.com/IBM-Bluemix/insurance-bot-dashboard.git
  ```

1. `cd` into this newly created directory

1. Open the `manifest.yml` file and change the `host` value to something unique.

  The host you choose will determinate the subdomain of your application's URL:  `<host>.mybluemix.net`

1. Connect to Bluemix in the command line tool and follow the prompts to log in

  ```
  cf login -a https://api.ng.bluemix.net
  ```

1. Create a Watson Tone Analyzer service.

  ```
  cf create-service tone_analyzer standard insurance-tone_analyzer
  ```

1. Push the app to Bluemix

  ```
  cf push --no-start
  ```

1. Define a variable pointing to the main site deployment.

  ```
  cf set-env insurance-bot-dashboard SOCKET_URL https://your-insurance-bot.mybluemix.net
  ```

1. Start your app

  ```
  cf start insurance-bot-dashboard
  ```

And voila! You now have your very own instance of the app running on Bluemix.

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


[bluemix_reg_url]: http://ibm.biz/insurance-store-registration
[cloud_foundry_url]: https://github.com/cloudfoundry/cli

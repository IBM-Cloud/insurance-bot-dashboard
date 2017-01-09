# Cloud Insurance Co. - Admin Dashboard

<!-- No tests are set up currently
| **master** | [![Build Status](https://travis-ci.org/IBM-Bluemix/insurance-bot-dashboard.svg?branch=master)](https://travis-ci.org/IBM-Bluemix/insurance-bot-dashboard) |
| ----- | ----- |
| **dev** | [![Build Status](https://travis-ci.org/IBM-Bluemix/insurance-bot-dashboard.svg?branch=dev)](https://travis-ci.org/IBM-Bluemix/insurance-bot-dashboard) |
 -->

This repository is part of the larger [Cloud Insurance Co.](https://github.com/IBM-Bluemix/cloudco-insurance) project.

# Overview

The admin dashboard provides [Cloud Insurance Co.](https://github.com/IBM-Bluemix/cloudco-insurance) administrators with an overview of the ongoing activities on the site. It starts with real-time view on the chat bot conversations providing admins with insights about the interactions between the chat bot and the visitors.

This project is designed with a bunch of awesome new front-end technologies, all on top of a configurable, feature-rich webpack build system that's already setup to provide hot reloading, CSS modules with Sass support, unit testing, code coverage reports, bundle splitting, and a whole lot more, while providing amazing developer tools such as Redux CLI (a generator), Redux devtools (Chrome extension), and Storybook for visually developing and testing components.

In order to deploy the full set of microservices involved, check out the [insurance-toolchain repo][toolchain_url]. Otherwise, you can deploy just the app by following the steps here.

## Requirements
* node `^6.7.0`
* npm `^3.10.10`

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

1. Build the app web site

  ```
  npm install
  npm run deploy:prod
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

## Running the app locally

1. If you do not already have a Bluemix account, [sign up here][bluemix_reg_url]

1. Download and install the [Cloud Foundry CLI][cloud_foundry_url] tool

1. The app depends on the [main website app](https://github.com/IBM-Bluemix/insurance-bot). Make sure to deploy it first.

1. Clone the app to your local environment from your terminal using the following command:

  ```
  git clone https://github.com/IBM-Bluemix/insurance-bot-dashboard.git
  ```

1. `cd` into this newly created directory

1. Create a new Watson Tone Analyzer service named `insurance-tone_analyzer` using your Bluemix account

1. Replace the corresponding credentials for the `insurance-tone_analyzer` and `insurance-bot-db` services in your `vcap-local.json` file - using `vcap-local.template.json` as template file.

1. Define an environment variable pointing to the main site (which can be running locally or in Bluemix)

  ```
  export SOCKET_URL=https://localhost:6040
  ```

1. Install the required npm packages using the following command

  ```
  npm install
  ```

1. Start your app locally with the following command

  ```
  npm start
  ```

This command will start your Node.js web server and print the address where it is listening to requests in the console: `server starting on http://localhost:3000`.

<img src="http://i.imgur.com/zR7VRG6.png?2" />

## Development

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
|`__SOCKET_URL__`|The websocket endpoint for the main website. It is initialized from `process.env.SOCKET_URL` variable specified as *https://host:port*.|

## License

See [License.txt](License.txt) for license information.

# Privacy Notice

This application is configured to track deployments to [IBM Bluemix](http://www.ibm.com/cloud-computing/bluemix/) and other Cloud Foundry platforms. The following information is sent to a [Deployment Tracker](https://github.com/IBM-Bluemix/cf-deployment-tracker-service) service on each deployment:

* Node.js package version
* Node.js repository URL
* Application Name (`application_name`)
* Space ID (`space_id`)
* Application Version (`application_version`)
* Application URIs (`application_uris`)
* Labels of bound services
* Number of instances for each bound service and associated plan information

This data is collected from the `package.json` file in the application and the `VCAP_APPLICATION` and `VCAP_SERVICES` environment variables in IBM Bluemix and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Bluemix to measure the usefulness of our examples, so that we can continuously improve the content we offer to you. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

## Disabling Deployment Tracking

Deployment tracking can be disabled by removing `require('cf-deployment-tracker-client').track();` from the beginning of the `tracker.js` file.

[bluemix_reg_url]: http://ibm.biz/insurance-store-registration
[cloud_foundry_url]: https://github.com/cloudfoundry/cli

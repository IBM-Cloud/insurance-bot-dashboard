# Cloud Insurance Co. - Admin Dashboard

<!-- No tests are set up currently
| **master** | [![Build Status](https://travis-ci.org/IBM-Cloud/insurance-bot-dashboard.svg?branch=master)](https://travis-ci.org/IBM-Cloud/insurance-bot-dashboard) |
| ----- | ----- |
| **dev** | [![Build Status](https://travis-ci.org/IBM-Cloud/insurance-bot-dashboard.svg?branch=dev)](https://travis-ci.org/IBM-Cloud/insurance-bot-dashboard) |
 -->

This repository is part of the larger [Cloud Insurance Co.](https://github.com/IBM-Cloud/cloudco-insurance) project.

# Overview

The admin dashboard provides [Cloud Insurance Co.](https://github.com/IBM-Cloud/cloudco-insurance) administrators with an overview of the ongoing activities on the site. It starts with real-time view on the chat bot conversations providing admins with insights about the interactions between the chat bot and the visitors.

This project is designed with a bunch of awesome new front-end technologies, all on top of a configurable, feature-rich webpack build system that's already setup to provide hot reloading, CSS modules with Sass support, unit testing, code coverage reports, bundle splitting, and a whole lot more, while providing amazing developer tools such as Redux CLI (a generator), Redux devtools (Chrome extension), and Storybook for visually developing and testing components.

In order to deploy the full set of microservices involved, check out the [insurance-toolchain repo][toolchain_url]. Otherwise, you can deploy just the app by following the steps here.

## Requirements
* node `^6.7.0`
* npm `^3.10.10`

## Running the app on IBM Cloud

1. If you do not already have a IBM Cloud account, [sign up here][bluemix_reg_url]

2. Download and install the [IBM Cloud CLI][ibmcloud_cli_url] tool

3. The app depends on the [main website app](https://github.com/IBM-Cloud/insurance-bot). Make sure to deploy it first.

4. Clone the app to your local environment from your terminal using the following command:

    ```
    git clone https://github.com/IBM-Cloud/insurance-bot-dashboard.git
    ```

5. `cd` into this newly created directory

6. Open the `manifest.yml` file and change the `host` value to something unique.

  The host you choose will determinate the subdomain of your application's URL:  `<host>.mybluemix.net`

7. Connect to IBM Cloud in the command line tool and follow the prompts to log in.

    ```
    ibmcloud login
    ```
    Use `ibmcloud target --cf` to set org and space; Run `ibmcloud regions` to find API endpoints.

8. Create a Watson Tone Analyzer service.

    ```
    ibmcloud cf create-service tone_analyzer standard insurance-tone_analyzer
    ```

9. Build the app web site

    ```
    npm install
    npm run deploy:prod
    ```

10. Push the app to IBM Cloud

    ```
    ibmcloud cf push --no-start
    ```

11. Define a variable pointing to the main site deployment.

    ```
    ibmcloud cf set-env insurance-bot-dashboard SOCKET_URL https://your-insurance-bot.mybluemix.net
    ```

12. Start your app

    ```
    ibmcloud cf start insurance-bot-dashboard
    ```

And voila! You now have your very own instance of the app running on IBM Cloud.

## Running the app locally

1. If you do not already have a IBM Cloud account, [sign up here][bluemix_reg_url]

2. The app depends on the [main website app](https://github.com/IBM-Cloud/insurance-bot). Make sure to deploy it first.

3. Clone the app to your local environment from your terminal using the following command:

    ```
    git clone https://github.com/IBM-Cloud/insurance-bot-dashboard.git
    ```

4. `cd` into this newly created directory

5. Create a new Watson Tone Analyzer service named `insurance-tone_analyzer` using your IBM Cloud account

6. Replace the corresponding credentials for the `insurance-tone_analyzer` and `insurance-bot-db` services in your `vcap-local.json` file - using `vcap-local.template.json` as template file.

7. Define an environment variable pointing to the main site (which can be running locally or in IBM Cloud)

    ```
    export SOCKET_URL=https://localhost:6040
    ```

8. Install the required npm packages using the following command

    ```
    npm install
    ```

9. Start your app locally with the following command

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

## Cleanup
See the [**Cleanup** section in the toolchain repository](https://github.com/IBM-Cloud/insurance-toolchain#cleanup) for instructions on how to remove the resources associated with the entire project.

## License

See [License.txt](License.txt) for license information.

[bluemix_reg_url]: http://ibm.biz/insurance-store-registration
[ibmcloud_cli_url]: https://console.bluemix.net/docs/cli/reference/bluemix_cli/get_started.html#getting-started
[toolchain_url]: https://github.com/IBM-Cloud/insurance-toolchain

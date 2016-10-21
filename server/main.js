import Koa from 'koa';
import convert from 'koa-convert';
import webpack from 'webpack';
import historyApiFallback from 'koa-connect-history-api-fallback';
import serve from 'koa-static';
import proxy from 'koa-proxy';
import compress from 'koa-compress';
import _debug from 'debug';
import webpackConfig from '../config/webpack.config';
import config from '../config';
import logs from './logs.js';
import webpackDevMiddleware from './middleware/webpack-dev';
import webpackHMRMiddleware from './middleware/webpack-hmr';

const debug = _debug('app:server');
const paths = config.utils_paths;
const app = new Koa();
const _ = require('koa-route');

app.use(compress({
  filter: contentType => /js$|css$|json$/i.test(contentType),
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH,
}));

app.use(_.get('/chatlogs', logs.getAllLogs));
app.use(_.get('/deleteAllLogs', logs.deleteAllLogs));
app.use(_.get('/deleteLog/:conversationID', logs.deleteLog));
app.use(_.get('/tone/:conversationID', logs.tone));

//Redirect to HTTPS on Bluemix
app.use(_.get('/', function *(next) {
  if(this.request.headers['x-forwarded-proto']=='http'){ //this header won't be set locally.
    console.log("REDIRECTING TO HTTPS")
    this.response.redirect('https://'+this.request.hostname+this.request.url)
  }
  yield next;
}));

// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)));
}

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false,
})));


// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig);

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output;

  app.use(webpackDevMiddleware(compiler, publicPath));
  app.use(webpackHMRMiddleware(compiler));

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(serve(paths.client('static')));
}
else {
  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(serve(paths.dist()));
}

export default app;

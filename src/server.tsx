import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Express from 'express';
import webpack from 'webpack';
import path from 'path';
import React from 'react';
import store from './reducers/index';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';

import App from './App';

type State = ReturnType<typeof store.getState>;
const app = Express();
const port = 3000;

if(process.env.NODE_ENV==="development") {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config.js');

  webpackConfig[0].output.path = path.resolve(__dirname, '../public');

  const compiler = webpack(webpackConfig[0]);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig[0].output.publicPath,
    writeToDisk: true,
  }));
  app.use(webpackHotMiddleware(compiler, {
    path: "/__webpack_hmr",
    reload: true,
    heartbeat: 2000
  }));
}

//Serve static files
app.use('/static', Express.static('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req:Express.Request, res:Express.Response){
  const webStats = path.resolve(__dirname, '../public/loadable-stats.json');
  const webExtractor = new ChunkExtractor({statsFile:webStats, entrypoints:["client"]});

  const context = {};
  const html =  renderToString(webExtractor.collectChunks(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  ));

  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Redux Universal Example</title>
      ${webExtractor.getLinkTags()}
      ${webExtractor.getStyleTags()}
    </head>
    <body>
      <div id="root">${html}</div>
      ${webExtractor.getScriptTags()}
    </body>
  </html>
  `
  );
}

app.listen(port);
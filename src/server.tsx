import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Express from 'express';
import React from 'react';
import store from './reducers/index';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import App from './App';

type State = ReturnType<typeof store.getState>;
const app = Express();
const port = 3000;

//Serve static files
app.use('/static', Express.static('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req:Express.Request, res:Express.Response){
  const html = renderToString(
    <Provider store={store}>
      <App/>
    </Provider>
  );

  const preloadedState = store.getState();

  res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html:string, preloadedState:State) {
  return `
  <!doctype html>
  <html>
    <head>
      <title>Redux Universal Example</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/recipes/server-rendering/#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
          /</g,
          '\\u003c'
        )}
      </script>
      <script src="client.js"></script>
    </body>
  </html>
  `
}

app.listen(port);
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { hydrate } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import { RootReducer } from './reducers/index';

//extend global window property.
declare global {
    interface Window {
        __PRELOADED_STATE__:string;
    }
}
type State = ReturnType<typeof RootReducer>;

const preloadedState:State = JSON.parse(window.__PRELOADED_STATE__);

delete window.__PRELOADED_STATE__;

const store = createStore(RootReducer, preloadedState);

hydrate(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
import React from 'react';
import { hydrate } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {loadableReady} from '@loadable/component'
import App from './App';
import { RootReducer } from './reducers/index';

const store = createStore(RootReducer);

loadableReady(()=> {
    hydrate(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    );
});

if(module.hot) {
    module.hot.accept();
}
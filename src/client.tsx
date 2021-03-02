import React from 'react';
import { hydrate } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import { RootReducer } from './reducers/index';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const store = createStore(RootReducer);

loadableReady(()=> {
    hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
});

if(module.hot) {
    module.hot.accept();
}
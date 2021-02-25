import {combineReducers, createStore} from 'redux'
import TestReducer from './test/index';

export const RootReducer = combineReducers({
    test:TestReducer,
})

const store = createStore(RootReducer);

export default store;
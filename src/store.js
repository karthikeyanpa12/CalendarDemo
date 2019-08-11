import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

let initialState = {};

const store = createStore(
    reducers, initialState,
    applyMiddleware(thunk)
);

export default store;
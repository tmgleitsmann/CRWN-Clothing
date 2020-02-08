import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger]; // this is our redux-logger middleware that we're storing inside of an array

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
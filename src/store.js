import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router'
import { apply } from 'ramda';

const logger = createLogger();

const isProd = process.env.NODE_ENV === 'production';

const middlewares = [thunk, routerMiddleware(browserHistory)];

if (!isProd) {
  middlewares.push(logger);
}

export function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [
    apply(applyMiddleware)(middlewares),
  ];

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default configureStore;

import { createStore, compose, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import createLogger from 'redux-logger';
import rootReducer from './ducks';
import { toastr } from 'react-redux-toastr';

const logger = createLogger();

export const history = createBrowserHistory({
  getUserConfirmation: (message, callback) =>
    toastr.confirm(message, {
      onOk: () => callback(true),
      onCancel: () => callback(false),
    }),
});

const configureStoreProd = initialState => {
  const middlewares = [routerMiddleware(history), thunk];

  return createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(applyMiddleware(...middlewares))
  );
};

const configureStoreDev = initialState => {
  const middlewares = [
    reduxImmutableStateInvariant(),
    routerMiddleware(history),
    thunk,
    logger,
  ];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept('./ducks', () => {
      const nextRootReducer = require('./ducks').default;
      store.replaceReducer(connectRouter(history)(nextRootReducer));
    });
  }

  return store;
};

export const configureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export default configureStore;

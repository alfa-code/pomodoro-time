import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'src/reducers/index';
import createSagaMiddleware from 'redux-saga';
import sagaWatcher from 'src/sagas/sagas';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// create redux logger
const logger = createLogger({
  collapsed: true
});

// compose middleware
const myMiddlewares = compose(
  applyMiddleware(ReduxThunk, sagaMiddleware, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

/* eslint no-underscore-dangle: 0 */
const store = createStore(
  rootReducer,
  myMiddlewares
);

// then run the saga
sagaMiddleware.run(sagaWatcher);

export default store;

import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import {
    createLogger
} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'Src/reducers/index';
import sagaWatcher from 'Src/sagas/sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// create redux logger
const logger = createLogger({
    collapsed: true
});

// compose middleware
const myMiddlewares = compose(
    applyMiddleware(ReduxThunk, sagaMiddleware, logger),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* eslint no-underscore-dangle: 0 */
const store = createStore(
    rootReducer,
    myMiddlewares
);

// then run the saga
sagaMiddleware.run(sagaWatcher);

export default store;

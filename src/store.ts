import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import {
    createLogger
} from 'redux-logger';
// import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'Src/reducers/index';
import sagaWatcher from 'Src/sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const reduxLogger = createLogger({
    collapsed: true
});

const composedMiddlewares = compose(
    applyMiddleware(
        // ReduxThunk,
        sagaMiddleware,
        reduxLogger
    ),
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* eslint no-underscore-dangle: 0 */
const store = createStore(
    rootReducer,
    composedMiddlewares,
);

sagaMiddleware.run(sagaWatcher);

export default store;

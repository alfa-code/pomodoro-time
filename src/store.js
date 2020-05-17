import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import rootReducer from 'src/reducers/index';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from 'src/sagas/rootSaga';
import {
    createLogger
} from 'redux-logger';
import ReduxThunk from 'redux-thunk';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// create redux logger
const logger = createLogger({
    collapsed: true
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// compose middleware
const middlewares = composeEnhancers(
    applyMiddleware(ReduxThunk, sagaMiddleware, logger),
);

/* eslint no-underscore-dangle: 0 */
const store = createStore(
    rootReducer,
    middlewares
);

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;

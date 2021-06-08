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
import { rootSaga } from 'Src/sagas/root.saga';

export type Store = ReturnType<typeof rootReducer>;;

const sagaMiddleware = createSagaMiddleware();

const reduxLogger = createLogger({
    collapsed: true
});

const middlewaresForCompose = [
    applyMiddleware(
        // ReduxThunk,
        sagaMiddleware,
        reduxLogger
    ),
]

// const composedMiddlewares = compose(
//     applyMiddleware(
//         // ReduxThunk,
//         sagaMiddleware,
//         reduxLogger
//     ),
//     // @ts-ignore
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

let composedMiddlewares;
// @ts-ignore
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    composedMiddlewares = compose(
        applyMiddleware(
            // ReduxThunk,
            sagaMiddleware,
            reduxLogger
        ),
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
} else {
    composedMiddlewares = applyMiddleware(
        // ReduxThunk,
        sagaMiddleware,
        reduxLogger
    );
}

/* eslint no-underscore-dangle: 0 */
const store = createStore(
    rootReducer,
    composedMiddlewares,
);

sagaMiddleware.run(rootSaga);

export default store;

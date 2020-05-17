import { all } from "redux-saga/effects";

import { sagaWatcher } from './common';
import { watchTimer } from './timer-v2';

export function* rootSaga() {
    yield all([
        sagaWatcher(),
        watchTimer()
    ])
}

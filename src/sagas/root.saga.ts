import { all } from 'redux-saga/effects';

import { soundSaga } from 'Src/sagas/sound.saga';
import { timerSaga } from 'Src/sagas/timer.saga';

export function* rootSaga() {
    yield all([
        soundSaga(),
        timerSaga(),
    ])
}

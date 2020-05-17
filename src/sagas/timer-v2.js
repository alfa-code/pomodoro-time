import { call, put, takeEvery, takeLatest, delay, all } from "redux-saga/effects";

import TimerWorker from 'src/app/workers/timer-v2.worker';

const worker = new TimerWorker();

worker.postMessage('hello worker: said main thread');
// worker.onmessage = function (event) {};
worker.addEventListener("message", function (e) {
    console.log('e.data', e.data);
});

function* incrementAsync() {
    yield delay(1000)
    yield put({ type: 'INCREMENT' })
}

export function* watchTimer() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

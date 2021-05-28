import { takeLatest, put } from 'redux-saga/effects';

import TimerWorker from 'Src/workers/timer.worker';

import * as constants from 'Src/constants';

import { setTimerSettings, dispatchPlayAudioNotification } from 'Src/actions';

let timerWorker: Worker;

function* initTimerWorker() {
    timerWorker = new TimerWorker();

    timerWorker.onmessage = (event: any) => {
        const { type, payload } = event.data;
        switch (type) {
            case 'time': {
                const { minutes, seconds } = payload;
                setTimerSettings({
                    time: {
                        minutes,
                        seconds
                    }
                });
                break;
            }
            case 'phase': {
                const { phase } = payload;
                setTimerSettings({
                    timerPhase: phase
                });
                break;
            }
            case 'pomodoroPhase': {
                const { pomodoroPhase } = payload;
                setTimerSettings({
                    pomodoroPhase,
                });
                dispatchPlayAudioNotification();
                break;
            }
            default: {}
        }
    };
}

function* startTimer() {
    timerWorker.postMessage({
        type: 'action',
        payload: {
            command: 'start',
        },
    });
}

function* pauseTimer() {
    timerWorker.postMessage({
        type: 'action',
        payload: {
            command: 'pause',
        },
    });
}

function* resumeTimer() {
    timerWorker.postMessage({
        type: 'action',
        payload: {
            command: 'resume',
        },
    });
}


function* reloadTimer() {
    timerWorker.postMessage({
        type: 'action',
        payload: {
            command: 'reload',
        },
    });
}

export function* timerSaga() {
   yield takeLatest(constants.INIT_TIMER, initTimerWorker);
   yield takeLatest(constants.START_TIMER, startTimer);
   yield takeLatest(constants.PAUSE_TIMER, pauseTimer);
   yield takeLatest(constants.RESUME_TIMER, resumeTimer);
   yield takeLatest(constants.RELOAD_TIMER, reloadTimer);
}

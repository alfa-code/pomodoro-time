import { takeLatest, put } from 'redux-saga/effects';

import TimerWorker from 'Src/workers/timer.worker';

import * as constants from 'Src/constants';

import { dispatchTimerSettings, dispatchPlayAudioNotification } from 'Src/actions';
import { setTimerWorkerSettingsAC } from 'Src/actions/timer';

let timerWorker: Worker;

function* initTimerWorker(action: any) {
    const { payload: options } = action;

    timerWorker = new TimerWorker();

    timerWorker.onmessage = (event: any) => {
        const { type, payload } = event.data;
        switch (type) {
            case 'time': {
                const { minutes, seconds } = payload;
                dispatchTimerSettings({
                    time: {
                        minutes,
                        seconds
                    }
                });
                break;
            }
            case 'phase': {
                const { phase } = payload;
                dispatchTimerSettings({
                    timerPhase: phase
                });
                break;
            }
            case 'pomodoroPhase': {
                const { pomodoroPhase } = payload;
                dispatchTimerSettings({
                    pomodoroPhase,
                });
                dispatchPlayAudioNotification();
                break;
            }
            default: {}
        }
    };

    // console.log('options', options)

    if (options) {
        yield put(setTimerWorkerSettingsAC({
            options
        }))
    }
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

function* setWorkerTimerSettings(action: {
    type: string;
    payload: {
        options: {
            pomodoro?: number;
            break?: number;
        }
    };
}) {
    const { payload } = action;

    timerWorker.postMessage({
        type: 'action',
        payload: {
            command: 'settings',
            options: payload.options
        },
    });
}

export function* timerSaga() {
   yield takeLatest(constants.INIT_TIMER, initTimerWorker);
   yield takeLatest(constants.START_TIMER, startTimer);
   yield takeLatest(constants.PAUSE_TIMER, pauseTimer);
   yield takeLatest(constants.RESUME_TIMER, resumeTimer);
   yield takeLatest(constants.RELOAD_TIMER, reloadTimer);
   yield takeLatest(constants.SET_SETTINGS_TIMER, setWorkerTimerSettings);
}

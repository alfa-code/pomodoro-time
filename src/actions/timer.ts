import * as constants from 'Src/constants';
import store from 'Src/store';

export function dispatchTimerWorkerSettings(timerSettings: {
    options: {
        pomodoro?: number;
        break?: number;
    }
}) {
    store.dispatch(setTimerWorkerSettingsAC(timerSettings));
}

export function setTimerWorkerSettingsAC(timerSettings: {
    options: {
        pomodoro?: number;
        break?: number;
    }
}) {
    return {
        type: constants.SET_SETTINGS_TIMER,
        payload: timerSettings
    }
}

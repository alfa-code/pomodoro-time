import { TIMER_V2 } from 'src/constants';

const initState = {
    // Запускался ли таймер
    dirty: false,
    // Режим таймера [ stopped | launched | paused ]
    mode: 'stopped',
    time: {
        min: 0,
        sec: 0
    },
    timerOptions: {
        pomodoroPeriod: 25,
        breakPeriod: 5
    },
    defaultTimerOptions: {
        pomodoroPeriod: 25,
        breakPeriod: 5
    }
}

export default function timer(state = initState, action) {
    const { payload } = action;

    switch (action.type) {
        case TIMER_V2.set_settings:
            return state;
        case TIMER_V2.set_timer_options: {
            return {
                ...state,
                timerOptions: payload
            }
        }
        default:
            return state;
    }
}

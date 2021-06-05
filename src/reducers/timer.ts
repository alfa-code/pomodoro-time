import * as constants from 'Src/constants';

type PomodoroPhase = 'work' | 'break';
type TimerPhase = 'initial' | 'started' | 'paused';
export type TimerState = {
    pomodoroPhase: PomodoroPhase;
    timerPhase: TimerPhase;
    time: {
        hours?: string;
        minutes: string;
        seconds: string;
    }
}

const initialState: TimerState = {
    pomodoroPhase: 'work',
    timerPhase: 'initial',
    time: {
        // hours: '00',
        minutes: '00',
        seconds: '00',
    }
};

export default function timer(state: TimerState = initialState, action: any): TimerState {
    switch (action.type) {
        case constants.SET_TIMER_VIEW: {
            const newState = action.payload;
            return {
                ...state,
                ...newState,
                time: { ...state.time, ...newState.time }
            }
        }
        default: {
            return state;
        }
    }
}

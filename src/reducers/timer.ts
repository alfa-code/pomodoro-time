import * as constants from 'Src/constants';
import * as Cookies from 'js-cookie';

let period: any= Cookies.get('timerPeriod');
if (!period) {
  Cookies.set('timerPeriod', '999');
  period = 999;
} else {
  period = Number.parseInt(period, 10);
}

let breakTime: any = Cookies.get('timerBreak');
if (!breakTime) {
  Cookies.set('timerBreak', '5');
  breakTime = 5;
} else {
  breakTime = Number.parseInt(breakTime, 10);
}

const startState = {
  timerTime: 0,
  timerState: 'pause', // working, pause // It determines whether the countdown is in progress or not
  mode: constants.TIMER_MODE_POMODORO, // pomodoro, break // timer mode
  timerActivated: false, // Started timer or not
  period, // minutes
  breakTime, // minutes
  timeStart: Date.now(),
  timeEnd: 0,
  timeDifference: 0,
};

export default function timer(state = startState, action: any) {
  switch (action.type) {
    case constants.SET_TIMER_SETTINGS:
      state = Object.assign({}, state, action.payload);
      return state;
    default:
      return state;
  }
}

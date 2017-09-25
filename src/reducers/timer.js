import * as constants from '@src/constants.js'

let startState = {
  timerTime: 0,
  timerState: 'pause', // working, pause // It determines whether the countdown is in progress or not
  mode: constants.TIMER_MODE_POMODORO, //pomodoro, break // timer mode
  timerActivated: false, // Started timer or not
  period: 25, // minutes
  breakTime: 5, // minutes
  timeStart: Date.now(),
  timeEnd: 0,
  timeDifference: 0
}

export default function timer(state = startState, action) {
  switch (action.type) {
    case constants.SET_TIMER_SETTINGS:
      state = Object.assign({}, state, action.payload);
      return state;
    default:
      return state
  }
}
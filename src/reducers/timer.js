import * as constants from '@src/constants.js'

let startState = {
  timerTime: 0,
  timerState: constants.TIMER_STATE_OFF, // off, on, break
  timerEnabled: false,
  period: 0.2, // minutes
  breakTime: 0.1, // minutes
  timeNow: Date.now(),
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
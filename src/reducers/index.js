import { combineReducers } from 'redux'

import notifications from '@src/reducers/notifications.js'
import timer from '@src/reducers/timer.js'

const rootReducer = combineReducers({
  notifications,
  timer
})

export default rootReducer;
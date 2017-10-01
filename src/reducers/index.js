import { combineReducers } from 'redux'

import notifications from '@src/reducers/notifications.js'
import timer from '@src/reducers/timer.js'
import popup from '@src/reducers/popup.js'

const rootReducer = combineReducers({
  notifications,
  timer,
  popup
})

export default rootReducer;
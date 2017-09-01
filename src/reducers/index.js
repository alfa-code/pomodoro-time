import { combineReducers } from 'redux'

import notifications from '@src/reducers/notifications.js'

const rootReducer = combineReducers({
  notifications
})

export default rootReducer;
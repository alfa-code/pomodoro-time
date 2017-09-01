import * as constants from '@src/constants.js'

let startState = {
  notificationsSupport: window.Notification ? true : false,
  notificationsPermission: window.Notification.permission,
  notificationsEnabled: false
}

export default function notifications(state = startState, action) {
  switch (action.type) {
    case constants.SET_NOTIFICATIONS_PERMISSION:
      state = Object.assign({}, state, action.payload);
      return state;
    default:
      return state
  }
}
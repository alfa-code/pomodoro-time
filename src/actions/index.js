import * as constants from '@src/constants.js';
import store from '@src/store.js';

export function setNotificationsPermission(val) {
  let permission = window.Notification.permission;
  let permissionValue;
  switch (permission) {
    case constants.NOTIFICATIONS_PERMISSION_DEFAULT:
      Notification.requestPermission()
        .then(function(value) {
          if (value === constants.NOTIFICATIONS_PERMISSION_GRANTED) {
            permissionValue = true;
          } else {
            permissionValue = false;
          }
          store.dispatch({
            type: constants.SET_NOTIFICATIONS_PERMISSION,
            payload: {
              notificationsEnabled: permissionValue,
              notificationsPermission: window.Notification.permission
            }
          })
        })
      break;
    case constants.NOTIFICATIONS_PERMISSION_DENIED:
      permissionValue = false;
      alert('Вы запретили уведомления!')
      store.dispatch({
        type: constants.SET_NOTIFICATIONS_PERMISSION,
        payload: {
          notificationsEnabled: permissionValue,
          notificationsPermission: window.Notification.permission
        }
      })
      break;
    case constants.NOTIFICATIONS_PERMISSION_GRANTED:
      permissionValue = !val;
      store.dispatch({
        type: constants.SET_NOTIFICATIONS_PERMISSION,
        payload: {
          notificationsEnabled: permissionValue,
          notificationsPermission: window.Notification.permission
        }
      })
      break;
    default:
      permissionValue = false;
      store.dispatch({
        type: constants.SET_NOTIFICATIONS_PERMISSION,
        payload: {
          notificationsEnabled: permissionValue,
          notificationsPermission: window.Notification.permission
        }
      })
  }
}

export function setTimerSettings(obj) {
  store.dispatch({
    type: constants.SET_TIMER_SETTINGS,
    payload: obj
  })
}
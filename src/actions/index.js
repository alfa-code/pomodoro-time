import * as constants from 'src/constants';
import store from 'src/store';
import * as Cookies from 'js-cookie';

export function setNotificationsPermission(val) {
  const { permission } = window.Notification;
  let permissionValue;
  switch (permission) {
    case constants.NOTIFICATIONS_PERMISSION_DEFAULT:
      Notification.requestPermission()
        .then((value) => {
          if (value === constants.NOTIFICATIONS_PERMISSION_GRANTED) {
            permissionValue = true;
          } else {
            permissionValue = false;
          }
          store.dispatch({
            type: constants.SET_NOTIFICATIONS_PERMISSION,
            payload: {
              notificationsEnabled: permissionValue,
              notificationsPermission: window.Notification.permission,
            },
          });
          Cookies.set('notificationsEnabled', permissionValue);
        });
      break;
    case constants.NOTIFICATIONS_PERMISSION_DENIED:
      permissionValue = false;
      console.log('You have disabled notifications!');
      store.dispatch({
        type: constants.SET_NOTIFICATIONS_PERMISSION,
        payload: {
          notificationsEnabled: permissionValue,
          notificationsPermission: window.Notification.permission,
        },
      });
      Cookies.set('notificationsEnabled', permissionValue);
      break;
    case constants.NOTIFICATIONS_PERMISSION_GRANTED:
      permissionValue = !val;
      store.dispatch({
        type: constants.SET_NOTIFICATIONS_PERMISSION,
        payload: {
          notificationsEnabled: permissionValue,
          notificationsPermission: window.Notification.permission,
        },
      });
      Cookies.set('notificationsEnabled', permissionValue);
      break;
    default:
      permissionValue = false;
      store.dispatch({
        type: constants.SET_NOTIFICATIONS_PERMISSION,
        payload: {
          notificationsEnabled: permissionValue,
          notificationsPermission: window.Notification.permission,
        },
      });
      Cookies.set('notificationsEnabled', permissionValue);
  }
}

export function setTimerSettings(obj) {
  store.dispatch({
    type: constants.SET_TIMER_SETTINGS,
    payload: obj,
  });
}

export function setPopupSettings(obj) {
  store.dispatch({
    type: constants.SET_POPUP_SETTINGS,
    payload: obj,
  });
}

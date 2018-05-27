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

/* action creators */

export function setTimerSettings(obj) {
  store.dispatch({
    type: constants.SET_TIMER_SETTINGS,
    payload: obj,
  });
}

// update popup settings

export function setPopupSettingsOpenInfo() {
  return {
    type: constants.SET_POPUP_SETTINGS,
    payload: {
      openState: true,
      content: constants.POPUP_INFO,
    },
  };
}

export function setPopupSettingsOpenSettings() {
  return {
    type: constants.SET_POPUP_SETTINGS,
    payload: {
      openState: true,
      content: constants.POPUP_SETTINGS,
    },
  };
}


export function setPopupSettingsCloseClear() {
  return {
    type: constants.SET_POPUP_SETTINGS,
    payload: {
      openState: false,
      content: null,
    }
  };
}

// play audio notification

export function playAudioNotification() {
  return {
    type: constants.PLAY_AUDIO,
    payload: {}
  }
}
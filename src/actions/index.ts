import * as constants from 'Src/constants';
import store from 'Src/store';
import * as Cookies from 'js-cookie';

import { TimerState } from 'Src/reducers/timer';

export function setNotificationsPermission(val: any) {
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
          Cookies.set('notificationsEnabled', `${permissionValue}`);
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
      Cookies.set('notificationsEnabled', `${permissionValue}`);
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
      Cookies.set('notificationsEnabled', `${permissionValue}`);
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
      Cookies.set('notificationsEnabled', `${permissionValue}`);
  }
}

/* action creators */

export function dispatchTimerSettings(obj: TimerState | any) {
    store.dispatch(setTimerSettingsAC(obj));
}

export function setTimerSettingsAC(obj: TimerState | any) {
    return {
        type: constants.SET_TIMER_VIEW,
        payload: obj,
    }
}
  

export function initTimer(options: any | undefined) {
    if (options) {
        store.dispatch({
            type: constants.INIT_TIMER,
            payload: options,
        });
    } else {
        store.dispatch({
            type: constants.INIT_TIMER,
        });
    }
}

export function startTimer() {
    store.dispatch({
      type: constants.START_TIMER,
    });
}

export function pauseTimer() {
    store.dispatch({
      type: constants.PAUSE_TIMER,
    });
}

export function resumeTimer() {
    store.dispatch({
      type: constants.RESUME_TIMER,
    });
}

export function reloadTimer() {
    store.dispatch({
      type: constants.RELOAD_TIMER,
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


export function setPopupSettingsCloseClear(): any {
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
    type: constants.PLAY_AUDIO
  }
}

export function dispatchPlayAudioNotification() {
    store.dispatch({
        type: constants.PLAY_AUDIO,
    });
}

import * as constants from 'Src/constants';
import * as Cookies from 'js-cookie';

function getStartState() {
  if (window.Notification) {
    return {
      notificationsSupport: true,
      notificationsPermission: window.Notification.permission,
      notificationsEnabled: (Cookies.get('notificationsEnabled') === 'true') || false,
    };
  }
  return {
    notificationsSupport: false,
  };
}

export default function notifications(state = getStartState(), action: any) {
  switch (action.type) {
    case constants.SET_NOTIFICATIONS_PERMISSION:
      state = Object.assign({}, state, action.payload);
      return state;
    default:
      return state;
  }
}

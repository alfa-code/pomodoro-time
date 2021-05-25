import React, { Component } from 'react';

// components
import Switcher from 'Src/app/components/common/switcher';

// styles
import style from './style.module.scss';

export default class Notifications extends Component<any> {
  setText() {
    if (this.props.notifications.notificationsPermission === 'denied') {
      return (
        <div>
          <p>
            You have disabled the notification.
          </p>
          <p>
            You can change the solution in the browser settings.
          </p>
        </div>
      );
    }
    return (
      <div>
        <p>
          You can change the audio tone and volume via Settings
        </p>
        <p>
          Desktop Notifications are currently supported in Chrome, Firefox and Safari
        </p>
      </div>
    );
  }

  render() {
    const { notificationsSupport } = this.props.notifications;
    const { notificationsEnabled } = this.props.notifications;
    const { notificationsPermission } = this.props.notifications;
    if (notificationsSupport) {
      return (
        <div className={style.container}>
          <div className={style.headerBlock}>
            <span className={style.title}>
              Desktop Alerts
            </span>
            <Switcher enabled={notificationsEnabled} permission={notificationsPermission} />
          </div>
          <div className={style.text}>
            {this.setText()}
          </div>
        </div>
      );
    }
    return null;
  }
}

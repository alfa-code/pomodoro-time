import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switcher from '@src/app/components/common/switcher'
import style from './style.scss';

export default class Notifications extends Component {
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
      )
    } else {
      return (
        <div>
          <p>
            You can change the audio tone and volume via Settings
          </p>
          <p>
            Desktop Notifications are currently supported in Chrome, Firefox and Safari
          </p>
        </div>
      )
    }
  }

  render() {
    const notificationsSupport = this.props.notifications.notificationsSupport;
    const notificationsEnabled = this.props.notifications.notificationsEnabled;
    const notificationsPermission = this.props.notifications.notificationsPermission;
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
      )
    } else {
      return null
    }
  }
}

Notifications.propTypes = {
  notifications: PropTypes.shape({
    notificationsEnabled: PropTypes.bool,
    notificationsPermission: PropTypes.string,
    notificationsSupport: PropTypes.bool
  })
};
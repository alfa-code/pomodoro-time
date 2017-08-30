import React, { Component } from 'react';
import Switcher from '@src/app/components/common/switcher'
import style from './style.scss';

export default class Notifications extends Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.headerBlock}>
          <span className={style.title}>
            Desktop Alerts
          </span>
          <Switcher/>
        </div>
        <div className={style.text}>
          <p>
            You can change the audio tone and volume via Settings
          </p>
          <p>
            Desktop Notifications are currently supported in Chrome, Firefox and Safari
          </p>
        </div>
      </div>
    )
  }
}
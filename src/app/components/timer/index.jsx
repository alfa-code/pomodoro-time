import React, { Component } from 'react';

import sendNotification from '@src/actions/sendNotification.js'

import classnames from 'classnames';
import style from './style.scss';

export default class Timer extends Component {
  send () {
    sendNotification(1, 2, 3, 4);
  }
  render() {
    return (
      <div 
        className={style.container}
        onClick={this.send}
      >
        <div className={classnames(style.digit, style.minutes)}>
          00
        </div>
        <div className={classnames(style.digit, style.colon)}>
          :
        </div>
        <div className={classnames(style.digit, style.seconds)}>
          00
        </div>
        <div className={classnames(style.label, style.minutesLabel)}>
          minutes
        </div>
        <div className={classnames(style.label, style.secondsLabel)}>
          seconds
        </div>
      </div>
    )
  }
}
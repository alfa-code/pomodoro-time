import React, { Component } from 'react';

import sendNotification from '@src/actions/sendNotification.js'

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
        asfasf
      </div>
    )
  }
}
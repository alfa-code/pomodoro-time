import React, { Component } from 'react';
import style from './style.scss';
import * as Cookies from "js-cookie";
import * as constants from '@src/constants.js'

import RadioButton from '@src/app/components/common/radio-button';
import audioNotification from '@src/actions/audioNotification.js';

export default class SettingsContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeRingtone: Cookies.get('ringtone'),
      ringtones: [
        constants.RINGTONE_1,
        constants.RINGTONE_2,
        constants.RINGTONE_3,
        constants.RINGTONE_4,
        constants.RINGTONE_5
      ]
    }
  }

  setRingtoneCookie = (name) => {
    Cookies.set('ringtone', name);
    this.setState({
      activeRingtone: name
    });
    audioNotification();
  }
  
  renderRingtoneButtons = () => {
    return this.state.ringtones.map((i) => {
      const active = (this.state.activeRingtone === i) ? true : false;
      return (
        <RadioButton
          label={i}
          onClick={
            () => {this.setRingtoneCookie(i)}
          }
          key={i}
          active={active}
          className={style.marginBottom20}
        />
      )
    })
  }

  render() {
    return (
      <div className={style.container}>
        <h2 className={style.title}>Settings</h2>
        <h3>Ringtone</h3>
        <div className={style.ringtoneContainer}>
          {this.renderRingtoneButtons()}
        </div>
      </div>
    )
  }
}
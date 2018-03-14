import React, { Component } from 'react';

// constants
import * as constants from '@src/constants.js';

// components
import RadioButton from '@src/app/components/common/radio-button';

// actions
import audioNotification from '@src/actions/audioNotification';
import { setTimerSettings } from '@src/actions/index.js';
import * as Cookies from "js-cookie";

// style
import style from './style.scss';

const regexp = /^\d+$|^$/;

export default class SettingsContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeRingtone: Cookies.get('ringtone'),
      timerPeriod: props.timer.period,
      timerBreak: props.timer.breakTime,
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
    return this.state.ringtones.map((item, i) => {
      const active = (this.state.activeRingtone === item) ? true : false;
      return (
        <RadioButton
          label={'Ringtone ' + (i+1)}
          onClick={
            () => {this.setRingtoneCookie(item)}
          }
          key={item}
          active={active}
          className={style.marginBottom20}
        />
      )
    })
  }

  setNewPeriodValue = (e) => {
    e.preventDefault();

    let value = e.target.value;
    const test = regexp.test(value);

    value = parseInt(e.target.value);
    
    if (test) {
      if (isNaN(value)) {
        Cookies.set('timerPeriod', 25);
        this.startNewTimer(25, this.state.timerBreak);
        this.setState({ timerPeriod: '' });
      } else if (value >= 60) {
        value = 59;
        Cookies.set('timerPeriod', value);
        this.setState({ timerPeriod: value });
        this.startNewTimer(value, this.state.timerBreak);
      } else {
        Cookies.set('timerPeriod', value);
        this.setState({ timerPeriod: value });
        this.startNewTimer(value, this.state.timerBreak);
      }
    }

    e.target.value = this.state.timerPeriod;
  }

  setNewBreakValue = (e) => {
    e.preventDefault();

    let value = e.target.value;
    const test = regexp.test(value);

    value = parseInt(e.target.value);
    
    if (test) {
      if (isNaN(value)) {
        Cookies.set('timerBreak', 5);
        this.startNewTimer(this.state.timerPeriod, 5);
        this.setState({ timerBreak: '' });
      } else if (value >= 60) {
        value = 59;
        Cookies.set('timerBreak', value);
        this.startNewTimer(this.state.timerPeriod, value);
        this.setState({ timerBreak: value });
      } else {
        Cookies.set('timerBreak', value);
        this.startNewTimer(this.state.timerPeriod, value);
        this.setState({ timerBreak: value });
      }
    }

    e.target.value = this.state.timerBreak;
  }

  startNewTimer = (timerPeriod, timerBreak) => {
    setTimerSettings({
      mode: constants.TIMER_MODE_POMODORO,
      timerState: constants.TIMER_STATE_PAUSE,
      timerActivated: true,
      timeStart: Date.now(),
      timeEnd: Date.now() + (timerPeriod * 60 * 1000),
      timeDifference: timerPeriod * 60 * 1000,
      period: timerPeriod,
      breakTime: timerBreak
    });
  }

  render() {
    return (
      <div className={style.container}>
        <h2 className={style.title}>
          Settings
        </h2>
        <h3>
          Ringtone
        </h3>
        <div className={style.ringtoneContainer}>
          {this.renderRingtoneButtons()}
        </div>
        <h3>
          Set Custom Times
        </h3>
        <div className={style.customTimeContainer}>
          <div className={style.customTimeCell}>
            <p>
              Pomodoro
            </p>
            <input 
              type="text"
              className={style.customTimeCellInput}
              value={this.state.timerPeriod}
              onChange={this.setNewPeriodValue}
            />
          </div>
          <div className={style.customTimeCell}>
            <p>
              Break
            </p>
            <input 
              type="text"
              className={style.customTimeCellInput}
              value={this.state.timerBreak}
              onChange={this.setNewBreakValue}
            />
          </div>
        </div>
      </div>
    )
  }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// constants
import * as constants from 'src/constants';

// components
import RadioButton from 'src/app/components/common/radio-button';

// actions
import { setTimerSettings } from 'src/actions/index';
import * as Cookies from 'js-cookie';

// style
import style from './style.scss';

const regexp = /^\d+$|^$/;

class SettingsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRingtone: Cookies.get('ringtone'),
      timerPeriod: props.period,
      timerBreak: props.breakTime,
      ringtones: [
        constants.RINGTONE_1,
        constants.RINGTONE_2,
        constants.RINGTONE_3,
        constants.RINGTONE_4,
        constants.RINGTONE_5,
      ],
    };
  }

  setRingtoneCookie = (name) => {
    const { playAudioNotification } = this.props;
    Cookies.set('ringtone', name);
    this.setState({
      activeRingtone: name,
    });
    playAudioNotification();
  }

  setNewPeriodValue = (e) => {
    e.preventDefault();

    let { value } = e.target;
    const test = regexp.test(value);

    value = parseInt(e.target.value, 10);

    if (test) {
      if (isNaN(value)) {
        Cookies.set('timerPeriod', 25);
        this.startNewTimer(25, this.state.timerBreak);
        this.setState({ timerPeriod: '' });
      } else if (value >= 999) {
        value = 999;
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

    let { value } = e.target;
    const test = regexp.test(value);

    value = parseInt(e.target.value, 10);

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
      breakTime: timerBreak,
    });
  }

  renderRingtoneButtons = () => (
    this.state.ringtones.map((item, i) => {
      const active = (this.state.activeRingtone === item);
      return (
        <RadioButton
          label={`Ringtone ${i + 1}`}
          onClick={
            () => { this.setRingtoneCookie(item); }
          }
          key={item}
          active={active}
          className={style.marginBottom20}
        />
      );
    })
  )

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
    );
  }
}

SettingsContent.propTypes = {
  period: PropTypes.number,
  breakTime: PropTypes.number,
  playAudioNotification: PropTypes.func
};

SettingsContent.defaultProps = {
  period: 0,
  breakTime: 0,
};

export default SettingsContent;

import * as constants from '@src/constants.js'

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment'

import { sendNotification } from '@src/actions/sendNotification.js';
import { setTimerSettings } from '@src/actions/index.js';

import classnames from 'classnames';
import style from './style.scss';

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minutes: '00',
      seconds: '00'
    }
  }
  send () {
    //sendNotification(1, 2, 3, 4);
  }

  componentWillReceiveProps(props) {
    const { timerEnabled, timeEnd, timeDifference, timerState, breakTime, period } = props.timer
    if (timerEnabled) {
      switch (timerState) {
        case constants.TIMER_STATE_ON:
          console.log()
          if (timeDifference <= 0) {
            setTimerSettings({
              timerState: constants.TIMER_STATE_BREAK,
              timerEnabled: true,
              timeNow: Date.now(),
              timeEnd: Date.now() + (breakTime * 60 * 1000),
              timeDifference: (Date.now() + (breakTime * 60 * 1000)) - Date.now()
            });
          } else {
            this.setState({
              minutes: moment.utc(timeDifference).format("mm"),
              seconds: moment.utc(timeDifference).format("ss")
            });
            setTimeout(function() {
              setTimerSettings({
                timeDifference: timeEnd - Date.now()
              });
            }, 1000)
          }
          break;
        case constants.TIMER_STATE_BREAK:
          if (timeDifference <= 0) {
            setTimerSettings({
              timerState: constants.TIMER_STATE_ON,
              timerEnabled: true,
              timeNow: Date.now(),
              timeEnd: Date.now() + (period * 60 * 1000),
              timeDifference: (Date.now() + (period * 60 * 1000)) - Date.now()
            });
          } else {
            this.setState({
              minutes: moment.utc(timeDifference).format("mm"),
              seconds: moment.utc(timeDifference).format("ss")
            });
            setTimeout(function() {
              setTimerSettings({
                timeDifference: timeEnd - Date.now()
              });
            }, 1000)
          }
          break;
      }
    }
  }

  setControllButtonInner () {
    const { timerState } = this.props.timer
    switch (timerState) {
      case constants.TIMER_STATE_OFF:
        return (
          <div className={style.triangle}></div>
        )
      case constants.TIMER_STATE_ON:
        return (
          <div className={style.pause}></div>
        )
      case constants.TIMER_STATE_BREAK:
        return (
          <div className={style.triangle}></div>
        )
    }
  }

  controlButtonOnClick = () => {
    const { timerState, period } = this.props.timer
    console.log(timerState)
    switch (timerState) {
      case constants.TIMER_STATE_OFF:
        setTimerSettings({
          timerState: constants.TIMER_STATE_ON,
          timerEnabled: true,
          timeNow: Date.now(),
          timeEnd: Date.now() + (period * 60 * 1000),
          timeDifference: (Date.now() + (period * 60 * 1000)) - Date.now()
        });
        break;
      case constants.TIMER_STATE_ON:
        setTimerSettings({
          timerState: constants.TIMER_STATE_OFF
        });
        break;
      case constants.TIMER_STATE_BREAK:
        setTimerSettings({
          timerState: constants.TIMER_STATE_ON
        });
        break;
    }
  }

  render() {
    console.log(this.props)
    return (
      <div 
        className={style.container}
        onClick={this.send}
      >
        <div 
          className={style.controlButton}
          onClick={this.controlButtonOnClick}
        >
          { this.setControllButtonInner() }
        </div>
        <div className={style.timer}>
          <div className={classnames(style.digit, style.minutes)}>
            {this.state.minutes }
          </div>
          <div className={classnames(style.digit, style.colon)}>
            :
          </div>
          <div className={classnames(style.digit, style.seconds)}>
            {this.state.seconds }
          </div>
          <div className={classnames(style.label, style.minutesLabel)}>
            minutes
          </div>
          <div className={classnames(style.label, style.secondsLabel)}>
            seconds
          </div>
        </div>
      </div>
    )
  }
}

Timer.propTypes = {
  timer: PropTypes.shape({
    timerTime: PropTypes.digit,
    timerState: PropTypes.string, 
    timerEnabled: PropTypes.bool,
    period: PropTypes.digit,
    break: PropTypes.digit, 
    timeNow: PropTypes.digit,
    timeEnd: PropTypes.digit,
    timeDifference: PropTypes.digit
  })
};
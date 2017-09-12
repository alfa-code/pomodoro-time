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
    this.timer;
    this.state = {
      minutes: '00',
      seconds: '00'
    }
  }

  send () {
    //sendNotification(1, 2, 3, 4);
  }

  componentDidMount () {
    const { period } = this.props.timer
    this.setState({
      minutes: moment.utc(period * 60 * 1000).format("mm"),
      seconds: moment.utc(period * 60 * 1000).format("ss")
    });
  }

  componentWillReceiveProps(props) {
    console.log(props)

    const { timerActivated, timerState, timeDifference, timeEnd, period, mode, breakTime } = props.timer

    if (timerActivated) {
      switch (timerState) {
        case constants.TIMER_STATE_WORKING:
          let that = this;
          this.timer = setTimeout(function() {
            setTimerSettings({
              timeDifference: timeDifference - 1000
            });
          }, 1000)
          break;
        case constants.TIMER_STATE_PAUSE:
          clearTimeout(this.timer);
          break;
      }
    }

    if (timeDifference < 0) {
      clearTimeout(this.timer);
      switch (mode) {
        case constants.TIMER_MODE_POMODORO:
          this.startNewTimer(constants.TIMER_MODE_BREAK, breakTime);
          break;
        case constants.TIMER_MODE_BREAK:
          this.startNewTimer(constants.TIMER_MODE_POMODORO, period);
          break;
      }
      
    }

    this.setState({
      minutes: moment.utc(timeDifference).format("mm"),
      seconds: moment.utc(timeDifference).format("ss")
    });
  }

  setButtonClass = () => {
    const { timerActivated, timerState } = this.props.timer
    if (timerActivated) {
      switch (timerState) {
        case constants.TIMER_STATE_WORKING:
          return style.pause;
        case constants.TIMER_STATE_PAUSE:
          return style.triangle;
      }
    } else {
      return style.triangle
    }
  }

  controlButtonOnClick = () => {
    const { timerActivated, timerState, period } = this.props.timer
    if (!timerActivated) {
      this.startNewTimer(constants.TIMER_MODE_POMODORO, period);
    } else {
      switch (timerState) {
        case constants.TIMER_STATE_WORKING:
          setTimerSettings({
            timerState: constants.TIMER_STATE_PAUSE
          });
          break;
        case constants.TIMER_STATE_PAUSE:
          setTimerSettings({
            timerState: constants.TIMER_STATE_WORKING
          })
          break;
      }
    }
  }

  startNewTimer = (timerMode, time) => {
    const { period, breakTime, mode } = this.props.timer
    // switch (mode) {
    //   case constants.TIMER_MODE_POMODORO:
    //     setTimerSettings({
    //       mode: constants.TIMER_MODE_POMODORO,
    //       timerState: constants.TIMER_STATE_WORKING,
    //       timerActivated: true,
    //       timeStart: Date.now(),
    //       timeEnd: Date.now() + (period * 60 * 1000),
    //       timeDifference: period * 60 * 1000
    //     });
    //     break;
    //   case constants.TIMER_MODE_BREAK:
    //     setTimerSettings({
    //       mode: constants.TIMER_MODE_BREAK,
    //       timerState: constants.TIMER_STATE_WORKING,
    //       timerActivated: true,
    //       timeStart: Date.now(),
    //       timeEnd: Date.now() + (breakTime * 60 * 1000),
    //       timeDifference: breakTime * 60 * 1000
    //     });
    //     break;
    // }
    setTimerSettings({
      mode: timerMode,
      timerState: constants.TIMER_STATE_WORKING,
      timerActivated: true,
      timeStart: Date.now(),
      timeEnd: Date.now() + (time * 60 * 1000),
      timeDifference: time * 60 * 1000
    });
  }

  render() {
    return (
      <div 
        className={style.container}
        onClick={this.send}
      >
        <div 
          className={style.controlButton}
          onClick={this.controlButtonOnClick}
        >
          <div className={this.setButtonClass()}></div>
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
    timerActivated: PropTypes.bool,
    period: PropTypes.digit,
    break: PropTypes.digit, 
    timeStart: PropTypes.digit,
    timeEnd: PropTypes.digit,
    timeDifference: PropTypes.digit
  })
};
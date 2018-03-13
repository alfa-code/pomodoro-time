import * as constants from '@src/constants.js'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { utc } from 'moment'
import sendNotification from '@src/actions/sendNotification.js';
import { setTimerSettings } from '@src/actions/index.js';
import audioNotification from '@src/actions/audioNotification.js';
import classnames from 'classnames';
import style from './style.scss';

import SvgIcon from '@src/app/components/common/svg-icon';

import svgIconReload from '@src/static/svg/reset.svg?file-loader';
import svgIconPlay from '@src/static/svg/play.svg?file-loader';
import svgIconPause from '@src/static/svg/pause.svg?file-loader';

import pomodoroImage from '@src/static/images/notify/notify.png';

let timerWorker = require("worker-loader?inline!@src/app/workers/timer-worker.js");

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.timer;
    this.timerWorker = new timerWorker();
    this.state = {
      minutes: '00',
      seconds: '00'
    }
  }

  componentDidMount () {
    const { period, timerActivated, timerState, timeDifference } = this.props.timer;
    this.setState({
      minutes: utc(period * 60 * 1000).format("mm"),
      seconds: utc(period * 60 * 1000).format("ss")
    });

    this.timerWorker.addEventListener('message', function(e) {
      switch (e.data.command) {
        case 'updateTimeDifference':
          setTimerSettings({
            timeDifference: e.data.newTimeDifference
          });
          break;
        case 'playTimeoutSound':
          audioNotification();
          break;
      }
    }, false);

    this.checkTimer(this.props.timer, this.props.timer);
  }

  checkTimer = (oldProps, newProps) => {
    let startNewTimer = (oldProps.timerActivated === false && newProps.timerActivated === true && newProps.timerState === constants.TIMER_STATE_WORKING);
    let fromPauseToWarkTimer = (oldProps.timerState === constants.TIMER_STATE_PAUSE && newProps.timerState === constants.TIMER_STATE_WORKING && newProps.timerActivated === true);
    let timerOnPause = (newProps.timerState !== constants.TIMER_STATE_WORKING);
    let timerNotWork = (newProps.timerActivated === false);

    let timeDifference = newProps.timeDifference;

    this.timerWorker.postMessage({
      startNewTimer,
      fromPauseToWarkTimer,
      timerOnPause,
      timerNotWork,
      timeDifference
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.checkTimer(this.props.timer, nextProps.timer);
    return true;
  }

  reloadTimer = () => {
    const { period } = this.props.timer
    setTimerSettings({
      mode: constants.TIMER_MODE_POMODORO,
      timerState: constants.TIMER_STATE_PAUSE,
      timerActivated: true,
      timeStart: Date.now(),
      timeEnd: Date.now() + (period * 60 * 1000),
      timeDifference: period * 60 * 1000
    });
  }

  componentWillReceiveProps(props) {
    const { timerActivated, timerState, timeDifference, timeEnd, period, mode, breakTime } = props.timer

    if (timeDifference < 0) {
      switch (mode) {
        case constants.TIMER_MODE_POMODORO:
          this.startNewTimer(constants.TIMER_MODE_BREAK, breakTime);
          if (this.props.notificationsEnabled) {
            sendNotification('Time is over', 'notyfy', 'Postpone the business and rest', pomodoroImage);
          }
          break;
        case constants.TIMER_MODE_BREAK:
          this.startNewTimer(constants.TIMER_MODE_POMODORO, period);
          if (this.props.notificationsEnabled) {
            sendNotification('Time for work', 'notyfy', 'Do not be distracted by anything', pomodoroImage);
          }
          break;
      }
    }

    let minutes = utc(timeDifference).format("mm"),
        seconds = utc(timeDifference).format("ss");

    this.setState({
      minutes,
      seconds
    });

    this.setDocumentTitle(minutes, seconds);
  }

  setDocumentTitle = (minutes, seconds) => {
    if (this.props.timer.timerState === constants.TIMER_STATE_WORKING) {
      document.title = `(${minutes}:${seconds}) Pomodoro Time - time management method.`;
    } else {
      document.title = 'Pomodoro Time - time management method.';
    }
  }

  setControlButton = () => {
    const { timerActivated, timerState } = this.props.timer
    if (timerActivated) {
      switch (timerState) {
        case constants.TIMER_STATE_WORKING:
          return (
            // <SvgIcon
            //   glyph={svgIconPause}
            //   className={style.controlsIcon}
            // />
            <img src={svgIconPause} className={style.controlsIcon} />
          )
        case constants.TIMER_STATE_PAUSE:
          return (
            // <SvgIcon
            //   glyph={svgIconPlay}
            //   className={style.controlsIcon}
            // />
            <img src={svgIconPlay} className={style.controlsIcon} />
          )
      }
    } else {
      return (
        // <SvgIcon
        //   glyph={svgIconPlay}
        //   className={style.controlsIcon}
        // />
        <img src={svgIconPlay} className={style.controlsIcon} />
      )
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

  startNewTimer = (timerMode, timerPeriod) => {
    setTimerSettings({
      mode: timerMode,
      timerState: constants.TIMER_STATE_WORKING,
      timerActivated: true,
      timeStart: Date.now(),
      timeEnd: Date.now() + (timerPeriod * 60 * 1000),
      timeDifference: timerPeriod * 60 * 1000
    });
  }

  render() {
    return (
      <div 
        className={style.container}
      >
        <div 
          className={style.controlButton}
          onClick={this.controlButtonOnClick}
        >
          {this.setControlButton()}
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
        <div 
          className={style.resetButton}
          onClick={this.reloadTimer}
        >
          {/* <SvgIcon
            glyph={svgIconReload}
            className={style.controlsIcon}
          /> */}
          <img src={svgIconReload} className={style.controlsIcon}/>
        </div>
      </div>
    )
  }
}

Timer.propTypes = {
  notificationsEnabled: PropTypes.bool,
  timer: PropTypes.shape({
    timerTime: PropTypes.digit,
    timerState: PropTypes.string,
    mode: PropTypes.string,
    timerActivated: PropTypes.bool,
    period: PropTypes.digit,
    breakTime: PropTypes.digit, 
    timeStart: PropTypes.digit,
    timeEnd: PropTypes.digit,
    timeDifference: PropTypes.digit
  })
};
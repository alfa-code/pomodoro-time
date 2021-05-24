import React, { Component } from 'react';

// constants
import * as constants from 'Src/constants';

// actions
import sendNotification from 'Src/actions/sendNotification';
import { setTimerSettings } from 'Src/actions/index';

// svg icons
import svgIconReload from 'Src/static/svg/reset.svg';
import svgIconPlay from 'Src/static/svg/play.svg';
import svgIconPause from 'Src/static/svg/pause.svg';
// image
import pomodoroImage from 'Src/static/images/notify/notify.png';

import classnames from 'classnames';
import { utc } from 'moment';
import TimerWorker from 'Src/app/workers/timer.worker';

// style
import style from './style.scss';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.timer = '';
    this.timerWorker = new TimerWorker();
    this.state = {
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  }

  componentWillMount() {
    const { playAudioNotification } = this.props;
    const { period } = this.props.timer;

    this.setState({
      // hours: utc(period * 60 * 1000).format('h'),
      // (366000 / 1000 / 60 / 60).toFixed()
      hours: parseInt(period / 60),
      minutes: utc(period * 60 * 1000).format('mm'),
      seconds: utc(period * 60 * 1000).format('ss'),
    });

    this.timerWorker.addEventListener('message', (e) => {
      switch (e.data.command) {
        case 'updateTimeDifference':
          setTimerSettings({
            timeDifference: e.data.newTimeDifference,
          });
          break;
        case 'playTimeoutSound':
          playAudioNotification();
          break;
        default:
          break;
      }
    }, false);

    this.checkTimer(this.props.timer, this.props.timer);
  }

  componentWillReceiveProps(props) {
    const {
      timeDifference,
      period,
      mode,
      breakTime,
    } = props.timer;

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
        default:
          break;
      }
    }

    const hours = parseInt(timeDifference / 1000 / 60 / 60);
    const minutes = utc(timeDifference).format('mm');
    const seconds = utc(timeDifference).format('ss');

    console.log('hours', hours)
    console.log('timeDifference', timeDifference)

    this.setState({
      hours,
      minutes,
      seconds,
    });

    this.setDocumentTitle(hours, minutes, seconds);
  }

  shouldComponentUpdate(nextProps) {
    this.checkTimer(this.props.timer, nextProps.timer);
    return true;
  }

  setDocumentTitle = (hours, minutes, seconds) => {
    if (this.props.timer.timerState === constants.TIMER_STATE_WORKING) {
      document.title = `(${hours}:${minutes}:${seconds}) Pomodoro Time - time management method.`;
    } else {
      document.title = 'Pomodoro Time - time management method.';
    }
  }

  setControlButton = () => {
    const { timerActivated, timerState } = this.props.timer;
    if (timerActivated) {
      switch (timerState) {
        case constants.TIMER_STATE_WORKING:
          return (
            <img
              src={svgIconPause}
              className={style.controlsIcon}
              alt="Pause Icon"
            />
          );
        case constants.TIMER_STATE_PAUSE:
          return (
            <img
              src={svgIconPlay}
              className={style.controlsIcon}
              alt="Play Icon"
            />
          );
        default:
          return (
            <img
              src={svgIconPlay}
              className={style.controlsIcon}
              alt="Play Icon"
            />
          );
      }
    }
    return (
      <img
        src={svgIconPlay}
        className={style.controlsIcon}
        alt="Play Icon"
      />
    );
  }

  reloadTimer = () => {
    const { period } = this.props.timer;
    setTimerSettings({
      mode: constants.TIMER_MODE_POMODORO,
      timerState: constants.TIMER_STATE_PAUSE,
      timerActivated: true,
      timeStart: Date.now(),
      timeEnd: Date.now() + (period * 60 * 1000),
      timeDifference: period * 60 * 1000,
    });
  }

  checkTimer = (oldProps, newProps) => {
    const startNewTimer = (
      oldProps.timerActivated === false
      && newProps.timerActivated === true
      && newProps.timerState === constants.TIMER_STATE_WORKING
    );

    const fromPauseToWarkTimer = (
      oldProps.timerState === constants.TIMER_STATE_PAUSE
      && newProps.timerState === constants.TIMER_STATE_WORKING
      && newProps.timerActivated === true
    );
    const timerOnPause = (newProps.timerState !== constants.TIMER_STATE_WORKING);
    const timerNotWork = (newProps.timerActivated === false);
    const { timeDifference } = newProps;

    this.timerWorker.postMessage({
      startNewTimer,
      fromPauseToWarkTimer,
      timerOnPause,
      timerNotWork,
      timeDifference,
    });
  }

  controlButtonOnClick = () => {
    const {
      timerActivated,
      timerState,
      period,
    } = this.props.timer;

    if (!timerActivated) {
      this.startNewTimer(constants.TIMER_MODE_POMODORO, period);
    } else {
      switch (timerState) {
        case constants.TIMER_STATE_WORKING:
          setTimerSettings({
            timerState: constants.TIMER_STATE_PAUSE,
          });
          break;
        case constants.TIMER_STATE_PAUSE:
          setTimerSettings({
            timerState: constants.TIMER_STATE_WORKING,
          });
          break;
        default:
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
      timeDifference: timerPeriod * 60 * 1000,
    });
  }

  checkKeyPress = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback();
    }
  }

  render() {
    console.log('this.state.hours', this.state.hours)
    return (
      <div
        className={style.container}
      >
        <div
          className={style.controlButton}
          onClick={this.controlButtonOnClick}
          onKeyPress={(e) => {
            this.checkKeyPress(e, this.controlButtonOnClick);
          }}
          role="button"
          tabIndex={0}
        >
          {this.setControlButton()}
        </div>
        <div className={style.timer}>
          <div className={classnames(style.digit, style.hours, { [style.hidden]: (this.state.hours < 1) })}>
            {this.state.hours }
          </div>
          <div className={classnames(style.digit, style.colon1, { [style.hidden]: (this.state.hours < 1) })}>
            :
          </div>
          <div className={classnames(style.digit, style.minutes)}>
            {this.state.minutes }
          </div>
          <div className={classnames(style.digit, style.colon2)}>
            :
          </div>
          <div className={classnames(style.digit, style.seconds)}>
            {this.state.seconds }
          </div>
          <div className={classnames(style.label, style.hoursLabel, { [style.hidden]: (this.state.hours < 1) })}>
            hours
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
          onKeyPress={(e) => {
            this.checkKeyPress(e, this.reloadTimer);
          }}
          role="button"
          tabIndex={0}
        >
          <img
            src={svgIconReload}
            className={style.controlsIcon}
            alt="controls icon"
          />
        </div>
      </div>
    );
  }
}

Timer.defaultProps = {
  notificationsEnabled: false,
  timer: {},
};

export default Timer;

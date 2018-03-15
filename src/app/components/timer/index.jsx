import React, { Component } from 'react';
import PropTypes from 'prop-types';

// constants
import * as constants from 'src/constants';

// actions
import sendNotification from 'src/actions/sendNotification';
import { setTimerSettings } from 'src/actions/index';
import audioNotification from 'src/actions/audioNotification';

// svg icons
// import SvgIcon from 'src/app/components/common/svg-icon';
import svgIconReload from 'src/static/svg/reset.svg';
import svgIconPlay from 'src/static/svg/play.svg';
import svgIconPause from 'src/static/svg/pause.svg';

// image
import pomodoroImage from 'src/static/images/notify/notify.png';

import classnames from 'classnames';
import { utc } from 'moment';

// const TimerWorker = require('worker-loader!src/app/workers/timer.worker');

import TimerWorker from 'src/app/workers/timer.worker';

// style
import style from './style.scss';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.timer = '';
    this.timerWorker = new TimerWorker();
    this.state = {
      minutes: '00',
      seconds: '00',
    };
  }

  componentWillMount() {
    const {
      period,
    } = this.props.timer;

    this.setState({
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
          audioNotification();
          break;
        default:
          break;
      }
    }, false);

    this.checkTimer(this.props.timer, this.props.timer);
  }

  // componentDidMount() {
  //   const {
  //     period,
  //     // timerActivated,
  //     // timerState,
  //     // timeDifference,
  //   } = this.props.timer;

  //   this.setState({
  //     minutes: utc(period * 60 * 1000).format('mm'),
  //     seconds: utc(period * 60 * 1000).format('ss'),
  //   });

  //   this.timerWorker.addEventListener('message', (e) => {
  //     switch (e.data.command) {
  //       case 'updateTimeDifference':
  //         setTimerSettings({
  //           timeDifference: e.data.newTimeDifference,
  //         });
  //         break;
  //       case 'playTimeoutSound':
  //         audioNotification();
  //         break;
  //       default:
  //         break;
  //     }
  //   }, false);

  //   this.checkTimer(this.props.timer, this.props.timer);
  // }

  componentWillReceiveProps(props) {
    const {
      // timerActivated,
      // timerState,
      timeDifference,
      // timeEnd,
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

    const minutes = utc(timeDifference).format('mm');
    const seconds = utc(timeDifference).format('ss');

    this.setState({
      minutes,
      seconds,
    });

    this.setDocumentTitle(minutes, seconds);
  }

  shouldComponentUpdate(nextProps) {
    this.checkTimer(this.props.timer, nextProps.timer);
    return true;
  }

  setDocumentTitle = (minutes, seconds) => {
    if (this.props.timer.timerState === constants.TIMER_STATE_WORKING) {
      document.title = `(${minutes}:${seconds}) Pomodoro Time - time management method.`;
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
            // <SvgIcon
            //   glyph={svgIconPause}
            //   className={style.controlsIcon}
            // />
            <img
              src={svgIconPause}
              className={style.controlsIcon}
              alt="Pause Icon"
            />
          );
        case constants.TIMER_STATE_PAUSE:
          return (
            // <SvgIcon
            //   glyph={svgIconPlay}
            //   className={style.controlsIcon}
            // />
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
      // <SvgIcon
      //   glyph={svgIconPlay}
      //   className={style.controlsIcon}
      // />
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
          onKeyPress={(e) => {
            this.checkKeyPress(e, this.reloadTimer);
          }}
          role="button"
          tabIndex={0}
        >
          {/* <SvgIcon
            glyph={svgIconReload}
            className={style.controlsIcon}
          /> */}
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

Timer.propTypes = {
  notificationsEnabled: PropTypes.bool,
  timer: PropTypes.shape({
    timerTime: PropTypes.number,
    timerState: PropTypes.string,
    mode: PropTypes.string,
    timerActivated: PropTypes.bool,
    period: PropTypes.number,
    breakTime: PropTypes.number,
    timeStart: PropTypes.number,
    timeEnd: PropTypes.number,
    timeDifference: PropTypes.number,
  }),
};

Timer.defaultProps = {
  notificationsEnabled: false,
  timer: {},
};

export default Timer;

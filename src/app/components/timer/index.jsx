import * as constants from '@src/constants.js'

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { utc } from 'moment'


import sendNotification from '@src/actions/sendNotification.js';
import { setTimerSettings } from '@src/actions/index.js';

import audioNotification from '@src/actions/audioNotification.js';

import classnames from 'classnames';
import style from './style.scss';

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
      if (e.data.command === 'updateTimeDifference') {
        //console.log('Worker said: ', e.data);
        //console.log(e.data)
        setTimerSettings({
          timeDifference: e.data.newTimeDifference
        });
      }
    }, false);

    let oldProps = this.props.timer
    let newProps = this.props.timer
    this.timerWorker.postMessage({
      oldProps,
      newProps
    });

  }

  shouldComponentUpdate(nextProps, nextState) {
    //const { timerActivated, timerState, timeDifference } = this.props.timer;
    //const { timerActivated, timerState, timeDifference } = nextProps.timer;

    let oldProps = this.props.timer;
    let newProps = nextProps.timer;

    //console.log(newProps)

    this.timerWorker.postMessage({
      oldProps,
      newProps
    });

    return true
  }

  componentWillReceiveProps(props) {
    const { timerActivated, timerState, timeDifference, timeEnd, period, mode, breakTime } = props.timer
    
    // if (timerActivated) {
    //   switch (timerState) {
    //     case constants.TIMER_STATE_WORKING:
    //       clearTimeout(this.timer);
    //       this.timer = setTimeout(function() {
    //         setTimerSettings({
    //           timeDifference: timeDifference - 1000
    //         });
    //       }, 1000)
    //       break;
    //     case constants.TIMER_STATE_PAUSE:
    //       clearTimeout(this.timer);
    //       break;
    //   }
    // }

    if (timeDifference == 0) {
      audioNotification();
    }

    if (timeDifference < 0) {
      //clearTimeout(this.timer);
      switch (mode) {
        case constants.TIMER_MODE_POMODORO:
          this.startNewTimer(constants.TIMER_MODE_BREAK, breakTime);
          if (this.props.notificationsEnabled) {
            sendNotification('Помидор окончен', 'notyfy-1', 'Передохни немного...', 'http://www.ayzdorov.ru/images/Travi/pomidor.jpg');
          }
          break;
        case constants.TIMER_MODE_BREAK:
          this.startNewTimer(constants.TIMER_MODE_POMODORO, period);
          if (this.props.notificationsEnabled) {
            sendNotification('Отдых окончен', 'notyfy-2', 'За работу...', 'http://www.ayzdorov.ru/images/Travi/pomidor.jpg');
          }
          break;
      }
      
    }

    this.setState({
      minutes: utc(timeDifference).format("mm"),
      seconds: utc(timeDifference).format("ss")
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
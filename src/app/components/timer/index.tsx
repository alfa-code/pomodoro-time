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

// import TimerWorker from 'Src/app/workers/timer.worker';

import TimerWorker from 'Src/workers/timer.worker';

// style
import style from './style.module.scss';

class Timer extends Component<any, any> {
    timer: any;
    timerWorker: any;

    constructor(props: any) {
        super(props);
        this.timer = '';
        this.timerWorker = new TimerWorker();

        this.state = {
            phase: 'initial', // initial | started | paused
            hours: '00',
            minutes: '00',
            seconds: '00',
        };
    }

    componentDidMount = () => {
        this.timerWorker.onmessage = (event: any) => {
            const { type, payload } = event.data;
            switch (type) {
                case 'time': {
                    const { minutes, seconds } = payload;
                    this.setState({ minutes, seconds });
                    break;
                }
                case 'phase': {
                    const { phase } = payload;
                    this.setState({ phase });
                    break;
                }
                default: {}
            }
        };
    }

    componentDidUpdate() {
        console.log('this.state', this.state);
    }

    startOrPauseTimer = () => {
        const { phase } = this.state;
        if (phase === 'initial') {
            this.timerWorker.postMessage({
                type: 'action',
                payload: {
                    command: 'start',
                },
            });
        } else if (phase === 'started') {
            this.timerWorker.postMessage({
                type: 'action',
                payload: {
                    command: 'pause',
                },
            });
        } else if (phase === 'paused') {
            this.timerWorker.postMessage({
                type: 'action',
                payload: {
                    command: 'resume',
                },
            });
        }
        
    }

    reloadTimer = () => {
        this.timerWorker.postMessage({
            type: 'action',
            payload: {
                command: 'reload',
            },
        });
    }

    render() {
        const { phase } = this.state;
        const playIcon = (phase === 'started') ? svgIconPause : svgIconPlay;

        return (
            <div
                className={style.container}
            >
                <div
                    className={style.controlButton}
                    onClick={ this.startOrPauseTimer }
                    // onKeyPress={(e) => {
                    //   this.checkKeyPress(e, this.controlButtonOnClick);
                    // }}
                    role="button"
                    tabIndex={0}
                >
                    <img src={ playIcon } alt="play button" />
                </div>
                <div className={style.timer}>
                    <div className={classnames(style.digit, style.hours, { [style.hidden]: (this.state.hours < 1) })}>
                        {this.state.hours}
                    </div>
                    <div className={classnames(style.digit, style.colon1, { [style.hidden]: (this.state.hours < 1) })}>
                        :
                    </div>
                    <div className={classnames(style.digit, style.minutes)}>
                        {this.state.minutes}
                    </div>
                    <div className={classnames(style.digit, style.colon2)}>
                        :
                    </div>
                    <div className={classnames(style.digit, style.seconds)}>
                        {this.state.seconds}
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
                    // onKeyPress={(e) => {
                    //   this.checkKeyPress(e, this.reloadTimer);
                    // }}
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

export default Timer;

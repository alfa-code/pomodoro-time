import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Store } from 'Src/store';
import { TimerState } from 'Src/reducers/timer';

// constants
// import * as constants from 'Src/constants';

// actions
// import sendNotification from 'Src/actions/sendNotification';
import {
    // setTimerSettings,
    startTimer,
    pauseTimer,
    resumeTimer,
    reloadTimer,
} from 'Src/actions/index';

// svg icons
import svgIconReload from 'Src/static/svg/reset.svg';
import svgIconPlay from 'Src/static/svg/play.svg';
import svgIconPause from 'Src/static/svg/pause.svg';
// image
// import pomodoroImage from 'Src/static/images/notify/notify.png';

import classnames from 'classnames';

// import TimerWorker from 'Src/app/workers/timer.worker';

import TimerWorker from 'Src/workers/timer.worker';

// style
import style from './style.module.scss';

type Props = {
    timer: TimerState;
}

class TimerComponent extends Component<Props, any> {
    // timer: any;
    // timerWorker: any;

    constructor(props: any) {
        super(props);
    }

    startOrPauseTimer = () => {
        const {
            timerPhase
        } = this.props.timer;

        if (timerPhase === 'initial') {
            startTimer();
        } else if (timerPhase === 'started') {
            pauseTimer();
        } else if (timerPhase === 'paused') {
            resumeTimer();
        }
    }

    reloadTimer = () => {
        reloadTimer();
    }

    render() {
        const { timerPhase, pomodoroPhase, time: {
            hours = '',
            minutes,
            seconds
        } } = this.props.timer;

        const playIcon = (timerPhase === 'started') ? svgIconPause : svgIconPlay;

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
                    <div className={classnames(style.digit, style.hours, { [style.hidden]: (hours.length < 1) })}>
                        {hours}
                    </div>
                    <div className={classnames(style.digit, style.colon1, { [style.hidden]: (hours.length < 1) })}>
                        :
                    </div>
                    <div className={classnames(style.digit, style.minutes)}>
                        {minutes}
                    </div>
                    <div className={classnames(style.digit, style.colon2)}>
                        :
                    </div>
                    <div className={classnames(style.digit, style.seconds)}>
                        {seconds}
                    </div>
                    <div className={classnames(style.label, style.hoursLabel, { [style.hidden]: (hours.length < 1) })}>
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
                <span className={ style.phaseLabel }>
                    { pomodoroPhase }
                </span>
            </div>
        );
    }
}

function mapStateToProps(state: Store) {
    return {
        timer: state.timer,
    };
}

export const Timer = connect(mapStateToProps)(TimerComponent);

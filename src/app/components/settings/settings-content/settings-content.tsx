import React, { Component } from 'react';
import * as Cookies from 'js-cookie';

import * as constants from 'Src/constants';

import RadioButton from 'Src/app/components/common/radio-button';

// import { setTimerSettings } from 'Src/actions/index';

import { dispatchTimerWorkerSettings } from 'Src/actions/timer';

import style from './style.module.scss';

const regexp = /^\d+$|^$/;

export class SettingsContent extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeRingtone: Cookies.get('ringtone'),
            timerPeriod: Cookies.get('timerPeriod') || '',
            timerBreak: Cookies.get('timerBreak') || '',
            ringtones: [
                constants.RINGTONE_1,
                constants.RINGTONE_2,
                constants.RINGTONE_3,
                constants.RINGTONE_4,
                constants.RINGTONE_5,
            ],
        };
    }

    setRingtoneCookie = (name: any) => {
        const { playAudioNotification } = this.props;
        Cookies.set('ringtone', name);
        this.setState({
            activeRingtone: name,
        });
        playAudioNotification();
    }

    setNewPeriodValue = (e: any) => {
        e.preventDefault();

        let { value } = e.target;
        const test = regexp.test(value);

        value = parseInt(e.target.value, 10);

        if (test) {
            if (isNaN(value)) {
                Cookies.set('timerPeriod', `${25}`);
                // this.startNewTimer(25, this.state.timerBreak);
                this.setState({ timerPeriod: '' });
            } else if (value >= 999) {
                value = 999;
                Cookies.set('timerPeriod', value);
                this.setState({ timerPeriod: value });
                // this.startNewTimer(value, this.state.timerBreak);

                dispatchTimerWorkerSettings({
                    options: {
                        break: (value * 60000)
                    }
                });
            } else {
                Cookies.set('timerPeriod', value);
                this.setState({ timerPeriod: value });
                // this.startNewTimer(value, this.state.timerBreak);

                dispatchTimerWorkerSettings({
                    options: {
                        pomodoro: (value * 60000)
                    }
                });
            }
        }

        e.target.value = this.state.timerPeriod;
    }

    setNewBreakValue = (e: any) => {
        e.preventDefault();

        let { value } = e.target;
        const test = regexp.test(value);

        value = parseInt(e.target.value, 10);

        if (test) {
            if (isNaN(value)) {
                Cookies.set('timerBreak', `${5}`);
                //this.startNewTimer(this.state.timerPeriod, 5);
                this.setState({ timerBreak: '' });
            } else if (value >= 60) {
                value = 59;
                Cookies.set('timerBreak', value);
                // this.startNewTimer(this.state.timerPeriod, value);
                this.setState({ timerBreak: value });
            } else {
                Cookies.set('timerBreak', value);
                // this.startNewTimer(this.state.timerPeriod, value);
                this.setState({ timerBreak: value });
            }
        }

        e.target.value = this.state.timerBreak;
    }

    //   startNewTimer = (timerPeriod: any, timerBreak: any) => {
    //     dispatchTimerSettings({
    //       mode: constants.TIMER_MODE_POMODORO,
    //       timerState: constants.TIMER_STATE_PAUSE,
    //       timerActivated: true,
    //       timeStart: Date.now(),
    //       timeEnd: Date.now() + (timerPeriod * 60 * 1000),
    //       timeDifference: timerPeriod * 60 * 1000,
    //       period: timerPeriod,
    //       breakTime: timerBreak,
    //     });
    //   }

    renderRingtoneButtons = () => (
        this.state.ringtones.map((item: any, i: any) => {
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

    setNewTimerSettings = (action: { type: 'setPeriod' | 'setBreak' | 'setSound', event: any }) => {
        const { type, event } = action;
        switch (type) {
            case 'setPeriod': {
                this.setNewPeriodValue(event);
                break;
            }
            case 'setBreak': {
                this.setNewBreakValue(event);
                break;
            }
            case 'setSound': {
                break;
            }
        }
    }

    render() {
        return (
            <div className={style.container}>
                <h2 className={style.title}>
                    Settings
                </h2>
                <p>
                    Settings are saved automatically
                </p>
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
                            // onChange={this.setNewPeriodValue}
                            onChange={ (e) => {
                                this.setNewTimerSettings({
                                    type: 'setPeriod',
                                    event: e
                                })
                            }}
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
                            // onChange={this.setNewBreakValue}
                            onChange={ (e) => {
                                this.setNewTimerSettings({
                                    type: 'setBreak',
                                    event: e
                                })
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

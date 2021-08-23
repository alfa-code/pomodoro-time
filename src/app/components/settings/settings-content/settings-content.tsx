import React, { Component } from 'react';
import * as Cookies from 'js-cookie';

import * as constants from 'Src/constants';

import RadioButton from 'Src/app/components/common/radio-button';

// import { setTimerSettings } from 'Src/actions/index';

import { dispatchTimerWorkerSettings } from 'Src/actions/timer';
import { dispatchPlayAudio, dispatchCreateAudioContext } from 'Src/actions/audio';

import testAudio1 from 'Src/static/sounds/alert_1.mp3';
import testAudio2 from 'Src/static/sounds/alert_2.mp3';
import testAudio3 from 'Src/static/sounds/alert_3.mp3';
import testAudio4 from 'Src/static/sounds/alert_4.mp3';
import testAudio5 from 'Src/static/sounds/alert_5.mp3';

const audioTracks = {
    testAudio1,
    testAudio2,
    testAudio3,
    testAudio4,
    testAudio5,
}

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

    setRingtoneCookie = (ringtoneId: number, ringtoneName: string) => {
        Cookies.set('ringtone', `${ringtoneName}`);

        this.setState({
            activeRingtone: ringtoneName,
        });

        // @ts-ignore
        let audioUrl = audioTracks[`testAudio${ringtoneId}`];

        dispatchCreateAudioContext(audioUrl);
        dispatchPlayAudio();
    }

    setNewPeriodValue = (e: any) => {
        e.preventDefault();

        let { value } = e.target;
        const test = regexp.test(value);

        value = parseInt(e.target.value, 10);

        if (test) {
            if (isNaN(value)) {
                Cookies.set('timerPeriod', `${25}`);
                this.setState({ timerPeriod: '' });
            } else if (value >= 999) {
                value = 999;
                Cookies.set('timerPeriod', value);
                this.setState({ timerPeriod: value });

                dispatchTimerWorkerSettings({
                    options: {
                        pomodoro: (value * 60000)
                    }
                });
            } else {
                Cookies.set('timerPeriod', value);
                this.setState({ timerPeriod: value });

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
                this.setState({ timerBreak: '' });

                dispatchTimerWorkerSettings({
                    options: {
                        break: (5 * 60000)
                    }
                });
            } else if (value >= 60) {
                value = 59;
                Cookies.set('timerBreak', value);
                this.setState({ timerBreak: value });

                dispatchTimerWorkerSettings({
                    options: {
                        break: (value * 60000)
                    }
                });
            } else {
                Cookies.set('timerBreak', value);
                this.setState({ timerBreak: value });

                dispatchTimerWorkerSettings({
                    options: {
                        break: (value * 60000)
                    }
                });
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
                const { ringtoneName, ringtoneId  } = event;
                this.setRingtoneCookie(ringtoneId, ringtoneName);
                break;
            }
        }
    }

    renderRingtoneButtons = () => (
        this.state.ringtones.map((ringtoneName: any, i: any) => {
            const active = (this.state.activeRingtone === ringtoneName);
            const ringtoneId = i + 1;
            return (
                <RadioButton
                    label={`Ringtone ${ringtoneId}`}
                    onClick={ (_e: any) => {
                        this.setNewTimerSettings({
                            type: 'setSound',
                            event: {
                                ringtoneName,
                                ringtoneId,
                            }
                        })
                    }}
                    key={ ringtoneName }
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
                <p>
                    Settings are saved automatically
                </p>
                <h3>
                    Ringtone
                </h3>
                <div className={style.ringtoneContainer}>
                    { this.renderRingtoneButtons() }
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

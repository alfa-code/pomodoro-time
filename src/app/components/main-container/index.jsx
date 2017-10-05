import React, { Component } from 'react';
import Header from '@src/app/components/header';
import Logo from '@src/app/components/logo';
import Share from '@src/app/components/share';
import TomatLayout from '@src/app/components/tomat-layout';
import SettingsButton from '@src/app/components/settings/settings-button';

// smart containers
import Notifications from '@src/app/containers/notifications';
import Timer from '@src/app/containers/timer';
import Popup from '@src/app/containers/popup';

import { YMInitializer } from 'react-yandex-metrika';

import style from './style.scss'

export default class MainContainer extends Component {
  render() {
    return (
      <div className={style.container}>
        <Logo/>
        <Notifications/>
        <Timer/>
        <TomatLayout/>
        <Share/>
        <Popup/>
        <SettingsButton />
        <YMInitializer accounts={[46177308]} />
      </div>
    );
  }
}
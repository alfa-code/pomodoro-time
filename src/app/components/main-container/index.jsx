import React, { Component } from 'react';
import Header from '@src/app/components/header';
import Logo from '@src/app/components/logo';
import Notifications from '@src/app/components/notifications';
import style from './style.scss'

export default class MainContainer extends Component {
  render() {
    return (
      <div className={style.container}>
        <Logo/>
        <Notifications/>
      </div>
    );
  }
}
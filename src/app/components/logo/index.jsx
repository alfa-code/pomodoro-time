import React, { Component } from 'react';
import Header from '@src/app/components/header';

import style from './style.scss'

export default class Logo extends Component {
  render() {
    return (
      <a href="#" className={style.logo}>
        Pomodoro<span className={style.beta}>beta</span>
      </a>
    );
  }
}
import React, { Component } from 'react';

// style
import style from './style.scss';

export default class Logo extends Component {
  render() {
    return (
      <a
        href="#"
        className={style.logo}
      >
        <span>
          Pomodoro Time
        </span>
        <span className={style.beta}>
          beta
        </span>
      </a>
    );
  }
}

import React from 'react';

// style
import style from './style.scss';

export default function Logo() {
  return (
    <a
      href="/"
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

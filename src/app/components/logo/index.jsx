import React from 'react';

// style
import style from './style.scss';

export default function Logo() {
  return (
    <a
      href="/"
      className={style.logo}
    >
      Pomodoro Time
    </a>
  );
}

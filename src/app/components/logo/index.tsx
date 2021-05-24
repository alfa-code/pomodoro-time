import React from 'react';

import style from './style.module.scss';

export function Logo() {
  return (
    <a
      href="/"
      className={style.logo}
    >
      Pomodoro Time
    </a>
  );
}

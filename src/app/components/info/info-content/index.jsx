import React from 'react';

// styles
import style from './style.scss';

const email = 'hydrochk@yandex.ru';
const text = [
  'Hello! My name is Alex or Hydrock (Github).',
  'If you have any comments or suggestions, you can send them to the address',
  'You can also send proposals directly to the project on the ',
];

export default function InfoContent() {
  return (
    <div className={style.container}>
      <div className={style.row}>
        <img
          src="https://avatars2.githubusercontent.com/u/20814779?s=460&v=4"
          alt="avatar"
          className={style.avatar}
        />
        <div className={style.row}>
          {text[0]}
        </div>
        <div className={style.row}>
          {text[1]} <a href={`mailto:${email}`}>hydrochk@yandex.ru</a>
        </div>
        <div className={style.row}>
          {text[2]}
          <a
            href="https://github.com/Hydrock/pomodoro"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </div>
      </div>
    </div>
  );
}

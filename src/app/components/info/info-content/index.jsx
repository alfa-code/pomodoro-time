import React from 'react';

// styles
import style from './style.scss';

const googleHref = 'https://docs.google.com/forms/d/e/1FAIpQLSdISNZniiUSVbYPMgvGfJCl-SWyqDhnKvwRpfW_ikKgocCT0A/viewform?usp=sf_link';

export default function InfoContent() {
  return (
    <div className={style.container}>
      <div className={style.row}>
        <img
          src="https://avatars2.githubusercontent.com/u/20814779?s=460&v=4"
          alt="avatar"
          className={style.avatar}
        />
        Hello! My name is Alexey Vechkanov or Hydrock (Github).
        I will be very happy if you leave your comment in google forms below.
      </div>
      <div className={style.row}>
        <a
          href={googleHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Leave your wish (Google Forms)
        </a>
      </div>
    </div>
  );
}

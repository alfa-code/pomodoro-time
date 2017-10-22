import React, { Component } from 'react';

import style from './style.scss';

export default class InfoContent extends Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.row}>
          <img
            src="https://avatars2.githubusercontent.com/u/20814779?s=460&v=4"
            alt="avatar"
            className={style.avatar}
          />
          Hello! My name is Alexey Vechkanov or Hydrock (Github). I will be very happy if you leave your comment in google forms below.
        </div>
        <div className={style.row}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdISNZniiUSVbYPMgvGfJCl-SWyqDhnKvwRpfW_ikKgocCT0A/viewform?usp=sf_link"
            target="_blank"
          >
            Leave your wish (Google Forms)
          </a>
        </div>
      </div>
    );
  }
}
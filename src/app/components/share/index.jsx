import React, { Component } from 'react';
import ShareButton from './share-button'
import iconFacebook from '@src/static/media/svg/facebook.svg';
import iconTwitter from '@src/static/media/svg/twitter.svg';
import style from './style.scss';

export default class Share extends Component {
  getFacebooLink () {
    const href = window.location.href;
    const link = `https://www.facebook.com/sharer/sharer.php?u=${href}`;
    return link;
  }

  getTwitterLink () {
    const text = 'Pomodoro'
    let href = window.location.href;
    href = href.replace(/\:+/, '%3A').replace(/\/+/, '%2F');
    const link = `https://twitter.com/intent/tweet?url=${href}&text=${text}`;
    return link;
  }

  render() {
    return (
      <div className={style.container}>
        <ShareButton
          text='Share'
          icon={iconFacebook}
          link={this.getFacebooLink()}
        />
        <ShareButton
          text='Tweet'
          icon={iconTwitter}
          link={this.getTwitterLink()}
        />
      </div>
    )
  }
}
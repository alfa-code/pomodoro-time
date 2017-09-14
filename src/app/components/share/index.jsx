import React, { Component } from 'react';

import ShareButton from './share-button'

import iconFacebook from '@src/static/media/svg/facebook.svg';
import iconTwitter from '@src/static/media/svg/twitter.svg';

import style from './style.scss';

export default class Share extends Component {
  render() {
    return (
      <div className={style.container}>
        <ShareButton
          text='Share'
          icon={iconFacebook}
          link='https://www.facebook.com/sharer/sharer.php?u=pomodoro.com'
        />
        <ShareButton
          text='Tweet'
          icon={iconTwitter}
          link='https://twitter.com/intent/tweet?url=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button&text=12321'
        />
      </div>
    )
  }
}
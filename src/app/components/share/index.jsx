import React, { Component } from 'react';

import ShareButton from './share-button'

import iconFacebook from '@src/static/media/svg/facebook.svg';
import iconTwitter from '@src/static/media/svg/twitter.svg';

import style from './style.scss';

export default class Share extends Component {
  render() {
    return (
      <div className={style.container}>
        <ShareButton text='Share' icon={iconFacebook} />
        <ShareButton text='Tweet' icon={iconTwitter} />
      </div>
    )
  }
}
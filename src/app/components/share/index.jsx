import React, { Component } from 'react';
import ShareButton from './share-button'

import SvgIcon from '@src/app/components/common/svg-icon';
import svgIconReload from '@src/static/svg/reset.svg';

import iconFacebook from '@src/static/media/svg/facebook.svg';
import iconTwitter from '@src/static/media/svg/twitter.svg';
import iconVkontakte from '@src/static/media/svg/vkontakte.svg';

import promoImg from '@src/static/media/img/promo/promo.jpg';

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

  getVkLink () {
    let href = window.location.href;
		let url  = 'http://vkontakte.ru/share.php?';
		url += 'url='          + href;
		url += '&title='       + 'Pomodoro-Time';
		url += '&description=' + 'Time management service';
		url += '&image='       + href + promoImg;
		url += '&noparse=true';
    return url
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
        <ShareButton
          text='Share'
          icon={iconVkontakte}
          link={this.getVkLink()}
        />
      </div>
    )
  }
}
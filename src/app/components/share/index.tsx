import React, { Component } from 'react';

// svg icons
import iconFacebook from 'Src/static/media/svg/facebook.svg';
import iconTwitter from 'Src/static/media/svg/twitter.svg';
import iconVkontakte from 'Src/static/media/svg/vkontakte.svg';

// image
import promoImg from 'Src/static/media/img/promo/promo.jpg';

// components
import ShareButton from './share-button';

// style
import style from './style.module.scss';

export default class Share extends Component {
  getFacebooLink = () => {
    const { href } = window.location;
    const link = `https://www.facebook.com/sharer/sharer.php?u=${href}`;
    return link;
  }

  getTwitterLink = () => {
    const text = 'Pomodoro';
    let { href } = window.location;
    href = href.replace(/:+/, '%3A').replace(/\/+/, '%2F');
    const link = `https://twitter.com/intent/tweet?url=${href}&text=${text}`;
    return link;
  }

  getVkLink = () => {
    const { href } = window.location;
    return [
      'http://vkontakte.ru/share.php?',
      `url=${href}`,
      '&title=Pomodoro-Time',
      '&description=Time management service',
      `&image=${href + promoImg}`,
      '&noparse=true',
    ].join('');
  }

  render() {
    return (
      <div className={style.container}>
        <ShareButton
          text="Share"
          icon={iconFacebook}
          link={this.getFacebooLink()}
        />
        <ShareButton
          text="Tweet"
          icon={iconTwitter}
          link={this.getTwitterLink()}
        />
        <ShareButton
          text="Share"
          icon={iconVkontakte}
          link={this.getVkLink()}
        />
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './style.scss';

import imageLeft from '@src/static/media/tomat-left.png';
import imageRight from '@src/static/media/tomat-right.png';

export default class TomatLayout extends Component {
  render() {
    const tomatTopStyle = classnames(style.tomatImg, style.tomatImgSmall, style.tomatImgTop);
    const tomatMiddleStyle = classnames(style.tomatImg, style.tomatImgMedium, style.tomatImgMiddle);
    const tomatBottomStyle = classnames(style.tomatImg, style.tomatImgBig, style.tomatImgBottom);
    return (
      <div className={style.container}>
        <img
          src={imageLeft}
          alt="pomidoro"
          className={tomatTopStyle}
        />
        <img
          src={imageRight}
          alt="pomidoro"
          className={tomatMiddleStyle}
        />
        <img
          src={imageLeft}
          alt="pomidoro"
          className={tomatBottomStyle}
        />
      </div>
    )
  }
}
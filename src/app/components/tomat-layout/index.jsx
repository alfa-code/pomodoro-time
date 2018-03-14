import React, { Component } from 'react';
import PropTypes from 'prop-types';

// style
import classnames from 'classnames';
import style from './style.scss';

// images
import imageLeft from '@src/static/media/tomat-left.png';
import imageRight from '@src/static/media/tomat-right.png';

export default class TomatLayout extends Component {
  render() {
    const tomatTopStyle = classnames(style.tomatImg, style.tomatImgSmall);
    const tomatMiddleStyle = classnames(style.tomatImg, style.tomatImgMedium);
    const tomatBottomStyle = classnames(style.tomatImg, style.tomatImgBig);
    return (
      <div className={style.container}>
        <div className={style.tomatTopWrap}>
          <img
            src={imageLeft}
            alt="pomidoro"
            className={tomatTopStyle}
          />
        </div>
        <div className={style.tomatMiddleWrap}>
          <img
            src={imageRight}
            alt="pomidoro"
            className={tomatMiddleStyle}
          />
        </div>
        <div className={style.tomatBottomWrap}>
          <img
            src={imageLeft}
            alt="pomidoro"
            className={tomatBottomStyle}
          />
        </div>
      </div>
    )
  }
}
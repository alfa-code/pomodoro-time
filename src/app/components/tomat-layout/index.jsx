import React from 'react';

// images
import imageLeft from 'Src/static/media/tomat-left.png';
import imageRight from 'Src/static/media/tomat-right.png';

// style
import classnames from 'classnames';
import style from './style.scss';

export default function TomatLayout() {
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
  );
}

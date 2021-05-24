import React from 'react';

// style
import style from './style.module.scss';

export default function ShareButton(props) {
  return (
    <a
      className={style.button}
      href={props.link}
      target="_blank"
    >
      <img
        src={props.icon}
        className={style.icon}
        alt="Share"
      />
      <span>
        {props.text}
      </span>
    </a>
  );
}

ShareButton.defaultProps = {
  icon: 'icon',
  text: 'text',
  link: '#',
};

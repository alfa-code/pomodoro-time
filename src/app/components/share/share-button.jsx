import React from 'react';
import PropTypes from 'prop-types';

// style
import style from './style.scss';

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

ShareButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
};

ShareButton.defaultProps = {
  icon: 'icon',
  text: 'text',
  link: '#',
};

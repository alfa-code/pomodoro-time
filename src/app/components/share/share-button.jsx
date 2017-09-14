import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

export default class ShareButton extends Component {
  render() {
    return (
      <a href="#" className={style.button}>
        <img
          src={this.props.icon}
          alt={this.props.text}
          className={style.icon}
        />
        <span>
          {this.props.text}
        </span>
      </a>
    )
  }
}

ShareButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string
};
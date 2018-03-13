import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

import SvgIcon from '@src/app/components/common/svg-icon';

export default class ShareButton extends Component {
  render() {
    return (
      <a href="#" className={style.button} href={this.props.link} target='_blank'>
        {/* <SvgIcon
          glyph={this.props.icon}
          className={style.icon}
        /> */}
        <img src={this.props.icon} className={style.icon} alt={'Share'}/>
        <span>
          {this.props.text}
        </span>
      </a>
    )
  }
}

ShareButton.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string,
  link: PropTypes.string
};
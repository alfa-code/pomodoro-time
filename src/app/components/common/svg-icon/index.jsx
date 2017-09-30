import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './style.scss';

export default class SvgIcon extends Component {
  render() {
    const className = classnames(style.container, this.props.className);
    const { glyph } = this.props;
    return (
      <div className={className}>
        <svg>
          <use xlinkHref={glyph} />
        </svg>
      </div>
    )
  }
}

SvgIcon.propTypes = {
  glyph: PropTypes.object,
  className: PropTypes.string
};
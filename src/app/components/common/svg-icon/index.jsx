import React, { Component } from 'react';
import classnames from 'classnames';
import style from './style.scss';

export default class SvgIcon extends Component {
  checkKeyPress = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback();
    }
  }

  render() {
    const className = classnames(style.container, this.props.className);
    const { glyph } = this.props;
    return (
      <div
        className={className}
        onClick={this.props.onClick}
        onKeyPress={(e) => {
          this.checkKeyPress(e, this.props.onClick);
        }}
        role="button"
        tabIndex={0}
      >
        <svg>
          <use xlinkHref={glyph} />
        </svg>
      </div>
    );
  }
}

SvgIcon.defaultProps = {
  glyph: {},
  className: '',
  onClick: () => {},
};

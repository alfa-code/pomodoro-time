import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './style.scss';

export default class RadioButton extends Component {
  renderLabel () {
    const label = this.props.label
    if (label) {
      return (
        <span className={style.label}>
          {label}
        </span>
      )
    } else {
      return null;
    }
  }

  render() {
    const radioStyle = classnames(style.radio, {
      [style.active]: this.props.active
    })
    return (
      <div className={
        classnames(style.container, this.props.className)
      }>
        <div className={radioStyle} onClick={this.props.onClick}>
          <div className={style.dot}></div>
        </div>
        {this.renderLabel()}
      </div>
    )
  }
}

RadioButton.propTypes = {
  onClick: PropTypes.any,
  label: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
};
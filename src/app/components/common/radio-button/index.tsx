import React, { Component } from 'react';

// styles
import classnames from 'classnames';
import style from './style.module.scss';

export default class RadioButton extends Component<any> {
  checkKeyPress = (e: any, callback: any) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback();
    }
  }

  renderLabel = () => {
    const { label } = this.props;
    if (label) {
      return (
        <span className={style.label}>
          {label}
        </span>
      );
    }
    return null;
  }

  render() {
    const radioStyle = classnames(style.radio, {
      [style.active]: this.props.active,
    });
    const containerStyle = classnames(style.container, this.props.className);

    return (
      <div className={containerStyle}>
        <div
          className={radioStyle}
          onClick={this.props.onClick}
          onKeyPress={(e) => {
            this.checkKeyPress(e, this.props.onClick);
          }}
          role="button"
          tabIndex={0}
        >
          <div className={style.dot} />
        </div>
        {this.renderLabel()}
      </div>
    );
  }
}

import React, { Component } from 'react';
// actions
import * as actions from 'Src/actions/index';
import * as Cookies from 'js-cookie';

// styles
import classnames from 'classnames';
import style from './style.scss';

export default class Switcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.enabled,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      status: props.enabled,
    });
  }

  setTriggerClass = () => {
    const { status } = this.state;
    return status ? style.switcherContainerOn : style.switcherContainerOff;
  };

  setTriggerClassDisabled = () => {
    const { permission } = this.props;
    if (permission === 'denied') {
      Cookies.set('notificationsEnabled', 'false');
      return style.switcherDisabled;
    }
    return null;
  }

  getSwitcherText = () => {
    const { status } = this.state;
    return status ? 'On' : 'Off';
  };

  getSwitcherTextClass = () => {
    const { status } = this.state;
    return status ? style.switcherTextOn : style.switcherTextOff;
  }

  toggleSwitcher = () => {
    actions.setNotificationsPermission(this.state.status);

    if (!this.props.enabled) {
      Cookies.set('notificationsEnabled', 'true');
    } else {
      Cookies.set('notificationsEnabled', 'false');
    }
  }

  checkKeyPress = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback();
    }
  }

  render() {
    const switcherClass = classnames(
      style.switcherContainer,
      this.setTriggerClass(),
      this.setTriggerClassDisabled(),
    );
    const switcherTextClass = classnames(style.switcherText, this.getSwitcherTextClass());
    return (
      <div
        className={switcherClass}
        onClick={this.toggleSwitcher}
        onKeyPress={(e) => {
          this.checkKeyPress(e, this.toggleSwitcher);
        }}
        role="button"
        tabIndex={0}
      >
        <div className={style.switcherTrigger} />
        <div className={switcherTextClass}>
          {this.getSwitcherText()}
        </div>
      </div>
    );
  }
}

Switcher.defaultProps = {
  enabled: false,
  permission: 'default',
};

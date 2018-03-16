import React, { Component } from 'react';

// constants
import * as constants from 'src/constants';

// actions
import { setPopupSettings } from 'src/actions/index';

// style
import style from './style.scss';

export default class SettingsButton extends Component {
  showPopup = () => {
    setPopupSettings({
      openState: true,
      content: constants.POPUP_SETTINGS,
    });
  }

  checkKeyPress = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback();
    }
  }

  render() {
    return (
      <button
        className={style.icon}
        onClick={this.showPopup}
        onKeyPress={(e) => {
          this.checkKeyPress(e, this.showPopup);
        }}
      />
    );
  }
}


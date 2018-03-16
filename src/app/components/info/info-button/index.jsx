import React, { Component } from 'react';

// constants
import * as constants from 'src/constants';

// actions
import { setPopupSettings } from 'src/actions/index';

// styles
import style from './style.scss';

export default class InfoButton extends Component {
  checkKeyPress = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback();
    }
  }

  showPopup = () => {
    setPopupSettings({
      openState: true,
      content: constants.POPUP_INFO,
    });
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

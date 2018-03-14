import React, { Component } from 'react';

// constants
import * as constants from '@src/constants.js'

// svg icons
import SvgIcon from '@src/app/components/common/svg-icon';
import iconSettings from '@src/static/svg/settings.svg?file-loader';

// actions
import { setPopupSettings } from '@src/actions/index.js';

// style
import style from './style.scss';

export default class SettingsButton extends Component {
  showPopup () {
    setPopupSettings({
      openState: true,
      content: constants.POPUP_SETTINGS
    })
  }

  render() {
    // return (
    //   <SvgIcon
    //     glyph={iconSettings}
    //     className={style.icon}
    //     onClick={this.showPopup}
    //   />
    // );
    return (
      <img
        src={iconSettings}
        className={style.icon}
        alt={'Settings'}
        onClick={this.showPopup}
      />
    );
  }
}
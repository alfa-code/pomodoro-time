import React, { Component } from 'react';
import style from './style.scss'

import * as constants from '@src/constants.js'

import SvgIcon from '@src/app/components/common/svg-icon';
import iconSettings from '@src/static/svg/settings.svg';

import Logo from '@src/app/components/logo';

// actions
import { setPopupSettings } from '@src/actions/index.js';

export default class SettingsButton extends Component {
  showPopup () {
    setPopupSettings({
      openState: true,
      content: constants.POPUP_SETTINGS
    })
  }

  render() {
    return (
      <SvgIcon
        glyph={iconSettings}
        className={style.icon}
        onClick={this.showPopup}
      />
    );
  }
}
import * as constants from '@src/constants.js'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss'

import SettingsContent from '@src/app/containers/settings/settings-content';
import InfoContent from '@src/app/components/info/info-content';

import SvgIcon from '@src/app/components/common/svg-icon';
import iconClose from '@src/static/svg/error.svg?file-loader';

// actions
import { setPopupSettings } from '@src/actions/index.js';

export default class Popup extends Component {
  closePopup () {
    setPopupSettings({
      openState: false,
      content: null
    })
  }

  renderContent () {
    const { content } = this.props.popup
    switch (content) {
      case constants.POPUP_SETTINGS:
        return <SettingsContent/>;
      case constants.POPUP_INFO:
        return <InfoContent/>;
      default:
        return null;
    }
  }

  render() {
    const { popup } = this.props;
    if (popup.openState) {
      return (
        <div className={style.wrapper}>
          <div className={style.popupContent}>
            {/* Content */}
            { this.renderContent() }
            {/* CloseButton */}
            {/* <SvgIcon
              glyph={iconClose}
              className={style.closeButton}
              onClick={this.closePopup}
            /> */}
            <img src={iconClose} className={style.closeButton} alt={'close Button'} onClick={this.closePopup}/>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

Popup.propTypes = {
  popup: PropTypes.object,
  content: PropTypes.any
};
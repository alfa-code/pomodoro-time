import * as constants from '@src/constants.js'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss'

import SettingsContent from '@src/app/components/settings/settings-content';

import SvgIcon from '@src/app/components/common/svg-icon';
import iconClose from '@src/static/svg/error.svg';

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
            <SvgIcon
              glyph={iconClose}
              className={style.closeButton}
              onClick={this.closePopup}
            />
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
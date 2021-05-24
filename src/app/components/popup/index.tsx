import React, { Component } from 'react';

// constants
import * as constants from 'Src/constants';

import SettingsContent from 'Src/app/containers/settings/settings-content';
import InfoContent from 'Src/app/components/info/info-content';

// style
import style from './style.module.scss';

export default class Popup extends Component<any> {
  defaultProps: any;
  
  closePopup = () => {
    const { setPopupSettingsCloseClear } = this.props;
    setPopupSettingsCloseClear();
  }

  checkKeyPress = (e: any, callback: any) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback();
    }
  }

  renderContent = () => {
    const { content } = this.props.popup;
    switch (content) {
      case constants.POPUP_SETTINGS:
        return <SettingsContent />;
      case constants.POPUP_INFO:
        return <InfoContent />;
      default:
        return <SettingsContent />;
    }
  }

  render() {
    const { popup } = this.props;
    if (popup.openState) {
      return (
        <div
          className={style.wrapper}
        >
          <div className={style.popupContent}>
            <div className={style.popupContentInner}>
              { this.renderContent() }
              <button
                className={style.closeButton}
                onClick={this.closePopup}
                onKeyPress={(e) => {
                  this.checkKeyPress(e, this.closePopup);
                }}
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

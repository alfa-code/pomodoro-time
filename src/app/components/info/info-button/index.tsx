import React, { Component } from 'react';
import { connect } from 'react-redux';

// constants
// import * as constants from 'Src/constants';

import { setPopupSettingsOpenInfo } from 'Src/actions/index';

import style from './style.module.scss';

class InfoButton extends Component<any> {
  checkKeyPress = (e: any, callback: any) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback();
    }
  }

  showPopup = () => {
    const { setPopupSettingsOpenInfo } = this.props;
    setPopupSettingsOpenInfo();
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    setPopupSettingsOpenInfo: () => {
      dispatch(setPopupSettingsOpenInfo())
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(InfoButton);

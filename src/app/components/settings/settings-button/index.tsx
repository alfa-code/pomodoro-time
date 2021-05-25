import React, { Component } from 'react';
import { connect } from 'react-redux';

// constants
// import * as constants from 'Src/constants';

// actions
import { setPopupSettingsOpenSettings } from 'Src/actions/index';

// style
import style from './style.module.scss';

class SettingsButton extends Component<any> {
  showPopup = () => {
    const { setPopupSettingsOpenSettings } = this.props;
    setPopupSettingsOpenSettings();
  }

  checkKeyPress = (e: any, callback: any) => {
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

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    setPopupSettingsOpenSettings:
      () => {
        dispatch(setPopupSettingsOpenSettings())
      } 
  }
}

export default connect(null, mapDispatchToProps)(SettingsButton);


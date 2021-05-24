import React, { Component } from 'react';
import { connect } from 'react-redux';

// constants
import * as constants from 'Src/constants';

// actions
import { setPopupSettingsOpenSettings } from 'Src/actions/index';

// style
import style from './style.module.scss';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPopupSettingsOpenSettings:
      () => {
        dispatch(setPopupSettingsOpenSettings())
      } 
  }
}

class SettingsButton extends Component {
  showPopup = () => {
    const { setPopupSettingsOpenSettings } = this.props;
    setPopupSettingsOpenSettings();
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

export default connect(null, mapDispatchToProps)(SettingsButton);


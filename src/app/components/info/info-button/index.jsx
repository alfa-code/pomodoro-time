import React, { Component } from 'react';
import { connect } from 'react-redux';

// constants
import * as constants from 'src/constants';

// actions
import { setPopupSettingsOpenInfo } from 'src/actions/index';

// styles
import style from './style.scss';

const mapDispatchToProps = dispatch => {
  return {
    setPopupSettingsOpenInfo: () => {
      dispatch(setPopupSettingsOpenInfo())
    }
  }
}

class InfoButton extends Component {
  checkKeyPress = (e, callback) => {
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

export default connect(
  null,
  mapDispatchToProps
)(InfoButton);

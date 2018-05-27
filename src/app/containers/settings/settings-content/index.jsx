import SettingsContent from 'src/app/components/settings/settings-content';
import { connect } from 'react-redux';

import { playAudioNotification } from 'src/actions/index';

function mapStateToProps(state) {
  return {
    period: state.timer.period,
    breakTime: state.timer.breakTime,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    playAudioNotification: () => {
      dispatch(playAudioNotification())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContent);

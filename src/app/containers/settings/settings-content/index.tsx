import SettingsContent from 'Src/app/components/settings/settings-content';
import { connect } from 'react-redux';

import { playAudioNotification } from 'Src/actions/index';

function mapStateToProps(state: any) {
  return {
    period: state?.timer?.period,
    breakTime: state?.timer?.breakTime,
  };
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    playAudioNotification: () => {
      dispatch(playAudioNotification())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContent);

import Timer from 'Src/app/components/timer';
import { connect } from 'react-redux';

// actions
import { playAudioNotification } from 'Src/actions/index';

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    playAudioNotification: () => {
      dispatch(playAudioNotification())
    }
  }
}

function mapStateToProps(state: any) {
  return {
    timer: state.timer,
    notificationsEnabled: state.notifications.notificationsEnabled,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

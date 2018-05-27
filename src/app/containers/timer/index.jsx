import Timer from 'src/app/components/timer';
import { connect } from 'react-redux';

// actions
import { playAudioNotification } from 'src/actions/index';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    playAudioNotification: () => {
      dispatch(playAudioNotification())
    }
  }
}

function mapStateToProps(state) {
  return {
    timer: state.timer,
    notificationsEnabled: state.notifications.notificationsEnabled,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

import SettingsContent from 'src/app/components/settings/settings-content';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    timer: state.timer,
  };
}

export default connect(mapStateToProps)(SettingsContent);

import SettingsContent from 'src/app/components/settings/settings-content';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    period: state.timer.period,
    breakTime: state.timer.breakTime,
  };
}

export default connect(mapStateToProps)(SettingsContent);

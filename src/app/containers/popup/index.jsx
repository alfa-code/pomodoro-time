import Popup from 'src/app/components/popup';
import { connect } from 'react-redux';

// actions
import { setPopupSettingsCloseClear } from 'src/actions/index';


function mapStateToProps(state) {
  return {
    popup: state.popup,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setPopupSettingsCloseClear:
      () => dispatch(setPopupSettingsCloseClear())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);

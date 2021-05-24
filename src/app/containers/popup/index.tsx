import Popup from 'Src/app/components/popup';
import { connect } from 'react-redux';

// actions
import { setPopupSettingsCloseClear } from 'Src/actions/index';

function mapStateToProps(state: any) {
  return {
    popup: state.popup,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setPopupSettingsCloseClear:
      () => dispatch(setPopupSettingsCloseClear())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);

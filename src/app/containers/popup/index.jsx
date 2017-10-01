import Popup from '@src/app/components/popup';
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    popup: state.popup,
  }
}

export default connect(mapStateToProps)(Popup);
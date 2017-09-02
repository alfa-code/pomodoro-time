import Timer from '@src/app/components/timer';
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    timer: state.timer
  }
}

export default connect(mapStateToProps)(Timer);
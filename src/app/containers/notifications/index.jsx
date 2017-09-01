import Notifications from '@src/app/components/notifications';
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(Notifications);
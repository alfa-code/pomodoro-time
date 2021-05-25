import { connect } from 'react-redux';

import Notifications from 'Src/app/components/notifications';

function mapStateToProps(state: any) {
  return {
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps)(Notifications);

import { combineReducers } from 'redux';

// reducers
import notifications from 'src/reducers/notifications';
import timer from 'src/reducers/timer';
import timer_v2 from 'src/reducers/timer-v2';
import popup from 'src/reducers/popup';

const rootReducer = combineReducers({
  notifications,
  timer,
  popup,
  timer_v2
});

export default rootReducer;

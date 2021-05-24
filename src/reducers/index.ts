import { combineReducers } from 'redux';

// reducers
import notifications from 'Src/reducers/notifications';
import timer from 'Src/reducers/timer';
import popup from 'Src/reducers/popup';

const rootReducer = combineReducers({
  notifications,
  timer,
  popup,
});

export default rootReducer;

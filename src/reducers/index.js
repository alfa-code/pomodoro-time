import { combineReducers } from 'redux';

// reducers
import notifications from 'src/reducers/notifications';
import timer from 'src/reducers/timer';
import popup from 'src/reducers/popup';

const rootReducer = combineReducers({
    notifications,
    timer,
    popup
});

export default rootReducer;

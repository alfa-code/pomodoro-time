import { createStore } from 'redux';
import rootReducer from 'src/reducers/index';

/* eslint no-underscore-dangle: 0 */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

window.store = store;

export default store;

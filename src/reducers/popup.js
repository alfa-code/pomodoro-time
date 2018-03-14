import * as constants from '@src/constants.js';

let initState = {
  openState: false,
  content: null
}

export default function popup(state = initState, action) {
  switch (action.type) {
    case constants.SET_POPUP_SETTINGS:
      state = Object.assign({}, state, action.payload);
      return state;
    default:
      return state
  }
}

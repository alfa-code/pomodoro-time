import { TIMER_V2 } from 'src/constants';

const initState = {

}

export default function timer(state = initState, action) {
    switch (action.type) {
      case TIMER_V2.set_settings:
        return state;
      default:
        return state;
    }
}

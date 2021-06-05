import { CREATE_AUDIO_CONTEXT, PLAY_AUDIO } from 'Src/constants';
import store from 'Src/store';

export function createAudioContextAC(soundUrl?: string) {
    const action: {
        type: string;
        payload?: {
            soundUrl: string;
        }
    } = {
        type: CREATE_AUDIO_CONTEXT,
    }

    if (typeof soundUrl === 'string') {
        action.payload = {
            soundUrl,
        }
    }

    return action;
}

export function dispatchCreateAudioContext(soundUrl?: string) {
    store.dispatch(createAudioContextAC(soundUrl));
}

export function playAudioAC() {
    return {
        type: PLAY_AUDIO,
    }
}

export function dispatchPlayAudio() {
    store.dispatch(playAudioAC());
}

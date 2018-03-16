import * as Cookies from 'js-cookie';
import * as constants from 'src/constants';

import testAudio1 from 'src/static/sounds/alert_1.mp3';
import testAudio2 from 'src/static/sounds/alert_2.mp3';
import testAudio3 from 'src/static/sounds/alert_3.mp3';
import testAudio4 from 'src/static/sounds/alert_4.mp3';
import testAudio5 from 'src/static/sounds/alert_5.mp3';

const ringtone = Cookies.get('ringtone');

if (!ringtone) {
  Cookies.set('ringtone', constants.RINGTONE_1);
}

const createAudioContext = require('ios-safe-audio-context');

const context = createAudioContext();

let buffer;
let source;
let destinationGlobal;

const play = () => {
  source = context.createBufferSource();
  source.buffer = buffer;
  destinationGlobal = context.destination;
  source.connect(destinationGlobal);
  source.start(0);
};

const loadSoundFile = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function onloadCallback() {
    context.decodeAudioData(
      this.response,
      (decodedArrayBuffer) => {
        buffer = decodedArrayBuffer;
        console.log('Sound notification...');
        play();
      }, (e) => {
        console.log('Error decoding file', e);
      },
    );
  };
  xhr.send();
};

// var stop = () => {
//   source.stop(0);
// };

const choiseSound = (name) => {
  switch (name) {
    case constants.RINGTONE_1:
      return testAudio1;
    case constants.RINGTONE_2:
      return testAudio2;
    case constants.RINGTONE_3:
      return testAudio3;
    case constants.RINGTONE_4:
      return testAudio4;
    case constants.RINGTONE_5:
      return testAudio5;
    default:
      return testAudio1;
  }
};

export default function audioNotification() {
  const ringtoneName = Cookies.get('ringtone');
  const ringtoneUrl = choiseSound(ringtoneName);
  loadSoundFile(ringtoneUrl);
}

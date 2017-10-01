import * as Cookies from "js-cookie";
import * as constants from '@src/constants.js'

var ringtone = Cookies.get('ringtone');
if (!ringtone) {
  Cookies.set('ringtone', constants.RINGTONE_1);
}

const createAudioContext = require('ios-safe-audio-context');

import testAudio_1 from '@src/static/sounds/alert_1.mp3';
import testAudio_2 from '@src/static/sounds/alert_2.mp3';
import testAudio_3 from '@src/static/sounds/alert_3.mp3';
import testAudio_4 from '@src/static/sounds/alert_4.mp3';
import testAudio_5 from '@src/static/sounds/alert_5.mp3';

var context = createAudioContext();
var buffer, source, destination; 
var loadSoundFile = function(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    context.decodeAudioData(this.response,
    function(decodedArrayBuffer) {
      buffer = decodedArrayBuffer;
      console.log('Sound notification...')
      play();
    }, function(e) {
      console.log('Error decoding file', e);
    });
  };
  xhr.send();
}

var play = function(){
  source = context.createBufferSource();
  source.buffer = buffer; 
  destination = context.destination;
  source.connect(destination);
  source.start(0);
}

var stop = function(){
  source.stop(0);
}

let choiseSound = (name) => {
  switch (name) {
    case constants.RINGTONE_1:
      return testAudio_1;
    case constants.RINGTONE_2:
      return testAudio_2;
    case constants.RINGTONE_3:
      return testAudio_3;
    case constants.RINGTONE_4:
      return testAudio_4;
    case constants.RINGTONE_5:
      return testAudio_5;
    default:
      return testAudio_1;
  }
}

export default function audioNotification () {
  let ringtoneName = Cookies.get('ringtone');
  let ringtoneUrl = choiseSound(ringtoneName);
  loadSoundFile(ringtoneUrl);
}
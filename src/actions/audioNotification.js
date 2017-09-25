const createAudioContext = require('ios-safe-audio-context');

import testAudio from '@src/static/sounds/alert_2.mp3'

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

loadSoundFile(testAudio);

export default function audioNotification () {
  play();
}
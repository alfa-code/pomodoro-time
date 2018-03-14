// for closure
let timeDifference,
    interval;

self.addEventListener('message', function(e) {
  timeDifference = e.data.timeDifference;
  timerInterval(e.data, timeDifference)
}, false);

function timerInterval (data, timeDifference) {

  if (data.startNewTimer || data.fromPauseToWarkTimer) {
    interval = setInterval( () => {
      minusSecond();
    }, 1000);
  } else if (data.timerOnPause || data.timerNotWork) {
    clearInterval(interval);
  }
}

function minusSecond () {
  let newTimeDifference = timeDifference - 1000;

  let workerMessage = {
    command: 'updateTimeDifference',
    newTimeDifference: newTimeDifference
  }
  
  self.postMessage(workerMessage);

  if (newTimeDifference === 0) {
    self.postMessage({command: 'playTimeoutSound'});
  }
}
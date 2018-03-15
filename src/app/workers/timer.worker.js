// for closure

console.log('Timer Worker loaded!');

let timeDifferenceGlobal;
let interval;

function minusSecond() {
  const newTimeDifference = timeDifferenceGlobal - 1000;

  const workerMessage = {
    command: 'updateTimeDifference',
    newTimeDifference,
  };

  self.postMessage(workerMessage);

  if (newTimeDifference === 0) {
    self.postMessage({ command: 'playTimeoutSound' });
  }
}

function timerInterval(data) {
  if (data.startNewTimer || data.fromPauseToWarkTimer) {
    interval = setInterval(() => {
      minusSecond();
    }, 1000);
  } else if (data.timerOnPause || data.timerNotWork) {
    clearInterval(interval);
  }
}

self.addEventListener('message', (e) => {
  timeDifferenceGlobal = e.data.timeDifference;
  timerInterval(e.data);
}, false);

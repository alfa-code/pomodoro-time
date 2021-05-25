// for closure

console.log('Timer Worker loaded!');

let timeDifferenceGlobal: any;
let interval: any;

function minusSecond() {
  const newTimeDifference = timeDifferenceGlobal - 1000;

  const workerMessage = {
    command: 'updateTimeDifference',
    newTimeDifference,
  };

  // @ts-ignore
  self.postMessage(workerMessage);

  if (newTimeDifference === 0) {
    // @ts-ignore
    self.postMessage({ command: 'playTimeoutSound' });
  }
}

function timerInterval(data: any) {
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

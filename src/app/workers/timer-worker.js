let timeDifference,
    interval;

self.addEventListener('message', function(e) {

  timeDifference = e.data.newProps.timeDifference;
  timerInterval(e.data, timeDifference)

}, false);

function timerInterval (data, timeDifference) {
  if (data.oldProps.timerActivated === false && data.newProps.timerActivated === true && data.newProps.timerState === 'working' ) {
    interval = setInterval( () => {
      minusSecond();
    }, 1000);
  } else if (data.oldProps.timerState === 'pause' && data.newProps.timerState === 'working' && data.newProps.timerActivated === true ) {
    interval = setInterval( () => {
      minusSecond();
    }, 1000);
  } else if (data.newProps.timerState !== 'working') {
    clearInterval(interval);
  } else if (data.newProps.timerActivated === false) {
    clearInterval(interval);
  } 
}


function minusSecond () {
  let newTimeDifference = timeDifference - 1000;

  let workerCommand = {
    command: 'updateTimeDifference',
    newTimeDifference: newTimeDifference
  }
  
  self.postMessage(workerCommand);
}
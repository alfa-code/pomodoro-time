const ctx: Worker = self as any;

let timerInterval: any = null;
let startTime: any;
let pauseTime: any;

let basePeriod = 15000; // 1 500 000
let breakPeriod = 5000; // 1 500 000
let currentPeriod = basePeriod;

type PomodoroPhase = 'work' | 'break';
let pomodoroPhase: PomodoroPhase = 'work';

function sendTime() {
    postMessage({
        type: 'time',
        payload: {
            minutes: formatTimeValue(getMinutesByPeriod(currentPeriod)),
            seconds: formatTimeValue(getSecondsByPeriod(currentPeriod)),
        }
    }, undefined);
}

sendTime();

function changePomodoroPhase(){
    switch (pomodoroPhase) {
        case 'work': {
            pomodoroPhase = 'break';
            currentPeriod = breakPeriod;
            postMessage({
                type: 'pomodoroPhase',
                payload: {
                    pomodoroPhase: 'break'
                }
            }, undefined);
            break;
        }
        case 'break': {
            pomodoroPhase = 'work';
            currentPeriod = basePeriod;
            postMessage({
                type: 'pomodoroPhase',
                payload: {
                    pomodoroPhase: 'work'
                }
            }, undefined);
            break;
        }
    }
}

function formatTimeValue(value: number | string) {
    let newValue = value.toString();
    if (newValue.length == 1){
        newValue = "0" + value;
    }
    return newValue;
}

function getMinutesByPeriod(basePeriod = 0) {
    const t0 = basePeriod % 60000;
    // console.log('t0', t0)
    const t1 = (basePeriod - t0) / 60;
    // console.log('t1', t1)
    return Math.floor(t1 / 1000);
}

function getSecondsByPeriod(basePeriod = 0) {
    const m0 = getMinutesByPeriod(basePeriod);
    // console.log('m0', m0);
    const m1 = basePeriod - (m0 * 60 * 1000 );
    // console.log('m1', m1);
    const m2 = m1 % 1000;
    // console.log('m2', m2);
    const m3 = m1 - m2;

    return Math.floor(m3 / 1000);
}

function myTimer(d0: any)
{
   // get current time
   var d=(new Date()).valueOf();
   // calculate time difference between now and initial time
   var diff = d-d0;
   // calculate number of minutes
   var minutes: any = Math.floor(diff/1000/60);
   // calculate number of seconds
   var seconds: any = Math.floor(diff/1000)-minutes*60;
   // if number of minutes less than 10, add a leading "0"
   minutes = minutes.toString();
   if (minutes.length == 1){
      minutes = "0"+minutes;
   }
   // if number of seconds less than 10, add a leading "0"
   seconds = seconds.toString();
   if (seconds.length == 1){
      seconds = "0"+seconds;
   }

   if (currentPeriod > 1000) {
       currentPeriod = currentPeriod - 1000;
   } else {
        changePomodoroPhase();
   }

   sendTime();
}

function startTimer() {
    startTime=(new Date()).valueOf();
    timerInterval=setInterval(function(){myTimer(startTime)}, 1000);

    postMessage({
        type: 'phase',
        payload: {
            phase: 'started'
        }
    }, undefined);
}

function reloadTimer() {
    clearInterval(timerInterval);

    postMessage({
        type: 'phase',
        payload: {
            phase: 'initial'
        }
    }, undefined);
}

function pauseTimer() {
    pauseTime=(new Date()).valueOf();
    clearInterval(timerInterval);

    postMessage({
        type: 'phase',
        payload: {
            phase: 'paused'
        }
    }, undefined);
}

function resumeTimer() {
    const currentTime = (new Date()).valueOf();
    const diff = pauseTime - startTime;
    startTime = currentTime - diff;  // (pauseTime - startTime) + startTime;
    timerInterval=setInterval(function(){myTimer(startTime)}, 1000);

    postMessage({
        type: 'phase',
        payload: {
            phase: 'started'
        }
    }, undefined);
}

ctx.addEventListener("message", (event) => {
    console.log('event.data', event.data);
    const { type, payload } = event.data;

    switch (type) {
        case 'action': {
            console.log('Пришло сообщение в worker - тип сообщения - action');
            const { command } = payload;
            if (command === 'start') {
                startTimer();
            }
            if (command === 'reload') {
                reloadTimer();
            }
            if (command === 'pause') {
                pauseTimer();
            }
            if (command === 'resume') {
                resumeTimer();
            }
            break;
        }
        default: {
            console.log('Пришло сообщение в worker - нет обработчика')
        }
    }
});

export default null as any;

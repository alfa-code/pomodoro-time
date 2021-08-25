const ctx: Worker = self as any;

let timerInterval: any = null;
let startTime: any;
let pauseTime: any;

// текущее состояния таймера
const timerState = {
    basePeriod: 15000,
    breakPeriod: 5000,
    currentPeriod: 15000,
    pomodoroPhase: 'work', // type PomodoroPhase = 'work' | 'break';
}


// Отсылает текущее время
function sendTime() {
    const minutes = formatTimeValue(getMinutesByPeriod(timerState.currentPeriod));
    const seconds = formatTimeValue(getSecondsByPeriod(timerState.currentPeriod));

    postMessage({
        type: 'time',
        payload: {
            minutes,
            seconds,
        }
    }, undefined);
}

// при старте приложения отсылается текущее время
sendTime();

/**
 * Изменяет фазу таймера и вызывает сайд эффекты.
 */
function changePomodoroPhase() {
    switch (timerState.pomodoroPhase) {
        case 'work': {
            // в переменную фазы устанавливается новое значение
            timerState.pomodoroPhase = 'break';

            // При смене фазы, в период устанавливается соответствующее значение времени фазы
            timerState.currentPeriod = timerState.breakPeriod;

            // Посылает сообщение о смене фазы таймера в основной контекст JS
            postMessage({
                type: 'pomodoroPhase',
                payload: {
                    pomodoroPhase: 'break'
                }
            }, undefined);
            break;
        }
        case 'break': {
            // в переменную фазы устанавливается новое значение
            timerState.pomodoroPhase = 'work';
            
            // Посылает сообщение о смене фазы таймера в основной контекст JS
            timerState.currentPeriod = timerState.basePeriod;

            // Посылает сообщение о смене фазы таймера в основной контекст JS
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

// Приводит время к строке и добавляет ведущий ноль если это необходимо
function formatTimeValue(value: number | string) {
    let newValue = value.toString();
    if (newValue.length == 1) {
        newValue = "0" + value;
    }
    return newValue;
}

function getMinutesByPeriod(basePeriod = 0) {
    const t0 = basePeriod % 60000; // остаток секунд без целых минут
    const t1 = (basePeriod - t0) / 60; // количество минут в текущем периоде
    return Math.floor(t1 / 1000); // ????
}

function getSecondsByPeriod(basePeriod = 0) {
    const m0 = getMinutesByPeriod(basePeriod);
    const m1 = basePeriod - (m0 * 60 * 1000);
    const m2 = m1 % 1000;
    const m3 = m1 - m2;

    return Math.floor(m3 / 1000);
}

function myTimer(d0: any) {
    // get current time
    var d = (new Date()).valueOf();
    // calculate time difference between now and initial time
    var diff = d - d0;
    // calculate number of minutes
    var minutes: any = Math.floor(diff / 1000 / 60);
    // calculate number of seconds
    var seconds: any = Math.floor(diff / 1000) - minutes * 60;
    // if number of minutes less than 10, add a leading "0"
    minutes = minutes.toString();
    if (minutes.length == 1) {
        minutes = "0" + minutes;
    }
    // if number of seconds less than 10, add a leading "0"
    seconds = seconds.toString();
    if (seconds.length == 1) {
        seconds = "0" + seconds;
    }

    if (timerState.currentPeriod > 1000) {
        timerState.currentPeriod = timerState.currentPeriod - 1000;
    } else {
        changePomodoroPhase();
    }

    sendTime();
}

function startTimer() {
    startTime = (new Date()).valueOf();
    timerInterval = setInterval(function () { myTimer(startTime) }, 1000);

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

    sendTime();
}

function pauseTimer() {
    pauseTime = (new Date()).valueOf();
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
    timerInterval = setInterval(function () { myTimer(startTime) }, 1000);

    postMessage({
        type: 'phase',
        payload: {
            phase: 'started'
        }
    }, undefined);
}

// Обработчик внешних сообщений - устанавливает новые опции таймера
function setTimerWorkerSettings(options: {
    pomodoro?: number;
    break?: number;
}) {
    if (options.pomodoro) {
        timerState.basePeriod = options.pomodoro;
        timerState.currentPeriod = options.pomodoro;
    }

    if (options.break) {
        timerState.breakPeriod = options.break;
    }

    // Перезагружаем таймер после установки новых настроек
    reloadTimer();
}

ctx.addEventListener("message", (event) => {
    // console.log('event.data', event.data);
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
            if (command === 'settings') {
                setTimerWorkerSettings(payload.options);
            }
            break;
        }
        default: {
            console.log('Пришло сообщение в worker - нет обработчика')
        }
    }
});

export default null as any;

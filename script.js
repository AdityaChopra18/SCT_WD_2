let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lapTimes');

function startPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseButton.textContent = 'Resume';
        isRunning = false;
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startPauseButton.textContent = 'Pause';
        isRunning = true;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
    elapsedTime = 0;
    isRunning = false;
    startPauseButton.textContent = 'Start';
    lapTimesList.innerHTML = '';
    lapCounter = 1;
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = time % 1000;

    return (
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '0' : '') + milliseconds
    );
}

function lap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapTimesList.prepend(lapItem);
        lapCounter++;
    }
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
let startTime, updatedTime, difference;
let isRunning = false;
let interval;
let laps = 1;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 1000);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    display.innerText = "00:00:00";
    difference = 0;
    isRunning = false;
    lapsList.innerHTML = "";
    laps = 1;
}

function lapStopwatch() {
    if (isRunning) {
        const lapTime = display.innerText;
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${laps}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        laps++;
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    const hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    
    display.innerText = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapStopwatch);

let currentTime = 0;
let lapCount = 0;
let previousLapTime = 0;
let timerInterval;
let running = false;
const timerElement = document.getElementById('current-time');
const startStopBtn = document.getElementById('start-stop-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const lapList = document.getElementById('lap-list');

function updateTimerDisplay() {
    let minutes = Math.floor(currentTime / 60000);
    let seconds = Math.floor((currentTime % 60000) / 1000);
    let milliseconds = Math.floor((currentTime % 1000) / 10);
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function handleLap() {
    lapCount++;
    let lapTime = currentTime - previousLapTime;
    previousLapTime = currentTime;
    
    let lapMinutes = Math.floor(lapTime / 60000);
    let lapSeconds = Math.floor((lapTime % 60000) / 1000);
    let lapMilliseconds = Math.floor((lapTime % 1000) / 10);
    
    const newLap = document.createElement('li');
    newLap.innerHTML = `<span style="display: inline-block; width: 40px; color: #e0e0e0;">${String(lapCount).padStart(2, '0')}</span> 
                         <span style="display: inline-block; width: 110px;">+ ${String(lapMinutes).padStart(2, '0')}:${String(lapSeconds).padStart(2, '0')}.${String(lapMilliseconds).padStart(2, '0')}</span> 
                         <span style="display: inline-block; width: 110px;">${timerElement.textContent}</span>`;
    newLap.style.marginBottom = "10px";
    lapList.prepend(newLap);
}

startStopBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startStopBtn.textContent = 'Start';
    } else {
        timerInterval = setInterval(() => {
            currentTime += 10;
            updateTimerDisplay();
        }, 10);
        running = true;
        startStopBtn.textContent = 'Stop';
        lapBtn.classList.remove('hidden');
        resetBtn.classList.remove('hidden');
    }
});

lapBtn.addEventListener('click', handleLap);

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    running = false;
    currentTime = 0;
    lapCount = 0;
    previousLapTime = 0;
    updateTimerDisplay();
    lapList.innerHTML = '';
    startStopBtn.textContent = 'Start';
    lapBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');
});

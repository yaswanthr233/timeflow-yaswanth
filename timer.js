let startBtnEl = document.getElementById('startStopwatchBtn');
let reserBtnEl = document.getElementById('resetStopwatchBtn');
let pauseBtnEl = document.getElementById('pauseStopwatchBtn');
let resumeBtnEl = document.getElementById('resumeStopwatchBtn');
let resumeTextEl = document.getElementById('resumeText');
let stopwatchBtnEl = document.getElementById('stopwatchBtn');
let timerBtnEl = document.getElementById('timerBtn');
let stopwatchContainerEl = document.getElementById('stopwatch-section'); 
let timerContainerEl = document.getElementById('timer-section');
let timerHrsInputEl = document.getElementById('timerHrsInput');
let timerMinsInputEl = document.getElementById('timerMinsInput');
let timerSecsInputEl = document.getElementById('timerSecsInput');

let timerHrsDisplayEl = document.getElementById('timerHrsDisplay');
let timerMinsDisplayEl = document.getElementById('timerMinsDisplay');
let timerSecsDisplayEl = document.getElementById('timerSecsDisplay');

let inputsEl = document.getElementById('inputs-ele');

let timerDisplayEl = document.getElementById('display');

let timerStartBtnEl = document.getElementById('startTimerBtn');
let timerPauseBtnEl = document.getElementById('pauseTimerBtn');
let timerStopBtnEl = document.getElementById('stopTimerBtn');
let resumeTimerBtnEl = document.getElementById('resumeTimerBtn');

let hours = 0;
let minutes = 0;
let seconds = 0;
let interval = null;

let hoursEl = document.getElementById('hrs');
let minutesEl = document.getElementById('mins');
let secondsEl = document.getElementById('secs');

function format(num){
    return num < 10 ? "0" + num : num;
} 

function updateStopwatch(){
    hoursEl.textContent = format(hours);
    minutesEl.textContent = format(minutes);
    secondsEl.textContent = format(seconds);
}

startBtnEl.addEventListener('click', function(){
    if(interval) return;
    interval = setInterval(() => {
        seconds++;
        if(seconds === 60){
            seconds = 0;
            minutes++;
            if(minutes === 60){
                minutes = 0;
                hours++;
            }
        }
        updateStopwatch();
    },1000);
    startBtnEl.style.display = 'none';
    pauseBtnEl.style.display = 'inline-block';
});

function pauseStopwatch(){
    clearInterval(interval);
    interval = null;
    pauseBtnEl.style.display = 'none';
    startBtnEl.style.display = 'inline-block';
    resumeTextEl.textContent = 'Resume';
}

function resetStopwatch(){
    clearInterval(interval);
    interval = null;
    hours = 0;
    seconds = 0;
    minutes = 0;
    updateStopwatch();
    startBtnEl.style.display = 'inline-block';
    resumeTextEl.textContent = 'Start';
    pauseBtnEl.style.display = 'none';
}

function showStopwatch(){
    stopwatchBtnEl.style.backgroundColor = '#4A90E2';
    stopwatchBtnEl.style.color = '#fff';
    timerBtnEl.style.backgroundColor = 'transparent';
    timerBtnEl.style.color = '#64748B';
    stopwatchContainerEl.style.display = 'block';
    timerContainerEl.style.display = 'none';
}

function showTimer(){
    timerBtnEl.style.backgroundColor = '#4A90E2';
    timerBtnEl.style.color = '#fff';
    stopwatchBtnEl.style.backgroundColor = 'transparent';
    stopwatchBtnEl.style.color = '#64748B';
    stopwatchContainerEl.style.display = 'none';
    timerContainerEl.style.display = 'inline-block';
}

let time=0;
let timer;
let isTimerRunning = false;

function updateTimerDisplay(h, m, s){
    timerHrsDisplayEl.textContent = format(h);
    timerMinsDisplayEl.textContent = format(m);
    timerSecsDisplayEl.textContent = format(s);
}

function runTimer(){
    clearInterval(timer);
    timer = setInterval(() => {
        if(time <= 0){
            clearInterval(timer);
            alert('Time is up!');
            isTimerRunning = false;
            return resetTimer();
        }
        time--;
        let h = Math.floor(time / 3600);
        let m = Math.floor((time % 3600) / 60);
        let s = time % 60;
        updateTimerDisplay(h, m, s);
    }, 1000);
    timerStartBtnEl.style.display = 'none';
    timerPauseBtnEl.style.display = 'inline-block';
}

function startTimer(){
    if(!isTimerRunning){
    let hrs = parseInt(timerHrsInputEl.value) || 0;
    let mins = parseInt(timerMinsInputEl.value) || 0;
    let secs = parseInt(timerSecsInputEl.value) || 0;

    time = hrs * 3600 + mins * 60 + secs;
    if(time <= 0) return alert('Please enter a valid time');

    timerHrsInputEl.style.display = 'none';
    timerMinsInputEl.style.display = 'none';
    timerSecsInputEl.style.display = 'none';
    inputsEl.style.display = 'none';
    timerDisplayEl.style.display = 'block';
    isTimerRunning = true;
    }
    runTimer();

}

function resetTimer(){
    clearInterval(timer);
    isTimerRunning = false;
    time=0;
    timerHrsDisplayEl.textContent = '00';
    timerMinsDisplayEl.textContent = '00';
    timerSecsDisplayEl.textContent = '00';
    timerHrsInputEl.style.display = 'inline-block';
    timerMinsInputEl.style.display = 'inline-block';
    timerSecsInputEl.style.display = 'inline-block';
    inputsEl.style.display = 'inline-block';
    timerDisplayEl.style.display = 'none';
    timerPauseBtnEl.style.display = 'none';
    timerStartBtnEl.style.display = 'inline-block';
    resumeTimerBtnEl.style.display = 'none';
    timerHrsInputEl.value = 'HH';
    timerMinsInputEl.value = 'MM';
    timerSecsInputEl.value = 'SS';
}

function pauseTimer(){
    clearInterval(timer);
    timer = null;
    timerPauseBtnEl.style.display = 'none';
    resumeTimerBtnEl.style.display = 'inline-block';
    isTimerRunning = false;
}

function resumeTimer(){
    if(!isTimerRunning){
        runTimer();
    }
    resumeTimerBtnEl.style.display = 'none';
}
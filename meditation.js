//JS for the meditation pages
//basically same function as the one that deals with the profile picture
function selectMeditationImage(icon) {
    var allImages = document.querySelectorAll('.meditation-image');
    for (var i = 0; i < allImages.length; i++) {
        allImages[i].classList.remove('selected');
    }
    icon.classList.add('selected');

    localStorage.setItem('meditationBackground', icon.src);
}


 //Deals with selection issues
 //Code to have audio play for a couple of seconds from @DeveloperMozilla : HTMLMediaElement: play() method
 // & StackOverflow : How to play audio at a specific time in javascript
var currentAudio = null;
var previewSound = null;


function selectAudio(element, audioName) {
    if (currentAudio) {
        var previousIcon = document.getElementById('audio-icon-' + currentAudio);
        previousIcon.src = 'images/' + currentAudio + '.svg';
    }

    if (previewSound) {
        previewSound.pause();
        previewSound.currentTime = 0;
    }

    if (currentAudio === audioName) {
        currentAudio = null;
        localStorage.removeItem('meditationAudio');
        return;
    }

    var newIcon = document.getElementById('audio-icon-' + audioName);
    newIcon.src = 'images/' + audioName + '-pressed.svg';

   
    currentAudio = audioName;
    if (audioName === 'soothe') {
        openSoothePopup();
        return;
    }
     //Save to use later
    localStorage.setItem('meditationAudio', audioName);

    previewSound = new Audio('audio/' + audioName + '.mp3');
    previewSound.play();

    setTimeout(function() {
        previewSound.pause();
        previewSound.currentTime = 0;
    }, 5000);
}


var currentSootheAudio = null;
var soothePreviewSound = null;

// opens and closes the popup
function openSoothePopup() {
    document.getElementById('soothe-popup').classList.add('active');
}

function closeSoothePopup() {
    document.getElementById('soothe-popup').classList.remove('active');
}

function selectSootheAudio(element, audioName) {
    if (currentSootheAudio) {
        var previousIcon = document.getElementById('audio-icon-' + currentSootheAudio);
        previousIcon.src = 'images/' + currentSootheAudio + '.svg';
    }

    if (soothePreviewSound) {
        soothePreviewSound.pause();
        soothePreviewSound.currentTime = 0;
    }

    if (currentSootheAudio === audioName) {
        currentSootheAudio = null;
        localStorage.removeItem('meditationAudio');
        return;
    }

    var newIcon = document.getElementById('audio-icon-' + audioName);
    newIcon.src = 'images/' + audioName + '-pressed.svg';

     //Save to use later
    currentSootheAudio = audioName;
    localStorage.setItem('meditationAudio', audioName);

    soothePreviewSound = new Audio('audio/' + audioName + '.mp3');
    soothePreviewSound.play();

    setTimeout(function() {
        soothePreviewSound.pause();
        soothePreviewSound.currentTime = 0;
    }, 5000);
}

//closes the popup
function Cancel() {
    if (soothePreviewSound) {
        soothePreviewSound.pause();
        soothePreviewSound.currentTime = 0;
    }

    closeSoothePopup();
}

function saveSootheAudio() {
    if (soothePreviewSound) {
        soothePreviewSound.pause();
        soothePreviewSound.currentTime = 0;
    }

    closeSoothePopup();
}



//Meditation Session Code 

var sessionAudio = null;
var sessionPaused = true;
var sessionTimeout = null;

//Code for countdown timer inspired by @ishan on CodePen: JavaScript 5 minute countdown timer
function startMeditationSession() {
    var savedBackground = localStorage.getItem('meditationBackground');
    if (savedBackground) {
        document.getElementById('meditation-background').src = savedBackground;
    }

    var savedAudioName = localStorage.getItem('meditationAudio');
    if (savedAudioName) {
        sessionAudio = new Audio('audio/' + savedAudioName + '.mp3');
        sessionAudio.loop = true;
    }

    sessionPaused = true;
    document.getElementById('session-timer').innerHTML = "10" + ":" + "00";
    document.getElementById('session-play-button').src = 'images/play.svg';
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; 
    if (sec < 0) { sec = "59" };
    return sec;
}

function runSessionTimer() {
    if (sessionPaused) {
        return;
    }

    var presentTime = document.getElementById('session-timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    if (m < 0) {
        //changes since i have something happen when session ends now 
        openSessionCompletePopup();
        return;
    }

    document.getElementById('session-timer').innerHTML = m + ":" + s;

    sessionTimeout = setTimeout(runSessionTimer, 1000);
}

function playAndpause() {
    var playButton = document.getElementById('session-play-button');

    if (sessionPaused) {
        sessionPaused = false;
        playButton.src = 'images/pause.svg';

        if (sessionAudio) {
            sessionAudio.play();
        }

        runSessionTimer();
    } else {
        pauseSession();
    }
}

function pauseSession() {
    sessionPaused = true;
    document.getElementById('session-play-button').src = 'images/play.svg';

    if (sessionAudio) {
        sessionAudio.pause();
    }

    clearTimeout(sessionTimeout);
}

function openSessionExitPopup() {
    pauseSession();
    document.getElementById('session-exit-popup').classList.add('active');
}

function closeSessionExitPopup() {
    document.getElementById('session-exit-popup').classList.remove('active');
}

function returnMeditation() {
    if (sessionAudio) {
        sessionAudio.pause();
    }
    clearTimeout(sessionTimeout);
    closeSessionExitPopup();
    showScreen('meditation'); 
}


//Meditation Session after session ends popup

function openSessionCompletePopup() {
    pauseSession();
    document.getElementById('session-complete-popup').classList.add('active');
}

function closeSessionCompletePopup() {
    document.getElementById('session-complete-popup').classList.remove('active');
}


function returnMeditation2() {
    if (sessionAudio) {
        sessionAudio.pause();
    }
    closeSessionCompletePopup();
    showScreen('meditation'); 
}


function restartMeditation() {
    closeSessionCompletePopup();
    startMeditationSession();
    playAndpause();
}
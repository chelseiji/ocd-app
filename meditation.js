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
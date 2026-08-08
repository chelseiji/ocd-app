console.log('using app');


var notVisible = ['loading-screen', 'onboarding1', 'onboarding2', 'onboarding3', 'onboarding4', 'authentication', 'registration', 'signin', 'termsandconditions', 'account-setup', 'prehome-loading', 'meditation-session','meditation-timer', 'read-journal-1', ];

//Changes the screen of the app thats active 
function showScreen(screenNumber){
    //Elements in screen
    var allScreens = document.querySelectorAll('.screen');

    //Loop to go through each of the screens hide the ones i dont need to show
    for (var i =0; i < allScreens.length; i++){
        allScreens[i].classList.remove('active')
    }
    //Makes it so that only the active screen is shown 
    document.getElementById(screenNumber).classList.add('active');

    // (# AI 14) Written with help of AI only this var and if else statment not the ones below this 
    var navBar = document.getElementById('nav-bar');
    if (notVisible.indexOf(screenNumber) !== -1) {
        navBar.style.display = 'none';
    } else {
        navBar.style.display = 'block';
        updateNavBar(screenNumber);
    }


    //has it so the meditation visulas dont start with the first visual but with the second for a stylistic choice
    if (screenNumber === 'meditation') {
        document.getElementById('meditation-carousel').scrollLeft = 227 + 30;
    }

    //begins the meditation session with the saved elements 
    if (screenNumber === 'meditation-session') {
        startMeditationSession();
    }

    //shows when jounrals are added to page when page is empty text is placed on the screen 
    if (screenNumber === 'journals') {
        updateNoJournalsText();
    }

    //infor from onboarding put on homepage
    if (screenNumber === 'home') {
        homeInfo();
    }

    //for seetings page to have all the profile and name info
    if (screenNumber === 'settings') {
        settingsInfo();
    }

    //for seetings page to have all the profile and name info
    if (screenNumber === 'change-password') {
        passwordEmailInfo();
    }


}


// (# AI 14) Written with help of AI
var currentNavIcon = null;

function updateNavBar(screenNumber) {
    var screen = document.getElementById(screenNumber);
    var matchingNavIcon = screen.getAttribute('data-nav');

    if (!matchingNavIcon) {
        return;
    }

    if (currentNavIcon) {
        var previousIcon = document.getElementById('nav-' + currentNavIcon);
        previousIcon.src = 'images/nav-' + currentNavIcon + '.svg';
        previousIcon.classList.remove('pressed');
    }

    var newIcon = document.getElementById('nav-' + matchingNavIcon);
    newIcon.src = 'images/nav-' + matchingNavIcon + '-pressed.svg';
    newIcon.classList.add('pressed');
    currentNavIcon = matchingNavIcon;
}



//Opens popups
function openPopup() {
    document.getElementById('skip-popup').classList.add('active');
}

// Closes the popup
function closePopup() {
    document.getElementById('skip-popup').classList.remove('active');
}


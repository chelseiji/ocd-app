console.log('using app');

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

    //for seetings page to have all the profile and name info
    if (screenNumber === 'settings') {
        settingsInfo();
    }

    //for seetings page to have all the profile and name info
    if (screenNumber === 'change-password') {
        passwordEmailInfo();
    }


}

//Opens popups
function openPopup() {
    document.getElementById('skip-popup').classList.add('active');
}

// Closes the popup
function closePopup() {
    document.getElementById('skip-popup').classList.remove('active');
}


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

    //for mediation page 
    if (screenNumber === 'meditation') {
        document.getElementById('meditation-carousel').scrollLeft = 227 + 30;
    }

    if (screenNumber === 'meditation-session') {
        startMeditationSession();
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


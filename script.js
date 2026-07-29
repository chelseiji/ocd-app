console.log('using app');

//This is so that the flowers dont start falling instantly when users open the application
setTimeout(function() {
    document.querySelector('.flowerfall').classList.add('active');
}, 2000);

//This is so that after a couple seconds of showing the flowers falling then the page will change
setTimeout(function() {
    showScreen('onboarding1');
}, 6000);

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
}


//Opens popups
function openPopup() {
    document.getElementById('skip-popup').classList.add('active');
}

// Closes the popup
function closePopup() {
    document.getElementById('skip-popup').classList.remove('active');
}

// Goes to authentication page
function skipOnboarding() {
    closePopup();
    showScreen('authentication'); // change this 
}

// Changes the password form visible to not visible as well as the eyes
function togglePassword(inputId, icon) {
    var input = document.getElementById(inputId);

    if (input.type === 'password') {
        input.type = 'text';
        icon.src = 'images/eye-open.svg';
    } else {
        input.type = 'password';
        icon.src = 'images/eye-closed.svg';
    }
}

//Sees if the passwords are a match if they are they can go to the terms and conditions page
function Registration() {
    var password = document.getElementById('password-input').value;
    var confirm = document.getElementById('confirm-input').value;
    var errorText = document.getElementById('error');

    if (password !== confirm) {
        errorText.classList.add('show');
        return;
    }

    errorText.classList.remove('show');
    showScreen('termsandconditions');
}
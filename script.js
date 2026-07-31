console.log('using app');

// LOADING
//This is so that the flowers dont start falling instantly when users open the application
setTimeout(function() {
    document.querySelector('.flowerfall').classList.add('active');
}, 2000);

//This is so that after a couple seconds of showing the flowers falling then the page will change
setTimeout(function() {
    showScreen('onboarding1');
}, 6000);

// ONBOARDING
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

// REGISTRATION
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

function Remember() {
    document.getElementById('remember-pressed').classList.toggle('checked');
}

// TERMS AND CONDITIONS
// Opens popup
function openDisagreePopup() {
    document.getElementById('disagree-popup').classList.add('active');
}

// Closes popup when ok is pressed
function closeDisagreePopup() {
    document.getElementById('disagree-popup').classList.remove('active');
}

// Go to loading before the homescreen
function Agree() {
    showScreen('account-setup');
}

// ACCOUNT SETUP
// slects the profile that the user clicks on
function selectProfile(icon) {
    var allCircles = document.querySelectorAll('.setup-profile');
    for (var i = 0; i < allCircles.length; i++) {
        allCircles[i].classList.remove('selected');
    }
    icon.classList.add('selected');
}

var chooseFile = document.getElementById("choose-file");
var imgPreview = document.getElementById("image-preview");

chooseFile.addEventListener("change", function () {
    getImgData();
});

function getImgData() {
    var files = chooseFile.files[0];
    if (files) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreview.style.display = "block";
            imgPreview.innerHTML = '<img src="' + this.result + '" class="setup-profile" onclick="selectProfile(this)" />';

            var carousel = document.getElementById('setup-image-carousel');
            carousel.insertBefore(imgPreview, carousel.firstChild);
        });
    }
}

function accountSetup() {
    showScreen('prehome-loading'); 
}

// Saves the username 
var nicknameInput = document.getElementById('nickname-input');
nicknameInput.addEventListener('input', function() {
    localStorage.setItem('username', nicknameInput.value);
});

// Saves the profile pic that the users chose 
function selectProfile(icon) {
    var allCircles = document.querySelectorAll('.setup-profile');
    for (var i = 0; i < allCircles.length; i++) {
        allCircles[i].classList.remove('selected');
    }
    icon.classList.add('selected');
    
    localStorage.setItem('profileImage', icon.src);
}
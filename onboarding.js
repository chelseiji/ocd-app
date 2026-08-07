// ONBOARDING
//This is so that the flowers dont start falling instantly when users open the application
setTimeout(function() {
    document.querySelector('.flowerfall').classList.add('active');
}, 2000);

//This is so that after a couple seconds of showing the flowers falling then the page will change
setTimeout(function() {
    showScreen('onboarding1');
}, 6000);

// Goes to authentication page
function skipOnboarding() {
    closePopup();
    showScreen('authentication'); // change this 
}

// REGISTRATION
// Changes the password form visible to not visible as well as the eyes
//Password validation inspo from @GeeksforGeeks: How to validate confirm password using JavaScript ?
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
//Document from @W3 Schools: HTML DOM Document querySelectorAll()
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

//Having user select their own image from @W3 Collective: Preview selected image (input type=”file”) using JavaScript
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

// Saves the username 
var nicknameInput = document.getElementById('nickname-input');

nicknameInput.addEventListener('input', function() {
    localStorage.setItem('username', nicknameInput.value);
});

//I added these later on sicne i forgot to save them 
//needed for the chnage password page 

// saves the email in registration
var regEmailInput = document.getElementById('email-input');

regEmailInput.addEventListener('input', function() {
    localStorage.setItem('email', regEmailInput.value);
});

// saves the email in sign in
var signinEmailInput = document.getElementById('signin-email-input');

signinEmailInput.addEventListener('input', function() {
    localStorage.setItem('email', signinEmailInput.value);
});

// saves the password in registration
var regPasswordInput = document.getElementById('password-input');

regPasswordInput.addEventListener('input', function() {
    localStorage.setItem('password', regPasswordInput.value);
});

// saves the password in sign in
var signinPasswordInput = document.getElementById('signin-password-input');

signinPasswordInput.addEventListener('input', function() {
    localStorage.setItem('password', signinPasswordInput.value);
});

// Saves the profile pic that the users chose 
//Saving the username and image to local storage from @GeeksforGeeks : How to Create a Textfield to Enter a Username and Save it on a Website?
function selectProfile(icon) {
    var allCircles = document.querySelectorAll('.setup-profile');
    for (var i = 0; i < allCircles.length; i++) {
        allCircles[i].classList.remove('selected');
    }
    icon.classList.add('selected');

    localStorage.setItem('profileImage', icon.src);
}

function accountSetup() {
    showScreen('prehome-loading'); 
    startPrehomeLoading();
}

function startPrehomeLoading() {
    setTimeout(function() {
        showScreen('home'); 
    }, 7000);
}